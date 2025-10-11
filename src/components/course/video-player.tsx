'use client';

export function VideoPlayer({ video }: { video: any }) {
  if (!video) {
    return (
      <div className="aspect-video bg-muted-foreground/20 rounded-lg flex items-center justify-center">
        <p>Select a video to play</p>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg">
      {/* In a real application, you would use a video player component here */}
      <p className="text-white p-4">Playing: {video.title}</p>
    </div>
  );
}
