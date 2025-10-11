'use client';

import { Lock } from "lucide-react";

export function LockedVideoPlaylist({ videos }: { videos: any[] }) {
  return (
    <div className="flex flex-col gap-y-3">
      {videos.map((video) => (
        <div
          key={video.id}
          className="flex items-center gap-x-4 p-3 rounded-lg w-full text-left bg-muted/50 cursor-not-allowed"
        >
          <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-muted-foreground/10">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <span className="flex-1 text-muted-foreground">{video.title}</span>
        </div>
      ))}
    </div>
  );
}
