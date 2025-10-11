'use client';

export function VideoPlaylist({ videos, onVideoSelect }: { videos: any[], onVideoSelect: (video: any) => void }) {
  return (
    <div className="flex flex-col gap-y-2">
      {videos.map((video) => (
        <button
          key={video.id}
          onClick={() => onVideoSelect(video)}
          className="text-left p-2 rounded-lg hover:bg-muted-foreground/10"
        >
          {video.title}
        </button>
      ))}
    </div>
  );
}
