
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Users, PlayCircle, Video } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Play button clicked");
  };

  return (
    <Card className="relative flex flex-col h-full overflow-hidden transition-all group border-0 shadow-lg">
      <Link href={`/courses/${course.id}`} className="block absolute inset-0 z-0" aria-label={`View course: ${course.title}`} />
      
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 bg-black/30 hover:bg-black/50 text-white hover:text-white z-10"
          onClick={handlePlayClick}
        >
          <PlayCircle className="h-5 w-5" />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
          <div className="flex items-center gap-2 text-white text-xs font-semibold">
            <Video className="h-4 w-4"/>
            <span>{totalLessons} VIDEOS</span>
          </div>
          <div className="text-white font-bold bg-black/30 rounded-full px-4 py-1.5 text-sm border border-white/20 z-10">
            ${course.price}
          </div>
        </div>
      </CardContent>
      
      <div className="p-3 bg-card relative z-10 flex-grow flex flex-col justify-between">
         <h3 className="font-bold text-sm leading-tight text-foreground line-clamp-2 min-h-[40px] mb-2">
            {course.title}
          </h3>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <p className="font-semibold uppercase tracking-wider">{course.category}</p>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{course.studentsCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
