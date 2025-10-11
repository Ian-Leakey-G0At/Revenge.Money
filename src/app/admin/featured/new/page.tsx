'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigation } from '@/hooks/use-navigation';
import { ArrowLeft } from 'lucide-react';

export default function NewFeaturedPage() {
  const router = useNavigation();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold font-headline">Add Featured Content</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Slide {index + 1}</CardTitle>
              <CardDescription>Upload media for this slide.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Thumbnail Image</Label>
                <Button variant="outline" className="w-full">Upload Image</Button>
              </div>
              <div className="space-y-2">
                <Label>Thumbnail Video (Optional)</Label>
                <Button variant="outline" className="w-full">Upload Video</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-end gap-4 mt-8">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button>Save Featured Content</Button>
      </div>
    </div>
  );
}
