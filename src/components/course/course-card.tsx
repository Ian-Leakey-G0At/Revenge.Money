'use client';

import { Play, Users, Video, Bot } from 'lucide-react';
import type { Course } from '@/lib/types';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@lexz451/next-nprogress';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const totalLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const wasHeld = useRef(false);

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  const href = course.purchased ? `/my-courses/${course.id}` : `/courses/${course.id}`;
  const isAiTool = course.category === 'AI Tool';

  const playVideo = () => {
    setIsPlaying(true);
    wasHeld.current = true;
  };

  const handleMouseDown = () => {
    if (isMobile) return; // Disable hold-to-play on mobile
    wasHeld.current = false;
    if (!course.purchased) {
      holdTimeout.current = setTimeout(() => {
        playVideo();
      }, 1500); // 1.5 second hold to trigger video
    }
  };

  const handleMouseUp = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (wasHeld.current) {
      e.preventDefault();
      wasHeld.current = false;
      return;
    }
    if (isPlaying) {
      e.preventDefault();
      setIsPlaying(false);
      return;
    }
  };

  return (
    <div className="course-card-container">
      <div
        className="block course-card__media-section"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <Link
          href={href}
          onClick={handleLinkClick}
          prefetch={!isMobile} // Disable prefetching on mobile
          className="w-full h-full"
          aria-label={`View details for ${course.name}`}
        >
          <article className="w-full h-full">
            {isPlaying && (
              <video
                className="course-card__video pointer-events-none"
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Placeholder
                autoPlay
                controls={false}
                muted
                loop
                onEnded={() => setIsPlaying(false)}
              />
            )}

            <div className="course-card__media-overlay">
              {!course.purchased && <span className="course-card__price-tag text-primary font-bold">${course.price}</span>}
              {course.purchased && <span className="course-card__price-tag text-primary font-bold">Purchased</span>}
            </div>
          </article>
        </Link>
        {!course.purchased && (
          <button
            onClick={handlePlayPause}
            className="course-card__play-button"
            aria-label={`Play preview for ${course.name}`}
          >
            {isAiTool ? (
              <Bot className={cn("fill-white", isPlaying && "fill-primary")} />
            ) : (
              <Play className={cn("fill-white", isPlaying && "fill-primary")} />
            )}
          </button>
        )}
      </div>

      <div className="course-card__title-section">
        <h3 className="course-card__title">{course.name}</h3>
        <div className="course-card__info-bar">
          <p className="course-card__video-count">
            {isAiTool ? <Bot className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            <span>{totalLessons}</span>
          </p>
          <p className="course-card__student-count">
            <Users className="w-4 h-4" />
            <span>{course.studentsCount.toLocaleString()} Purchases</span>
          </p>
        </div>
      </div>
    </div>
  );
}
