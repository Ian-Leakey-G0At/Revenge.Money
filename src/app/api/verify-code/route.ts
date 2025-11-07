import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    const { token, code } = await request.json();

    if (!token || !code) {
      return new Response(JSON.stringify({ error: 'Access token and code are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const codeKey = `code:${token}`;
    const storedCode: string | null = await kv.get(codeKey);

    if (!storedCode) {
      return new Response(JSON.stringify({ error: 'Invalid or expired access code. Please request a new one.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (storedCode !== code) {
      return new Response(JSON.stringify({ error: 'Invalid access code.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Code is correct, so we can delete it to prevent reuse
    await kv.del(codeKey);

    return new Response(JSON.stringify({ message: 'Access granted' }), {
      status: 200,
    });

  } catch (error) {
    console.error('Error verifying access code:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
