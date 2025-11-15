import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();

interface TokenData {
  courseId: string;
  email: string; // The email is also stored, though not used in this check
}

export async function POST(request: NextRequest) {
  try {
    // The frontend must now send both the token AND the courseId it is trying to access.
    const { token, courseId } = await request.json();

    if (!token || typeof token !== 'string' || !courseId || typeof courseId !== 'string') {
      return NextResponse.json({ error: 'Token and courseId are required.' }, { status: 400 });
    }

    const tokenKey = `token:${token}`;
    
    // Use the client's built-in JSON parsing.
    const tokenData = await redis.get<TokenData>(tokenKey);

    if (!tokenData) {
      return NextResponse.json({ error: 'Invalid, expired, or already used access token.' }, { status: 401 });
    }

    // *** THE CRITICAL LOCK AND KEY CHECK ***
    // We verify that the key (token) is for the specific door (courseId) the user is trying to open.
    if (tokenData.courseId !== courseId) {
      // Burn the token anyway as a security measure against token scanning attempts.
      await redis.del(tokenKey);
      return NextResponse.json({ error: 'This token is not valid for this course.' }, { status: 403 }); // 403 Forbidden
    }

    // Burn on read: The token is valid and has served its purpose.
    await redis.del(tokenKey);

    console.log(`VERIFY_SUCCESS: Token validated for course ${tokenData.courseId}`);
    // The token is valid for this course. Grant access.
    return NextResponse.json({ success: true, courseId: tokenData.courseId }, { status: 200 });

  } catch (error) {
    console.error('CRITICAL_FAILURE: Verify Token Error:', error);
    return NextResponse.json({ error: 'An unexpected server error occurred' }, { status: 500 });
  }
}
