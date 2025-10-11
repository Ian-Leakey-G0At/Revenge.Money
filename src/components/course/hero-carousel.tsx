"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, jump: true })
  );

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="px-4 pt-6">
      <div className="bg-muted/20 rounded-3xl p-4">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.play}
          opts={{
            loop: true,
            align: "start",
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
      <div className="flex justify-center items-center gap-x-2 py-1">
        {PlaceHolderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="p-1 rounded-full"
          >
            <div
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 ease-in-out",
                current === index
                  ? "w-10 bg-primary"
                  : "w-5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
