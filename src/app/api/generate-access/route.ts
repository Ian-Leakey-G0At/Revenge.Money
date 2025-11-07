import { NextResponse } from 'next/server';
import { courses } from '@/lib/placeholder-data';
import { kv } from '@vercel/kv';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const { courseId, email } = await request.json();
    const course = courses.find(c => c.id === courseId);

    if (!course) {
      return new Response(JSON.stringify({ error: 'Course not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = randomUUID();

    await kv.set(token, { courseId: course.id, email });

    const accessUrl = `/my-courses/${courseId}?token=${token}`;

    return new Response(JSON.stringify({ accessUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
