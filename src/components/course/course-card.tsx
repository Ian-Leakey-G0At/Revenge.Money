
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, PlayCircle, Video } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);
  const [isHovered, setIsHovered] = useState(false);

  // In a real implementation, you would have a video URL.
  // For now, we'll just toggle the state to show how it would look.
  const hasVideoPreview = false; 

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  return (
    <Card 
      className="relative flex flex-col h-full overflow-hidden transition-all group border-0 shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/courses/${course.id}`} className="block">
        <CardContent className="relative p-0 aspect-[9/12]">
          {image && (
            <Image
              src={image.imageUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
          )}
          {/* Video player would go here */}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 bg-black/30 hover:bg-black/50 text-white hover:text-white">
            <PlayCircle className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
            <div className="flex items-center gap-2 text-white text-xs font-semibold">
              <Video className="h-4 w-4"/>
              <span>{totalLessons} VIDEOS</span>
            </div>
            <div className="text-white font-bold bg-black/30 rounded-full px-4 py-1.5 text-sm border border-white/20">
              ${course.price}
            </div>
          </div>
        </CardContent>
      </Link>
      <div className="p-3 bg-card">
         <h3 className="font-bold text-sm leading-tight text-foreground truncate">
            <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">
              {course.title}
            </Link>
          </h3>
        <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
          <p className="font-semibold uppercase tracking-wider">Featured Course</p>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{course.studentsCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
