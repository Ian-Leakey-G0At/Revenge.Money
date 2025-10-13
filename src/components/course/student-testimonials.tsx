'use client';
import * as React from 'react';
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function StudentTestimonials() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="mt-8 mb-12">
      <h2 className="text-lg font-semibold tracking-tight md:text-xl font-headline mb-4 text-center">
        What Our Students Say
      </h2>
      <Carousel
        plugins={[autoplayPlugin.current]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
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
  );
}
