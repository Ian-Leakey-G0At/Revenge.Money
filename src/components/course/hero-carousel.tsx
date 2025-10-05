
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
import { Progress } from '@/components/ui/progress';

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
];


export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }
  
    const updateProgress = () => {
      const progress = Math.max(0, Math.min(1, api.scrollProgress()));
      setProgress(progress * 100);
    };
  
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      updateProgress();
    };
  
    api.on('select', onSelect);
    api.on('scroll', updateProgress)

    // Custom timer for progress bar independent of scroll
    let timer = 0;
    const interval = setInterval(() => {
        timer += 100 / (5000 / 100) // 100ms interval
        setProgress(timer)
        if (timer >= 100) {
            if (api.canScrollNext()) {
                api.scrollNext()
            } else {
                api.scrollTo(0)
            }
            timer = 0
        }
    }, 100)


    const stopAutoplay = () => {
        plugin.current.stop();
        clearInterval(interval);
    }
    
    api.on('pointerDown', stopAutoplay);

    return () => {
      api.off('select', onSelect);
      api.off('scroll', updateProgress)
      api.off('pointerDown', stopAutoplay)
      clearInterval(interval);
    };
  }, [api]);
  
  React.useEffect(() => {
    if (api) {
      api.scrollTo(current, true);
    }
  }, [api, current]);

  return (
    <div className="relative w-full aspect-video">
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
                        priority
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3">
        <Progress value={progress} className="h-1 bg-white/20 [&>div]:bg-white" />
      </div>
    </div>
  );
}
