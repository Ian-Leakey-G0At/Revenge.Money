import { courses } from '@/lib/placeholder-data';
import { CoursePlayer } from '@/components/course/course-player';

export default function PurchasedCoursePage({ params, searchParams }: { params: { courseId: string }, searchParams: { token: string } }) {
  const course = courses.find(c => c.id === params.courseId);

  // In a real app, you'd have a more robust token validation system.
  const isValidToken = searchParams.token && searchParams.token.length > 5;

  if (!course) {
    return <div>Course not found</div>;
  }

  if (!isValidToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Permission Denied</h1>
        <p className="text-lg">You do not have access to this course.</p>
      </div>
    );
  }

  return <CoursePlayer course={course} />;
}
