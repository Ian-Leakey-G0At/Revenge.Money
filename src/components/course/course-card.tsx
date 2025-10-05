'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Play, Users } from 'lucide-react';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
      {/* Thumbnail Section */}
      <div className="relative aspect-[9/12] w-full bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10">
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
          <Play className="w-4 h-4 fill-current" />
        </button>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
          <div className="text-white text-xs font-semibold bg-black/30 rounded-full px-2 py-1">
            {totalLessons} VIDEOS
          </div>
          <div className="text-white font-bold bg-black/30 rounded-full px-4 py-1.5 text-sm border border-white/20 z-10">
            ${course.price}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        <div className="relative flex items-center text-neutral-400 min-h-[42px]">
          <h3 className="font-bold text-sm leading-tight text-white line-clamp-2 flex-1 mr-12">
            {course.title}
          </h3>
          <div className="absolute bottom-0 right-0 flex items-center gap-1.5 text-xs flex-shrink-0">
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
