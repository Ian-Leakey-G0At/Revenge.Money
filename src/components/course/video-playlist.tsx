'use client';

import { Video } from "lucide-react";

export function VideoPlaylist({ videos, onVideoSelect, currentVideo }: { videos: any[], onVideoSelect: (video: any) => void, currentVideo: any }) {
  return (
    <div className="flex flex-col gap-y-3">
      {videos.map((video) => (
        <button
          key={video.id}
          onClick={() => onVideoSelect(video)}
          className={`flex items-center gap-x-4 p-3 rounded-lg w-full text-left transition-colors ${currentVideo?.id === video.id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted-foreground/10'}`}>
          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${currentVideo?.id === video.id ? 'bg-primary/20' : 'bg-green-100'}`}>
            <Video className={`h-6 w-6 ${currentVideo?.id === video.id ? 'text-primary' : 'text-green-600'}`} />
          </div>
          <span className="flex-1">{video.title}</span>
        </button>
      ))}
    </div>
  );
}
