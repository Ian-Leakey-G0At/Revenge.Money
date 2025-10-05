
'use client';
import { notFound } from 'next/navigation';
import { courses } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Star,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';
import { CoursePurchaseCard } from '@/components/course/course-purchase-card';
import { TestimonialCarousel } from '@/components/course/testimonial-carousel';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  if (!course) {
    notFound();
  }
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  
  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  }

  const instructorAvatar = PlaceHolderImages.find(
    (img) => img.id === course.instructor.avatarId
  );

  return (
    <div className="bg-background pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted my-6 group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
           <video 
              ref={videoRef}
              className="w-full h-full object-cover" 
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Placeholder video
              autoPlay 
              muted
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <div className={cn("absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300", showControls ? "opacity-100" : "opacity-0")}>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
                </Button>
                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleReplay}>
                  <RotateCcw className="w-8 h-8" />
                </Button>
              </div>
            </div>
        </div>

        <main className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight uppercase md:text-4xl font-headline mb-3">
            {course.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-8">
             <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {instructorAvatar && (
                      <AvatarImage
                        src={instructorAvatar.imageUrl}
                        alt={course.instructor.name}
                        data-ai-hint={instructorAvatar.imageHint}
                      />
                    )}
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
          
          <section className="mb-12">
            <h3 className="text-xl font-bold font-headline mb-4">Course Details</h3>
            <p className="text-muted-foreground mb-6">{course.longDescription}</p>
            
            <h4 className="font-semibold mb-3">What You'll Learn</h4>
            <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Advanced trading strategies</span>
                </li>
                 <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Risk management techniques</span>
                </li>
            </ul>

            <h4 className="font-semibold mb-3">Course Curriculum</h4>
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id}>
                    <p className="font-semibold text-foreground">{module.title} ({module.lessons.length} lessons)</p>
                    <ul className="mt-2 space-y-2 pl-4 border-l">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{lesson.title}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h3 className="text-xl font-bold font-headline mb-4">What Other Students Say</h3>
            <TestimonialCarousel />
          </section>

        </main>
      </div>

       <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 border-t backdrop-blur-sm z-50">
          <div className="container mx-auto px-4 md:px-6">
            <CoursePurchaseCard course={course} />
          </div>
        </div>
    </div>
  );
}
