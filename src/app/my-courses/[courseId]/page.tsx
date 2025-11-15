'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { courses } from '@/lib/placeholder-data';
import { useEffect, useState } from 'react';
import { CoursePageLayout } from '@/components/course/course-page-layout';

type VerificationState = 'verifying' | 'verified' | 'error';

export default function CourseAccessPage() {
  const params = useParams();
  const courseId = typeof params.courseId === 'string' ? params.courseId : '';
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const course = courses.find(c => c.id === courseId);

  const [verificationState, setVerificationState] = useState<VerificationState>('verifying');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setVerificationState('error');
      setError('No access token provided. Please use the link from your purchase email.');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, courseId }),
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || 'Verification failed.');
        }

        setVerificationState('verified');
        setError(null);
      } catch (err: any) {
        setVerificationState('error');
        setError(err.message || 'An unexpected error occurred during verification.');
      }
    };

    verifyToken();
  }, [token, courseId]);

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
    return <CoursePageLayout course={course} isPurchased={true} />;
  }

  // Default loading state
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg">Verifying your access...</p>
    </div>
  );
}
