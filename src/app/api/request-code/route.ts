import { kv } from '@vercel/kv';
import { courses } from '@/lib/placeholder-data';

// This is a simplified, non-production-ready email simulation
async function sendVerificationEmail(email: string, code: string) {
  console.log('-- DEV-ONLY: SIMULATING EMAIL --');
  console.log(`Recipient: ${email}`);
  console.log('Subject: Your Access Code');
  console.log(`Body: Your code is ${code}. It expires in 3 hours.`);
  console.log('-- END SIMULATION --');
  // In a real app, you would use a service like Resend, SendGrid, or AWS SES here.
  return Promise.resolve();
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ error: 'Access token is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const accessDetails: { courseId: string; email: string } | null = await kv.get(token);

    if (!accessDetails) {
      return new Response(JSON.stringify({ error: 'Invalid or expired access token' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { email } = accessDetails;
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate and convert to string
    const codeKey = `code:${token}`;

    // Store the stringified code with a 3-hour expiration
    await kv.set(codeKey, code, { ex: 60 * 60 * 3 });

    // Simulate sending the email
    await sendVerificationEmail(email, code);

    return new Response(JSON.stringify({ message: 'Verification code sent' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Request Code Error:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
