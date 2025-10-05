import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/course/course-card';
import { courses, myCourses } from '@/lib/placeholder-data';
import { PersonalizedRecommendations } from '@/components/course/personalized-recommendations';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { HeroCarousel } from '@/components/course/hero-carousel';
import { GoodLuckButton } from '@/components/course/good-luck-button';

export default function Home() {

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <section className="w-full md:container md:mx-auto md:px-4 md:pt-8 md:md:px-6">
        <HeroCarousel />
      </section>
      
      <section className="container mx-auto px-4 md:px-6 -mt-4 mb-4">
        <GoodLuckButton />
      </section>

      <main className="container mx-auto px-4 md:px-6">
        <section>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl font-headline mb-6">
            My Learning
          </h2>
          {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myCourses.map((course) => (
                <CourseCard key={course.id} course={course} progress={Math.floor(Math.random() * 80) + 10} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">Your learning journey is empty</h3>
                <p className="text-muted-foreground mt-2">Start by exploring our course catalog.</p>
                <Button asChild className="mt-4">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl font-headline mb-6">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
        
        <section className="mt-12">
          <PersonalizedRecommendations />
        </section>

        <section className="mt-12 mb-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl font-headline mb-6 text-center">
            What Our Students Say
          </h2>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col justify-between p-6">
                        <p className="italic">
                          "This course completely changed how I see my finances. Highly recommended!"
                        </p>
                        <p className="font-semibold text-right mt-4">- Student #{index + 1}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='hidden md:block'>
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </section>
      </main>
    </div>
  );
}
