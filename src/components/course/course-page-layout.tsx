
'use client';
import { courses } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Star
} from 'lucide-react';
import { TestimonialCarousel } from '@/components/course/testimonial-carousel';
import { CustomerRatings } from '@/components/course/customer-ratings';
import { useRef, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LockedVideoPlaylist } from '@/components/course/locked-video-playlist';
import { type Course, type Lesson } from '@/lib/types';
import { VideoPlaylist } from './video-playlist';
import { AntechamberModal } from '@/components/ui/antechamber-modal';
import { ProgressBar } from '@/components/ui/progress-bar';
import { VideoPlayer } from '@/components/course/video-player';

interface CoursePageLayoutProps {
  course: Course;
  isPurchased: boolean;
}

export function CoursePageLayout({ course, isPurchased }: CoursePageLayoutProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentLesson, setCurrentLesson] = useState(course.modules.flatMap(module => module.lessons)[0]);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());

  const allVideos = course.modules.flatMap(module => module.lessons);
  const progress = watchedVideos.size / allVideos.length * 100;

  const handleLessonSelect = (lesson: Lesson) => {
    if (isPurchased) {
      setCurrentLesson(lesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast({
        title: 'Purchase Required',
        description: "You must purchase this course to view its lessons.",
        variant: "destructive",
      });
    }
  };

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };

  const videoSource = isPurchased ? "youtube" : "local";
  const videoIdentifier = isPurchased ? currentLesson.youtubeVideoId! : course.teaserVideoUrl;


  return (
    <div className="bg-background pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="my-2">
          <VideoPlayer source={videoSource} identifier={videoIdentifier} />
        </div>

        <main className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight uppercase md:text-4xl font-headline mb-3">
            {course.name}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {course.instructor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-sm text-foreground">
                By {course.instructor.name}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="font-semibold text-sm text-foreground">{course.rating}</span>
              <span className="text-sm">({course.studentsCount.toLocaleString()})</span>
            </div>
          </div>

          <section className="mb-12 overflow-hidden">
            <h3 className="text-xl font-bold font-headline mb-4">Course Details</h3>
            <p className="text-muted-foreground mb-6">{course.longDescription}</p>

            <h3 className="text-xl font-bold font-headline mb-4">Course Content</h3>
            {isPurchased ? (
              <VideoPlaylist videos={allVideos} onVideoSelect={handleLessonSelect} />
            ) : (
              <LockedVideoPlaylist videos={allVideos} />
            )}
          </section>

          <section className="mb-12 overflow-hidden">
            <h3 className="text-xl font-bold font-headline mb-4">What Other Students Say</h3>
            <TestimonialCarousel />
          </section>

          <section className="mb-12 overflow-hidden">
            <CustomerRatings course={course} />
          </section>
        </main>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/80 border-t backdrop-blur-sm z-40 md:relative md:bg-transparent md:border-none md:backdrop-blur-none md:bottom-auto">
        <div className="container mx-auto px-4 md:px-6">
          {isPurchased ? (
             <div className="w-full font-bold text-lg">
              <ProgressBar value={progress} />
             </div>
          ) : (
            <>
              <AntechamberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProceed={() => setIsModalOpen(false)}
                vendettaMachineUrl={course.vendettaMachineUrl}
              />
              <Button
                size="lg"
                className="w-full font-bold text-lg"
                onClick={handlePurchaseClick}
              >
                <div className="flex justify-between items-center w-full">
                  <span>${course.price}</span>
                  <span>Acquire Access</span>
                </div>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
