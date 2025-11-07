"use client";

import { useSearchParams } from 'next/navigation';
import { courses } from '@/lib/placeholder-data';
import { CoursePlayer } from '@/components/course/course-player';
import { VerificationModal } from '@/components/course/verification-modal';
import { useEffect, useState } from 'react';

type VerificationState = 'idle' | 'loading' | 'verified' | 'error';

export default function CourseAccessPage({ params }: { params: { courseId: string } }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const course = courses.find(c => c.id === params.courseId);
  
  const [verificationState, setVerificationState] = useState<VerificationState>('idle');
  const [error, setError] = useState<string | null>(null);

  if (!course) {
    return <div>Course not found.</div>;
  }

  useEffect(() => {
    if (!token) {
      setVerificationState('error');
      setError('No access token provided. Please use the link from your purchase email.');
      return;
    }

    const requestAccess = async () => {
      setVerificationState('loading');
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
        // The modal will be shown because state is 'loading'
      } catch (err: any) {
        setVerificationState('error');
        setError(err.message || 'An unexpected error occurred.');
      }
    };

    requestAccess();
  }, [token]);

  const handleVerificationSuccess = () => {
    setVerificationState('verified');
  };

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

  // This covers 'idle' and 'loading' states
  return (
    <>
      {token && <VerificationModal token={token} onVerificationSuccess={handleVerificationSuccess} />}
      {/* Optional: Add a loading spinner or placeholder for the 'loading' state */}
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Requesting secure access...</p>
      </div>
    </>
  );
}
