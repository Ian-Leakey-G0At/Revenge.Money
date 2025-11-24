'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { testimonials as genericTestimonials, courseTestimonials, generateRandomReviewer } from '@/lib/testimonials';

interface StudentTestimonialsProps {
  courseId?: string;
}

export function StudentTestimonials({ courseId }: StudentTestimonialsProps) {
  const [randomReviewers, setRandomReviewers] = useState<ReturnType<typeof generateRandomReviewer>[]>([]);
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const reviews = courseId && courseTestimonials[courseId]
    ? courseTestimonials[courseId]
    : genericTestimonials;

  useEffect(() => {
    // Generate random data on the client side to avoid hydration mismatch
    setRandomReviewers(reviews.map(() => generateRandomReviewer()));
  }, [reviews]);

  return (
    <section className="py-4">
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
            {reviews.map((testimonial, index) => {
              const reviewer = randomReviewers[index] || { name: 'S', location: '...', rating: 5 };
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="h-full p-4 md:p-6 flex flex-col items-center text-center glass-card bg-void/80 backdrop-blur-md border border-white/10 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'w-4 h-4',
                            reviewer.rating >= star ? 'text-brand-purple fill-brand-purple' : 'text-white/10'
                          )}
                        />
                      ))}
                    </div>
                    <blockquote className="text-sm md:text-base font-light text-white/80 italic mb-4 flex-grow">
                      “{testimonial.quote}”
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold text-sm text-white">{reviewer.name}</p>
                      <p className="text-xs text-cyber-mute">{reviewer.location}</p>
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
