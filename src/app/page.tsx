import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/course/course-card';
import { courses, myCourses } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PersonalizedRecommendations } from '@/components/course/personalized-recommendations';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'course-stock-market'
  );

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <section className="relative h-[400px] md:h-[500px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="relative max-w-2xl px-4 text-foreground">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl font-headline">
              Master Your Money, Master Your Life
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Gain the financial knowledge and skills to achieve your goals with
              our expert-led courses.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>
    </div>
  );
}
