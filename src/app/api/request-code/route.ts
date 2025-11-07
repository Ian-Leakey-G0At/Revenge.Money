import { kv } from '@vercel/kv';
import { randomInt } from 'crypto';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ error: 'Access token is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const purchaseData: { courseId: string; email: string } | null = await kv.get(token as string);

    if (!purchaseData) {
      return new Response(JSON.stringify({ error: 'Invalid access token' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate a 6-digit code
    const accessCode = randomInt(100000, 999999).toString();
    const codeKey = `code:${token}`;

    // Store the code with a 3-hour expiration (10800 seconds)
    await kv.set(codeKey, accessCode, { ex: 10800 });

    // **Email Simulation**
    // In a real application, you would integrate an email service like Resend or SendGrid here.
    console.log(`-- DEV-ONLY: SIMULATING EMAIL --`);
    console.log(`Recipient: ${purchaseData.email}`);
    console.log(`Subject: Your Access Code`);
    console.log(`Body: Your code is ${accessCode}. It expires in 3 hours.`);
    console.log(`-- END SIMULATION --`);

    return new Response(JSON.stringify({ message: 'Access code has been sent to your email.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error requesting access code:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
