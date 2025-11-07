'use client';

import { useState } from 'react';

interface VerificationModalProps {
  onVerify: (code: string) => void;
  isVerifying: boolean;
  error: string | null;
}

export function VerificationModal({ onVerify, isVerifying, error }: VerificationModalProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      return;
    }
    onVerify(code);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">Verify Your Access</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          A verification code has been sent to your email address. Please enter it below.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6-Digit Code"
            maxLength={6}
            className="w-full px-4 py-2 border rounded-md text-center text-lg tracking-widest mb-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            disabled={isVerifying}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600"
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Submit'}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
        <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 bg-opacity-50 dark:bg-opacity-30 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300">
          <p className="font-bold">Security Warning</p>
          <p>This link is for your personal use only. Do not share it. Access is monitored.</p>
        </div>
      </div>
    </div>
  );
}
