
'use client';
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
    { quote: "This specific course changed my entire approach to the market. A must-have for serious traders.", author: "Alex R." },
    { quote: "The instructor explains complex topics in a simple way. Finally understood options!", author: "Sarah L." },
    { quote: "I made back the course fee in my first week of trading with these strategies. Highly recommended.", author: "Mike D." },
    { quote: "Actionable, clear, and incredibly effective. The risk management section alone is worth the price.", author: "Jessica P." },
]

export function TestimonialCarousel() {
  return (
    <Carousel
        opts={{
        align: 'start',
        loop: true,
        }}
        className="w-full"
    >
        <CarouselContent>
        {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
            <div className="p-1 h-full">
                <Card className="h-full bg-card/80">
                <CardContent className="flex h-full flex-col justify-between p-6">
                    <p className="italic text-foreground/90">
                    "{testimonial.quote}"
                    </p>
                    <p className="font-semibold text-right mt-4 text-muted-foreground">- {testimonial.author}</p>
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
  );
}
