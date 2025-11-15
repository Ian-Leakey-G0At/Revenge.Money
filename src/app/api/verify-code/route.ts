import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Access token is required and must be a string' }, { status: 400 });
    }

    const tokenKey = `token:${token}`;
    
    const tokenDataString: string | null = await redis.get(tokenKey);

    if (!tokenDataString) {
      return NextResponse.json({ error: 'Invalid, expired, or already used access token' }, { status: 401 });
    }

    await redis.del(tokenKey);

    const tokenData = JSON.parse(tokenDataString);

    return NextResponse.json({ success: true, courseId: tokenData.courseId }, { status: 200 });

  } catch (error) {
    console.error('CRITICAL_FAILURE: Verify Token Error:', error);
    if (error instanceof Error) {
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
    }
    return NextResponse.json({ error: 'An unexpected server error occurred' }, { status: 500 });
  }
}
