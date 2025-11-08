'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { testimonials, generateRandomReviewer } from '@/lib/testimonials';

export function StudentTestimonials() {
  const [randomReviewers, setRandomReviewers] = useState<ReturnType<typeof generateRandomReviewer>[]>([]);
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    // Generate random data on the client side to avoid hydration mismatch
    setRandomReviewers(testimonials.map(() => generateRandomReviewer()));
  }, []);

  return (
    <section className="py-4 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-light tracking-tight text-center mb-4">
          What Other Students Say
        </h2>
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
                const reviewer = randomReviewers[index] || { name: 'S', location: '...', rating: 5 };
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
      </div>
    </section>
  );
}
