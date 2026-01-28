import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { courses } from '@/lib/placeholder-data';

const redis = new Redis({
  url: process.env.RM_KV_REST_API_URL || process.env.revengemoney_KV_REST_API_URL || process.env.KV_REST_API_URL,
  token: process.env.RM_KV_REST_API_TOKEN || process.env.revengemoney_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN,
});

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
      // Per "Durable Key" model, we no longer burn the token on read.
      // The token's validity is now controlled by its expiry in the KV store.
      // await redis.del(tokenKey); 
      return NextResponse.json({ error: 'This token is not valid for this course.' }, { status: 403 }); // 403 Forbidden
    }

    const courseExists = courses.some(c => c.id === tokenData.courseId);
    if (!courseExists) {
      console.warn(`WARN: Valid token used for a non-existent courseId: [${tokenData.courseId}]`);
      return NextResponse.json({ error: 'The course associated with this token no longer exists.' }, { status: 404 });
    }

    // Per "Durable Key" model, we no longer burn the token on read.
    // The token's validity is now controlled by its expiry in the KV store.
    // await redis.del(tokenKey); 

    console.log(`VERIFY_SUCCESS: Token validated for course ${tokenData.courseId}`);
    // The token is valid for this course. Grant access.
    return NextResponse.json({ success: true, courseId: tokenData.courseId }, { status: 200 });

  } catch (error) {
    console.error('CRITICAL_FAILURE: Verify Token Error:', error);
    return NextResponse.json({ error: 'An unexpected server error occurred' }, { status: 500 });
  }
}
