'use client';
import { useEffect, useState } from 'react';
import { getPersonalizedCourseRecommendations } from '@/ai/flows/personalized-course-recommendations';
import type { Course } from '@/lib/types';
import { courses as allCourses } from '@/lib/placeholder-data';
import { CourseCard } from './course-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '../ui/skeleton';

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const input = {
          userId: 'mock-user-123',
          learningHistory: ['debt-free-roadmap'],
          interests: 'Personal finance and stock market investing for beginners',
          profileData: 'User is a 30-year-old professional looking to start investing and manage their finances better.',
        };
        // Mocking the AI response for UI development as it might not be available at build time
        // const result = await getPersonalizedCourseRecommendations(input);
        const result = { recommendedCourses: ['investing-101', 'budgeting-mastery', 'real-estate-investing'] };

        if (result && result.recommendedCourses) {
          const recommendedCourses = allCourses.filter((course) =>
            result.recommendedCourses.includes(course.id)
          );
          setRecommendations(recommendedCourses);
        } else {
            setRecommendations(allCourses.slice(0, 3)); // Fallback
        }
      } catch (e) {
        console.error('Failed to fetch recommendations:', e);
        setError('Could not load recommendations.');
        setRecommendations(allCourses.slice(0, 3)); // Fallback on error
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl font-headline mb-6">
        Just For You
      </h2>
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-destructive/10 border-destructive/50">
          <p className="text-destructive font-medium">{error}</p>
        </div>
      ) : (
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendations.map((course) => (
              <CarouselItem key={course.id} className="sm:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <CourseCard course={course} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex"/>
          <CarouselNext className="hidden lg:flex"/>
        </Carousel>
      )}
    </section>
  );
}
