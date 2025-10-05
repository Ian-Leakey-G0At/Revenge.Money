
import { CourseCard } from '@/components/course/course-card';
import { Button } from '@/components/ui/button';
import { myCourses } from '@/lib/placeholder-data';
import Link from 'next/link';

export default function MyLearningPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
          My Learning
        </h1>
        <p className="text-lg text-muted-foreground">
          Continue your learning journey and master new skills.
        </p>
      </div>
      {myCourses.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {myCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
          <div className="text-2xl font-bold">Your learning path is empty.</div>
          <p className="mt-2 text-muted-foreground">
            Start a new journey by enrolling in a course.
          </p>
          <Button asChild className="mt-6">
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
