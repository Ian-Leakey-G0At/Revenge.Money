'use client';
import { notFound, useParams } from 'next/navigation';
import { courses } from '@/lib/placeholder-data';
import { CoursePageLayout } from '@/components/course/course-page-layout';

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  return <CoursePageLayout course={course} isPurchased={false} />;
}
