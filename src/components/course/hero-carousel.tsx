'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { courses } from '@/lib/placeholder-data';

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="mb-10 pl-6">
      <div className="flex justify-between items-end pr-6 mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-widest">Priority Intelligence</h2>
      </div>

      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {courses.map((course) => (
            <CarouselItem key={course.id} className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[30%]">
              <Link href={`/courses/${course.id}`} className="flex flex-col cursor-pointer group">
                <div className="w-full aspect-video rounded-xl overflow-hidden relative border border-white/10 shadow-lg mb-3">
                  <Image
                    src={course.thumbnailUrl || '/placeholder-course.jpg'}
                    alt={course.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition duration-500"
                  />

                </div>
                <div>
                  <h3 className="text-sm font-extrabold uppercase text-white mb-1 group-hover:text-wealth-gold transition-colors leading-tight">
                    {course.name}
                  </h3>
                  <p className="text-[10px] text-cyber-mute line-clamp-1">
                    {course.longDescription}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Custom Dots */}
      <div className="flex justify-center gap-2 mt-6 pr-6">
        {courses.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              current === index ? "w-8 bg-primary" : "w-2 bg-white/20"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
