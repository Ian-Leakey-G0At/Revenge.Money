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
    // Get the value from KV. It might be a string or a number.
    const storedCode: unknown = await kv.get(codeKey);

    // Normalize both the submitted code and stored code to be strings for a reliable comparison.
    const submittedCodeStr = String(code).trim();
    const storedCodeStr = String(storedCode).trim();
    
    // --- START DEBUG LOGGING ---
    console.log('--- Verification Attempt ---');
    console.log('Submitted Code:', submittedCodeStr, '(Type:', typeof submittedCodeStr, ')');
    console.log('Stored Code from KV:', storedCodeStr, '(Type:', typeof storedCodeStr, ')');
    console.log('Comparison Result:', storedCodeStr === submittedCodeStr);
    console.log('--- End Verification Attempt ---');
    // --- END DEBUG LOGGING ---

    if (!storedCode) {
      return new Response(JSON.stringify({ error: 'Verification code has expired or is invalid' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Perform the comparison on the normalized strings.
    if (storedCodeStr !== submittedCodeStr) {
      return new Response(JSON.stringify({ error: 'Invalid verification code' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verification successful, clean up the code.
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
