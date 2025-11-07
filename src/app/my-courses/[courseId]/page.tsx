'use client';

import { useSearchParams } from 'next/navigation';
import { courses } from '@/lib/placeholder-data';
import { CoursePlayer } from '@/components/course/course-player';
import { VerificationModal } from '@/components/course/verification-modal';
import { useEffect, useState } from 'react';

type VerificationState = 'idle' | 'requesting' | 'awaiting_code' | 'verifying' | 'verified' | 'error';

export default function CourseAccessPage({ params }: { params: { courseId: string } }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const course = courses.find(c => c.id === params.courseId);

  const [verificationState, setVerificationState] = useState<VerificationState>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setVerificationState('error');
      setError('No access token provided. Please use the link from your purchase email.');
      return;
    }

    const requestCode = async () => {
      setVerificationState('requesting');
      try {
        const response = await fetch('/api/request-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || 'Failed to request access code.');
        }

        // The user now needs to enter the code they received
        setVerificationState('awaiting_code');
      } catch (err: any) {
        setVerificationState('error');
        setError(err.message || 'An unexpected error occurred while requesting the code.');
      }
    };

    requestCode();
  }, [token]);

  const handleVerification = async (code: string) => {
    if (!token) return;
    setVerificationState('verifying');
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, code }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Verification failed.');
      }

      setVerificationState('verified');
      setError(null);
    } catch (err: any) {
      setVerificationState('awaiting_code'); // Go back to the modal
      setError(err.message || 'An unexpected error occurred during verification.');
    }
  };

  if (!course) {
    return <div>Course not found.</div>;
  }

  if (verificationState === 'error') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-lg border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Access Problem</h2>
          <p className="text-gray-600">{error || 'An unknown error occurred.'}</p>
        </div>
      </div>
    );
  }

  if (verificationState === 'verified') {
    return <CoursePlayer course={course} />;
  }

  // Show the verification modal if we are awaiting a code.
  if (verificationState === 'awaiting_code' || verificationState === 'verifying') {
    return (
      <VerificationModal
        onVerify={handleVerification}
        isVerifying={verificationState === 'verifying'}
        error={error}
      />
    );
  }
  
  // Default state while we are requesting the code
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg">Requesting secure access...</p>
    </div>
  );
}
