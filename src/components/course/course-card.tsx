/**
 * @typedef {object} CourseModuleLesson
 * @property {string} id - The unique identifier for the lesson.
 * @property {string} title - The title of the lesson.
 * @property {number} duration - The duration of the lesson in seconds.
 * @property {boolean} isCompleted - Whether the user has completed the lesson.
 * @property {boolean} isLocked - Whether the lesson is locked.
 */

/**
 * @typedef {object} CourseModule
 * @property {string} id - The unique identifier for the module.
 * @property {string} title - The title of the module.
 * @property {CourseModuleLesson[]} lessons - A list of lessons in the module.
 */

/**
 * Represents the data structure for a single course. This is the contract
 * that the frontend expects from the backend for endpoints like GET /api/courses.
 * @typedef {object} Course
 * @property {string} id - The unique identifier for the course.
 * @property {string} title - The full title of the course.
 * @property {string} description - A brief description of the course.
 * @property {string} imageId - The ID for the course's thumbnail image, used to look up the actual URL.
 * @property {number} price - The price of the course in USD.
 * @property {number} studentsCount - The number of students enrolled in the course.
 * @property {CourseModule[]} modules - An array of course modules.
 * @property {boolean} purchased - Whether the current user has purchased the course.
 */

/**
 * Defines the props for the CourseCard component.
 * @typedef {object} CourseCardProps
 * @property {Course} course - The course data object to display.
 */

/**
 * Renders a single course card for the catalog. Displays key information
 * such as title, price, and student count. On desktop, it features a
 * "hold-to-play" video preview. On mobile, this feature is disabled.
 *
 * This is a Client Component and expects all course data to be passed via props.
 *
 * @param {CourseCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered course card component.
 * @example
 * <CourseCard course={sampleCourseData} />
 */
'use client';

import Image from 'next/image';
import { Play, Users, Video } from 'lucide-react';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@lexz451/next-nprogress';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);
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
      <Link 
        href={href}
        onClick={handleLinkClick}
        prefetch={!isMobile} // Disable prefetching on mobile
        className="block course-card__media-section"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <article>
          {!isPlaying && image && (
            <Image
              src={image.imageUrl}
              alt={course.title}
              fill
              className="course-card__image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          )}
          {isPlaying && (
            <video 
                className="course-card__video" 
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Placeholder
                autoPlay 
                controls={false}
                muted
                loop
                onEnded={() => setIsPlaying(false)}
              />
          )}

          {!course.purchased && (
            <button
              onClick={handlePlayPause}
              className="course-card__play-button"
              aria-label={`Play preview for ${course.title}`}
            >
              <Play className={cn("fill-white", isPlaying && "fill-primary")} />
            </button>
          )}

          <div className="course-card__media-overlay">
            {!course.purchased && <span className="course-card__price-tag">${course.price}</span>}
            {course.purchased && <span className="course-card__price-tag">Purchased</span>}
          </div>
        </article>
      </Link>

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
