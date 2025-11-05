import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { courseId } = await request.json();
  const token = Math.random().toString(36).substring(2);

  // In a real application, you would store the token in a database
  // associated with the user and course.
  console.log(`Access token for course ${courseId}: ${token}`);

  const accessUrl = `/my-courses/${courseId}?token=${token}`;

  return NextResponse.json({ accessUrl });
}
