import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/course/course-card';
import { courses } from '@/lib/placeholder-data';
import Link from 'next/link';

export function FeaturedCourses() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl font-headline">
          Featured Courses
        </h2>
        <Button variant="ghost" asChild>
          <Link href="/courses">See more</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.slice(0, 4).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
