'use client';

import { useState } from 'react';
import { Course, Lesson } from '@/lib/types';
import { VideoPlayer } from './video-player';
import { LockedVideoPlaylist } from './locked-video-playlist';
import { VideoPlaylist } from './video-playlist';
import { CustomerRatings } from './customer-ratings';
import { StudentTestimonials } from './student-testimonials';
import { AntechamberModal } from '@/components/ui/antechamber-modal';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot, Lock, Play, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CoursePageLayoutProps {
  course: Course;
}

export function CoursePageLayout({ course }: CoursePageLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const { toast } = useToast();

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = 0; // Placeholder for actual progress
  const progress = (completedLessons / totalLessons) * 100;

  const isPurchased = course.purchased;

  // Video Source Logic
  const videoSourceType = (isPurchased && activeLesson && activeLesson.videoUrl) || (course.teaserVideoUrl && !course.teaserVideoUrl.includes('youtube')) ? 'local' : 'youtube';

  const videoSource = isPurchased && activeLesson
    ? activeLesson.videoUrl
    : course.teaserVideoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const videoIdentifier = isPurchased && activeLesson ? activeLesson.id : 'teaser';

  // Flatten lessons for playlist
  const allVideos = course.modules.flatMap(m => m.lessons);

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-32 pt-[72px] relative overflow-hidden volumetric-bg">
      {/* Ambient Biology: Pulsating Blobs */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-vengeance-red/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-brand-cyan/5 rounded-full blur-[100px] animate-pulse-slow delay-2000"></div>
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
          thumbnail={course.thumbnailUrl}
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
              {course.category === 'AI Tool' ? (
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Neural Link
                </span>
              ) : (
                "Mission Briefing"
              )}
            </h2>
            <span className="text-[10px] text-cyber-mute font-mono">
              {course.category === 'AI Tool' ? "AI ACCESS" : `${totalLessons} MODULES`}
            </span>
          </div>

          {isPurchased ? (
            <VideoPlaylist videos={allVideos} onVideoSelect={handleLessonSelect} isAiTool={course.category === 'AI Tool'} />
          ) : (
            <LockedVideoPlaylist videos={allVideos} isAiTool={course.category === 'AI Tool'} />
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
            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 mt-2">
              <Bot className="w-4 h-4 mr-2" />
              Access Financial Brain
            </Button>
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
