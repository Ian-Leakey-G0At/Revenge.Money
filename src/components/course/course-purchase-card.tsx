'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Course } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function CoursePurchaseCard({ course }: { course: Course }) {
  const { toast } = useToast();
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);
  
  const handlePurchase = () => {
    toast({
      title: 'Checkout Initiated (Mock)',
      description: `You are being redirected to purchase "${course.title}". This is a mock action.`,
    })
  }

  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="relative h-48 w-full hidden md:block">
          <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        </div>
      )}
      <CardContent className="p-6">
        <p className="text-3xl font-bold mb-4">${course.price}</p>
        <Button size="lg" className="w-full font-bold" onClick={handlePurchase}>
          Buy Now
        </Button>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          30-Day Money-Back Guarantee
        </p>
      </CardContent>
    </Card>
  );
}
