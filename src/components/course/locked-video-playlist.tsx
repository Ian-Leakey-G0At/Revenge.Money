'use client';

import { Lock, Video } from "lucide-react";

export function LockedVideoPlaylist({ videos }: { videos: any[] }) {
  return (
    <div className="flex flex-col gap-y-3">
      {videos.map((video) => (
        <div
         key={video.id}
         className="flex items-center gap-x-4 p-3 rounded-lg w-full text-left bg-muted/50 cursor-not-allowed"
       >
         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted-foreground/10 flex-shrink-0">
           <Video className="h-6 w-6 text-muted-foreground" />
         </div>
         <span className="flex-1 text-muted-foreground">{video.title}</span>
         <Lock className="h-5 w-5 text-muted-foreground" />
       </div>
     ))}
   </div>
 );
}
