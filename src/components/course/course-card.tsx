'use client';

import Link from 'next/link';
import { Play, Bot, Video, Users, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Course } from '@/lib/types';
import { useState, useRef } from 'react';
import { isMobile } from 'react-device-detect';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isAiTool = course.category === 'AI Tool';
  const totalLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  const handleMouseDown = () => {
    if (isMobile || course.purchased) return;
    timeoutRef.current = setTimeout(() => {
      setIsPlaying(true);
    }, 1500); // 1.5s hold to play
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPlaying(false);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isPlaying) {
      e.preventDefault();
    }
  };

  const href = course.purchased
    ? `/my-courses/${course.id}`
    : `/courses/${course.id}`;

  return (
    <div className="flex flex-col cursor-pointer group">
      <div
        className="relative aspect-[3/4] w-full bg-void-depth rounded-xl overflow-hidden border border-white/5 shadow-lg mb-3 group-hover:border-white/20 transition duration-300"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <Link
          href={href}
          onClick={handleLinkClick}
          prefetch={!isMobile}
          className="w-full h-full block"
        >
          {isPlaying ? (
            <video
              ref={videoRef}
              src={course.teaserVideoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={course.thumbnailUrl}
              alt={course.name}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
            />
          )}

          <div className="absolute top-2 right-2">
            {course.purchased ? (
              <CheckCircle2 className="w-5 h-5 text-vengeance-red shadow-glow-red drop-shadow-md" />
            ) : (
              <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-white border border-white/10">
                ${course.price}
              </div>
            )}
          </div>
        </Link>
      </div>

      <div>
        <h3 className="text-xs font-extrabold text-white uppercase leading-tight line-clamp-2 mb-1 group-hover:text-brand-purple transition-colors h-8">
          {course.name}
        </h3>
        <div className="flex items-center justify-between text-[9px] text-cyber-mute">
          <div className="flex items-center gap-1">
            <Video className="w-3 h-3" />
            <span>{totalLessons} Videos</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{course.studentsCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
