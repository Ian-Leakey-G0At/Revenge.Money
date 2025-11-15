import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import crypto from 'crypto';
import { courses } from '@/lib/placeholder-data'; // Assuming course data is here to get names
import AccessEmail from '@/emails/AccessEmail'; // Assuming the email template is here

// Initialize clients from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
console.log('INFO: Internal fulfillment request received.');

// 1. **The Internal Handshake**: Verify the trusted courier.
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

console.log('SUCCESS: Internal courier verified.');

// 2. **Process the Generic Command**:
try {
const { eventType, payload } = await req.json();

if (eventType !== 'FULFILLMENT_REQUEST') {
console.log(`WARN: Ignoring non-actionable event type: "${eventType}"`);
return new NextResponse('Event not processed.', { status: 200 });
}

const { customerEmail, courseId } = payload;

// Runtime validation is our final safety net.
if (typeof customerEmail !== 'string' || typeof courseId !== 'string') {
console.error('ERROR: Invalid payload structure received from internal courier.');
return new NextResponse('Malformed payload.', { status: 400 });
}

console.log(`FULFILLMENT_TRIGGER: Request for ${customerEmail}, Course ID: ${courseId}`);

// 3. **The Fulfillment Engine**: Forge the key, record in ledger, dispatch the raven.
const token = crypto.randomUUID();
const tokenKey = `token:${token}`;
const tokenData = { courseId, email: customerEmail };

// Record in Ledger (using our existing, connected KV store)
await kv.set(tokenKey, tokenData, { ex: 86400 * 7 }); // Set a 7-day expiry for the access link
console.log(`SUCCESS [LEDGER]: Token for ${customerEmail} stored in Vercel KV.`);

// Dispatch the Raven
const course = courses.find(c => c.id === courseId);
const courseName = course ? course.name : 'Your Acquired Knowledge';
const accessLink = `https://revenge-money.vercel.app/my-courses/${courseId}?token=${token}`;

await resend.emails.send({
from: 'onboarding@resend.dev',
to: customerEmail,
subject: `Your Key to the Fortress: Access to ${courseName}`,
react: AccessEmail({
email: customerEmail,
courseName,
accessLink,
}),
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
