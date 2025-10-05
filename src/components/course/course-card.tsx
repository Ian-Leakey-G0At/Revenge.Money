'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Play, Users } from 'lucide-react';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);
  const totalLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  const handleNavigation = () => {
    router.push(`/courses/${course.id}`);
  };

  const handlePlayPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would trigger a modal video player
    console.log(`Playing preview for ${course.title}`);
  };

  return (
    <article
      onClick={handleNavigation}
      className="relative flex flex-col group cursor-pointer transition-transform duration-150 ease-out hover:scale-105"
    >
      <div className="relative aspect-[9/12] w-full bg-card rounded-2xl overflow-hidden border">
        {image && (
          <Image
            src={image.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
        <button
          onClick={handlePlayPreview}
          aria-label={`Play preview for ${course.title}`}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center p-2 transition-transform hover:scale-110"
        >
          <Play className="w-4 h-4 fill-current" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <div className="text-white text-xs font-semibold bg-black/30 rounded-full px-3 py-1 border border-white/20">
            {totalLessons} VIDEOS
          </div>
          <div className="text-white font-bold bg-black/30 rounded-full px-4 py-1.5 text-sm border border-white/20 z-10">
            ${course.price}
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="relative flex flex-col justify-start items-start text-foreground min-h-[56px]">
          <h3 className="font-bold text-sm leading-tight text-white line-clamp-2 text-left absolute top-0 left-0">
            {course.title}
          </h3>
          <div className="absolute bottom-0 right-0 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span className="font-semibold">
              {course.studentsCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
