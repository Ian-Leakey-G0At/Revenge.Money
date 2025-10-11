'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, jump: true })
  );
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = React.useCallback(() => {
    autoplayPlugin.current.stop();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      autoplayPlugin.current.play();
    }, 5000);
  }, []);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
    api.on('pointerDown', handleInteraction);
    
    return () => {
       if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [api, handleInteraction]);

  return (
    <section className="px-4 pt-6">
      <div className="bg-muted/20 rounded-3xl p-4 mb-2">
        <Carousel
          setApi={setApi}
          plugins={[autoplayPlugin.current]}
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={() => autoplayPlugin.current.play()}
          opts={{
            loop: true,
            align: 'start',
          }}
          className="relative"
        >
          <CarouselContent className="-ml-0 rounded-2xl overflow-hidden">
            {PlaceHolderImages.map((image, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="aspect-video relative">
                  <Image
                    src={image.imageUrl}
                    alt={image.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex justify-center items-center gap-x-2">
        {PlaceHolderImages.map((_, index) => (
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
