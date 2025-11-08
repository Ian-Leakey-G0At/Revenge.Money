'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import { testimonials, generateRandomReviewer } from '@/lib/testimonials';
import Autoplay from 'embla-carousel-autoplay';

export function TestimonialCarousel() {
  const [randomReviewers, setRandomReviewers] = useState<ReturnType<typeof generateRandomReviewer>[]>([]);
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    // Generate random data only on the client side after the initial render
    setRandomReviewers(testimonials.map(() => generateRandomReviewer()));
  }, []);

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: 'start',
        loop: true,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {testimonials.map((testimonial, index) => {
            // Use generated data if available (client-side), otherwise use placeholders
            const reviewer = randomReviewers[index] || { name: 'Student', location: 'USA', rating: 5 };
            const avatar = PlaceHolderImages.find((img) => img.id === testimonial.imageId);
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="h-full p-4 md:p-6 flex flex-col items-center text-center glassmorphism rounded-lg border">
                  <Avatar className="w-12 h-12 md:w-16 md:h-16 mb-4">
                    {avatar && <AvatarImage src={avatar.imageUrl} alt={reviewer.name} />}
                    <AvatarFallback className="text-xl">{reviewer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'w-4 h-4',
                          reviewer.rating >= star ? 'text-primary fill-primary' : 'text-foreground/10'
                        )}
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm md:text-base font-light text-foreground/80 italic mb-4 flex-grow">
                    “{testimonial.quote}”
                  </blockquote>
                  <div className="mt-auto">
                      <p className="font-semibold text-sm">{reviewer.name}</p>
                      <p className="text-xs text-muted-foreground">{reviewer.location}</p>
                  </div>
                </div>
              </CarouselItem>
            )
        })}
      </CarouselContent>
    </Carousel>
  );
}
