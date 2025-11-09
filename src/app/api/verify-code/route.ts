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
    const storedCode: unknown = await kv.get(codeKey);

    const submittedCodeStr = String(code).trim();
    const storedCodeStr = String(storedCode).trim();

    if (!storedCode) {
      return new Response(JSON.stringify({ error: 'Verification code has expired or is invalid' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (storedCodeStr !== submittedCodeStr) {
      return new Response(JSON.stringify({ error: 'Invalid verification code' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await kv.del(codeKey);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Verify Code Error:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
