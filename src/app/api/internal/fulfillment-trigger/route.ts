import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import crypto from 'crypto';
import { courses } from '@/lib/placeholder-data';
import { render } from '@react-email/render';
import AccessEmail from '@/emails/AccessEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  const internalSecret = process.env.INTERNAL_API_SECRET_KEY;
  if (!internalSecret) {
    console.error('CRITICAL FAILURE: INTERNAL_API_SECRET_KEY is not set.');
    return new NextResponse('Internal server configuration error.', { status: 500 });
  }
  const authHeader = req.headers.get('Authorization');
  const providedToken = authHeader?.split('Bearer ')[1];
  if (providedToken !== internalSecret) {
    console.warn('ALERT: Unauthorized attempt to access internal fulfillment endpoint.');
    return new NextResponse('Unauthorized.', { status: 401 });
  }
  
  try {
    const { eventType, payload } = await req.json();

    if (eventType !== 'FULFILLMENT_REQUEST') {
      return new NextResponse('Event not processed.', { status: 200 });
    }
    const { customerEmail, courseId } = payload;
    if (typeof customerEmail !== 'string' || typeof courseId !== 'string') {
      return new NextResponse('Malformed payload.', { status: 400 });
    }
    
    const token = crypto.randomUUID();
    const tokenKey = `token:${token}`;
    const tokenData = { courseId, email: customerEmail };

    const ONE_YEAR_IN_SECONDS = 86400 * 365;
    await redis.set(tokenKey, JSON.stringify(tokenData), { ex: ONE_YEAR_IN_SECONDS });
    
    const course = courses.find(c => c.id === courseId);
    const courseName = course ? course.name : 'Your Acquired Knowledge';
    const accessLink = `https://revenge-money.vercel.app/my-courses/${courseId}?token=${token}`;

    const emailHtml = await render(
      AccessEmail({
        email: customerEmail,
        courseName,
        accessLink,
      })
    );

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: customerEmail,
      subject: `Your Key to the Fortress: Access to ${courseName}`,
      html: emailHtml, 
    });
    console.log(`SUCCESS [DISPATCH]: Fulfillment email sent to ${customerEmail}.`);

    return new NextResponse('Fulfillment successful.', { status: 200 });

  } catch (error) {
    console.error('CRITICAL_FAILURE: Fulfillment engine failed.');
    console.error('Error Details:', error);
    if (error instanceof Error) {
      console.error('Error Name:', error.name);
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
    }
    return new NextResponse('Fulfillment processing error.', { status: 500 });
  }
}
