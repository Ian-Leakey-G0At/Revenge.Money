
'use client';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/course/course-card';
import { courses } from '@/lib/placeholder-data';
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
import Autoplay from "embla-carousel-autoplay"

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col gap-8">
      <section className="w-full">
        <HeroCarousel />
      </section>
      
      <section className="container mx-auto px-2">
        <GoodLuckButton />
      </section>

      <main className="container mx-auto px-2">
        <section>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl font-headline mb-6">
            Featured Courses
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
        
        <section className="mt-8 mb-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl font-headline mb-6 text-center">
            What Our Students Say
          </h2>
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
            }}
            className="w-full max-w-4xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
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
