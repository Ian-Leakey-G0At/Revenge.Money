
'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Users, Play, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  course: Course;
}

const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M8 5.14v13.72L19.25 12 8 5.14z" />
    </svg>
  );
  

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  const handlePlayPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would trigger a modal video player
    console.log(`Playing preview for ${course.title}`);
  };

  const handleNavigation = () => {
    router.push(`/courses/${course.id}`);
  };

  return (
    <article 
        onClick={handleNavigation}
        className="relative flex flex-col h-full rounded-2xl border border-white/10 bg-[#1a1a1a] overflow-hidden group cursor-pointer transition-transform duration-150 ease-out hover:scale-105"
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-[9/12] w-full">
        {image && (
          <Image
            src={image.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
        
        {/* Top Right Play Button */}
        <button
            onClick={handlePlayPreview}
            aria-label={`Play preview for ${course.title}`}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center p-2 transition-transform hover:scale-110"
        >
            <Play className="w-4 h-4" fill="currentColor" />
        </button>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
          <div className="flex items-center gap-1.5 text-white text-xs font-semibold bg-black/30 rounded-full px-2 py-1">
            <Video className="h-3 w-3"/>
            <span>{totalLessons} VIDEOS</span>
          </div>
          <div className="text-white font-bold bg-black/30 rounded-full px-4 py-1.5 text-sm border border-white/20 z-10">
            ${course.price}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-3 bg-[#0a0a0a] flex-grow flex flex-col">
         <h3 className="font-bold text-sm leading-tight text-white line-clamp-2 min-h-[40px] mb-2">
            FEATURED COURSE {course.title}
          </h3>
        <div className="flex justify-between items-center text-xs text-neutral-400 mt-auto pt-1">
          <p className="font-mono">-----------</p>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span className="font-semibold">{course.studentsCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
