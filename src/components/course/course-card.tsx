
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Play, Users, Video } from 'lucide-react';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useRef } from 'react';
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

  const [isPlaying, setIsPlaying] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const wasHeld = useRef(false);

  const handleNavigation = () => {
    if (wasHeld.current) {
      wasHeld.current = false; // Reset flag after preventing navigation
      return;
    }
    // If video is playing, the first tap should just pause it.
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    router.push(`/courses/${course.id}`);
  };

  const playVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(true);
    wasHeld.current = true;
  };
  
  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(prev => !prev);
  }

  const handleMouseDown = () => {
    wasHeld.current = false;
    holdTimeout.current = setTimeout(() => {
      playVideo();
    }, 1500);
  };

  const handleMouseUp = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }
  };

  return (
    <div className="course-card-container">
      <article
        className="course-card__media-section"
        onClick={handleNavigation}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {!isPlaying && image && (
          <Image
            src={image.imageUrl}
            alt={course.title}
            fill
            className="course-card__image"
            priority
          />
        )}
        {isPlaying && (
           <video 
              className="course-card__video" 
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Placeholder video
              autoPlay 
              controls={false}
              muted
              loop
              onEnded={() => setIsPlaying(false)}
            />
        )}

        <button
          onClick={handlePlayPause}
          className="course-card__play-button"
          aria-label={`Play preview for ${course.title}`}
        >
          <Play className={cn("fill-white", isPlaying && "fill-primary")} />
        </button>

        <div className="course-card__media-overlay">
          <span className="course-card__price-tag">${course.price}</span>
        </div>
      </article>

      <div className="course-card__title-section">
        <h3 className="course-card__title">{course.title}</h3>
        <div className="course-card__info-bar">
          <p className="course-card__video-count">
            <Video />
            <span>{totalLessons}</span>
          </p>
          <p className="course-card__student-count">
            <Users />
            <span>{course.studentsCount.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
