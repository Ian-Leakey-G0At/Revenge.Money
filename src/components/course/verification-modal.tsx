"use client";

import { useState } from 'react';

interface VerificationModalProps {
  token: string;
  onVerificationSuccess: () => void;
}

export function VerificationModal({ token, onVerificationSuccess }: VerificationModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (!/^\d{6}$/.test(code)) {
      setError('Please enter a 6-digit code.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, code }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'An unknown error occurred.');
      }

      // On successful verification, call the parent component's callback
      onVerificationSuccess();

    } catch (err: any) {
      setError(err.message || 'Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Verify Your Access</h2>
        <p className="text-center text-gray-600 mb-6">
          A verification code has been sent to your email address. Please enter it below.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6-Digit Code"
            maxLength={6}
            className="w-full px-4 py-2 border rounded-md text-center text-lg tracking-widest mb-4"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
        <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-bold">Security Warning</p>
          <p>This link is for your personal use only. Do not share it. Access is monitored.</p>
        </div>
      </div>
    </div>
  );
}
