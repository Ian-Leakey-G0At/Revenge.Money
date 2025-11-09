'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

const SLIDE_COUNT = 8;

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [_, setInteracted] = useState(false);

  const handleInteraction = useCallback(() => {
    setInteracted(true);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className="w-full">
      <div className="relative w-full">
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent onMouseDown={handleInteraction} onTouchStart={handleInteraction}>
            {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 rounded-lg overflow-hidden">
                  <CardContent className="flex aspect-video items-center justify-center p-0">
                    {/* This is an empty slide as requested */}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex justify-center items-center gap-x-2 mt-4">
        {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              api?.scrollTo(index);
              handleInteraction();
            }}
            aria-label={`Go to slide ${index + 1}`}
            className="p-0.5 rounded-full"
          >
            <div
              className={cn(
                'h-1 rounded-full transition-all duration-500 ease-in-out',
                current === index
                  ? 'w-8 bg-primary'
                  : 'w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
