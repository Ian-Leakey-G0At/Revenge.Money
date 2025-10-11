'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { VideoPlayer } from '@/components/course/video-player';
import { VideoPlaylist } from '@/components/course/video-playlist';
import { CourseProgress } from '@/components/course/course-progress';
import { courses } from '@/lib/placeholder-data';

export default function PurchasedCoursePage() {
  const params = useParams();
  const course = courses.find(c => c.id === params.courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const allVideos = course.modules.flatMap(module => module.lessons);

  const [currentVideo, setCurrentVideo] = useState(allVideos[0]);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const handleVideoSelect = (video: any) => {
    setCurrentVideo(video);
    if (!completedVideos.includes(video.id)) {
      setCompletedVideos([...completedVideos, video.id]);
    }
  };

  const progress = allVideos.length > 0 ? (completedVideos.length / allVideos.length) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold font-headline mb-4">{course.title}</h1>
          <VideoPlayer video={currentVideo} />
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">About this course</h2>
            <p>{course.longDescription}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <VideoPlaylist videos={allVideos} onVideoSelect={handleVideoSelect} />
        </div>
      </div>
      <div className="mt-8">
        <CourseProgress progress={progress} />
      </div>
    </div>
  );
}
