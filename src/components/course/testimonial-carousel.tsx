'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
    Autoplay({ delay: 3000, stopOnInteraction: true })
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
      className="w-full"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => {
            // Use generated data if available (client-side), otherwise use placeholders
            const reviewer = randomReviewers[index] || { name: 'Student', location: 'USA', rating: 5 };
            const avatar = PlaceHolderImages.find((img) => img.id === testimonial.imageId);
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-start p-6 text-left h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <Avatar>
                                {avatar && <AvatarImage src={avatar.imageUrl} alt={reviewer.name} />}
                                <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{reviewer.name}</p>
                                <p className="text-xs text-muted-foreground">{reviewer.location}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'w-4 h-4',
                                reviewer.rating >= star ? 'text-primary fill-primary' : 'text-muted-foreground/30'
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
