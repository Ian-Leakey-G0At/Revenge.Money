
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const heroContent = [
  {
    id: 'hero-1',
    imageId: 'course-stock-market',
    headline: 'Master Your Money, Master Your Life',
    subhead: 'Gain the financial knowledge and skills to achieve your goals with our expert-led courses.',
    cta: {
      text: 'Explore Courses',
      href: '/courses',
    },
  },
  {
    id: 'hero-2',
    imageId: 'course-debt-free',
    headline: 'Your Journey to Debt-Free Starts Here',
    subhead: 'Actionable strategies to eliminate debt and build a secure financial future.',
    cta: {
      text: 'Find Your Path',
      href: '/courses/debt-free-roadmap',
    },
  },
  {
    id: 'hero-3',
    imageId: 'course-investing-101',
    headline: 'Unlock the Power of Investing',
    subhead: 'Learn to build long-term wealth, even if you\'re starting from scratch.',
    cta: {
      text: 'Start Investing',
      href: '/courses/investing-101',
    },
  },
    {
    id: 'hero-4',
    imageId: 'course-real-estate',
    headline: 'Build Wealth with Real Estate',
    subhead: 'Discover how to find, finance, and manage profitable rental properties.',
    cta: {
      text: 'Learn More',
      href: '/courses/real-estate-investing',
    },
  },
  {
    id: 'hero-5',
    imageId: 'course-crypto',
    headline: 'Navigate the World of Crypto',
    subhead: 'Understand the fundamentals of cryptocurrency and decentralized finance.',
    cta: {
      text: 'Explore Crypto',
      href: '/courses/crypto-fundamentals',
    },
  },
];


export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }
  
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
  
    api.on('select', onSelect);
    
    const stopAutoplay = () => {
        plugin.current.stop();
    }
    
    api.on('pointerDown', stopAutoplay);

    return () => {
      api.off('select', onSelect);
      api.off('pointerDown', stopAutoplay)
    };
  }, [api]);
  
  return (
    <div className="relative w-full aspect-[16/9]">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {heroContent.map((item) => {
            const image = PlaceHolderImages.find(img => img.id === item.imageId);
            return (
              <CarouselItem key={item.id} className="h-full">
                <div className="relative w-full h-full">
                   {image && (
                    <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                        priority={item.id === 'hero-1'}
                    />
                    )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="relative max-w-2xl px-4 text-foreground">
                      <h1 className="text-4xl font-bold tracking-tight md:text-6xl font-headline text-white">
                        {item.headline}
                      </h1>
                      <p className="mt-4 text-lg md:text-xl text-white/90">
                        {item.subhead}
                      </p>
                      <Button asChild size="lg" className="mt-8">
                        <Link href={item.cta.href}>{item.cta.text}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 max-w-xs flex gap-2 px-4">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="flex-1 h-1 rounded-full bg-white/30"
          >
            <div
              className={cn(
                'h-full rounded-full bg-white transition-all duration-500',
                index === current ? 'w-full' : 'w-0'
              )}
            />
             <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
