'use client';

import { useState, useEffect } from 'react';
import { Course, Lesson } from '@/lib/types';
import { VideoPlayer } from './video-player';
import { LockedVideoPlaylist } from './locked-video-playlist';
import { VideoPlaylist } from './video-playlist';
import { CustomerRatings } from './customer-ratings';
import { StudentTestimonials } from './student-testimonials';
import { AntechamberModal } from '@/components/ui/antechamber-modal';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot, Lock, Play, ShieldCheck, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { getDynamicThumbnail } from '@/lib/thumbnails';

interface CoursePageLayoutProps {
  course: Course;
  isPurchased?: boolean;
}

export function CoursePageLayout({ course, isPurchased: propIsPurchased }: CoursePageLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const { toast } = useToast();

  // Progress Tracking
  const [completedLessonIds, setCompletedLessonIds] = useLocalStorage<string[]>(`completed_lessons_${course.id}`, []);

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const progress = totalLessons > 0 ? (completedLessonIds.length / totalLessons) * 100 : 0;

  const isPurchased = propIsPurchased ?? course.purchased ?? false;

  // Initialize activeLesson to the first lesson if purchased and not already set
  // Initialize activeLesson to the first lesson if purchased and not already set
  useEffect(() => {
    if (isPurchased && !activeLesson && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      const firstLesson = course.modules[0].lessons[0];
      setActiveLesson(firstLesson);
    }
  }, [isPurchased, activeLesson, course]);


  // Flatten lessons for playlist
  const allVideos = course.modules.flatMap(m => m.lessons);

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mark as complete if not already
    if (!completedLessonIds.includes(lesson.id)) {
      setCompletedLessonIds([...completedLessonIds, lesson.id]);
    }
  };

  const handleVideoEnd = () => {
    if (!activeLesson) return;

    const currentIndex = allVideos.findIndex(v => v.id === activeLesson.id);
    if (currentIndex !== -1 && currentIndex < allVideos.length - 1) {
      const nextLesson = allVideos[currentIndex + 1];
      handleLessonSelect(nextLesson);
    }
  };

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };

  // Video Source Logic
  const shouldPlayTeaser = !isPurchased || course.id === 'guy-fawkes-8';

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getDailymotionId = (url: string) => {
    const regExp = /[?&]video=([a-zA-Z0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  let videoSourceType: 'local' | 'youtube' | 'dailymotion' = 'local';
  if (!shouldPlayTeaser && activeLesson) {
    videoSourceType = activeLesson.youtubeVideoId ? 'youtube' : 'local';
  } else {
    if (course.teaserVideoUrl?.includes('dailymotion')) {
      videoSourceType = 'dailymotion';
    } else if (course.teaserVideoUrl && (course.teaserVideoUrl.includes('youtube') || course.teaserVideoUrl.includes('youtu.be'))) {
      videoSourceType = 'youtube';
    } else {
      videoSourceType = 'local';
    }
  }

  let videoIdentifier = '';
  if (!shouldPlayTeaser && activeLesson) {
    videoIdentifier = activeLesson.youtubeVideoId || activeLesson.videoUrl || '';
  } else {
    if (videoSourceType === 'youtube' && course.teaserVideoUrl) {
      videoIdentifier = getYouTubeId(course.teaserVideoUrl) || course.teaserVideoUrl;
    } else if (videoSourceType === 'dailymotion' && course.teaserVideoUrl) {
      videoIdentifier = getDailymotionId(course.teaserVideoUrl) || course.teaserVideoUrl;
    } else {
      videoIdentifier = course.teaserVideoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    }
  }

  const isAiTool = course.category === 'AI Tool';
  const aiNotebookUrl = "https://notebooklm.google.com/notebook/1ed52c6c-bc0d-4a55-a1ec-bacac4220f8f";

  return (
    <div className="min-h-screen pb-32 pt-[72px] relative overflow-hidden">
      {/* Ambient Biology: Pulsating Blobs - REMOVED FOR PERFORMANCE ALIGNMENT */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
      </div>
      {/* Fixed Header with Back Button */}
      <div className="fixed top-0 left-0 right-0 h-[72px] z-40 bg-void/90 backdrop-blur-md border-b border-white/5 pl-6 pr-8 flex items-center justify-between pt-0 transition-all duration-300">
        <a href="/courses" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition border border-white/10">
          <ArrowLeft className="w-5 h-5 text-white" />
        </a>
        <img src="/logo/revenge_money_logo_dark_theme.png" alt="Revenge Money" className="h-12 w-auto" />
      </div>

      {/* Video Player (Non-Sticky) */}
      <div className="w-full bg-void shadow-2xl relative z-0">
        <VideoPlayer
          source={videoSourceType}
          identifier={videoIdentifier}
          thumbnail={getDynamicThumbnail(course.id, 'hero', course.thumbnailUrl || '/placeholder-course.jpg')}
          onEnded={handleVideoEnd}
        />
      </div>

      <main className="px-6 pt-6">
        {/* Title & Meta */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold uppercase text-white leading-tight mb-2">
            {course.name}
          </h1>
          <div className="flex items-center gap-3 text-[10px] text-cyber-mute font-mono uppercase tracking-widest">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-brand-purple" />
              <span>Verified Protocol</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <span>{course.studentsCount.toLocaleString()} Active Students</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 leading-relaxed">
            {course.longDescription}
          </p>
        </div>

        {/* Curriculum */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest">
              {isAiTool ? (
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Neural Link
                </span>
              ) : (
                "Mission Briefing"
              )}
            </h2>
            <span className="text-[10px] text-cyber-mute font-mono">
              {isAiTool ? "AI ACCESS" : `${totalLessons} MODULES`}
            </span>
          </div>

          {isPurchased ? (
            <VideoPlaylist videos={allVideos} onVideoSelect={handleLessonSelect} isAiTool={isAiTool} />
          ) : (
            <LockedVideoPlaylist videos={allVideos} isAiTool={isAiTool} />
          )}
        </section>

        {/* Reviews */}
        <section className="mb-10">
          <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Field Reports</h2>
          <StudentTestimonials courseId={course.id} />
        </section>

        {/* Ratings */}
        <section className="mb-24">
          <CustomerRatings course={course} />
        </section>
      </main>

      {/* Static Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-void/80 backdrop-blur-xl border-t border-white/10">
        {isPurchased ? (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-mono text-cyber-mute uppercase">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <ProgressBar value={progress} className="h-1 bg-white/10" indicatorClassName="bg-brand-purple" />

            {isAiTool ? (
              <Button
                asChild
                className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 mt-2"
              >
                <a href={aiNotebookUrl} target="_blank" rel="noopener noreferrer">
                  <Bot className="w-4 h-4 mr-2" />
                  Access Financial Brain
                </a>
              </Button>
            ) : (
              <Button asChild className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 mt-2">
                <a href="/courses/guy-fawkes-8">
                  <Bot className="w-4 h-4 mr-2" />
                  Access Financial Brain
                </a>
              </Button>
            )}
          </div>
        ) : (
          <Button
            onClick={handlePurchaseClick}
            className="w-full h-14 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 rounded-lg flex items-center justify-center gap-3"
          >
            Acquire Access <span className="text-white font-extrabold text-xl">${course.price}</span>
          </Button>
        )}
      </div>

      <AntechamberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        checkoutUrl={course.vendettaMachineUrl}
      />
    </div >
  );
}
