import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { courses } from '@/lib/placeholder-data';
import { render } from '@react-email/render';
import AccessEmail from '@/emails/AccessEmail';

const redis = new Redis({
  url: process.env.revengemoney_KV_REST_API_URL || process.env.KV_REST_API_URL,
  token: process.env.revengemoney_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REVENGE_MONEY_GMAIL_USER,
    pass: process.env.REVENGE_MONEY_GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const internalSecret = process.env.REVENGE_MONEY_INTERNAL_SECRET_KEY;
  if (!internalSecret) {
    console.error('CRITICAL FAILURE: REVENGE_MONEY_INTERNAL_SECRET_KEY is not set.');
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

    const purchasedCourse = courses.find(c => c.id === courseId);

    if (!purchasedCourse) {
      console.error(`CRITICAL: Fulfillment request for unknown course ID: [${courseId}]`);
      return new NextResponse(`Course not found for courseId: ${courseId}`, { status: 404 });
    }

    const token = uuidv4();
    const tokenKey = `token:${token}`;
    const tokenData = { courseId, email: customerEmail };

    const ONE_YEAR_IN_SECONDS = 86400 * 365;
    await redis.set(tokenKey, JSON.stringify(tokenData), { ex: ONE_YEAR_IN_SECONDS });

    const courseName = purchasedCourse.name;
    const accessLink = `https://revenge-money.vercel.app/my-courses/${purchasedCourse.id}?token=${token}`;

    try {
      console.log('INFO [DISPATCH]: Rendering email template...');
      const emailHtml = await render(
        AccessEmail({
          email: customerEmail,
          courseName,
          accessLink,
        })
      );
      console.log('SUCCESS [DISPATCH]: Email template rendered.');

      console.log('INFO [DISPATCH]: Sending email via Gmail SMTP...');
      await transporter.sendMail({
        from: '"Revenge Money" <ian19leakey@gmail.com>',
        to: customerEmail,
        subject: `Your Key to the Fortress: Access to ${courseName}`,
        html: emailHtml,
      });
      console.log(`SUCCESS [DISPATCH]: Fulfillment email sent to ${customerEmail}.`);

    } catch (emailError) {
      console.error('CRITICAL_FAILURE: Email dispatch failed AFTER token generation.');
      console.error('Email Error Details:', emailError);
      // We still return a 200 to Polar/service-connector because the token WAS created.
      // This is a fulfillment failure, not a webhook reception failure.
      // The manual reconciliation protocol would be used to fix this.
      return new NextResponse('Webhook processed, but email dispatch failed.', { status: 200 });
    }

    console.log(`SUCCESS [DATA]: Dispatched for course: ${purchasedCourse.name} with ID: ${purchasedCourse.id}`);

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
