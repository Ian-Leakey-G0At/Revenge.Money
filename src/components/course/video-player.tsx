'use client';

import { useState, useEffect } from 'react';

export function VideoPlayer({ video, autoPlay = true }: { video: any, autoPlay?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  if (!video) {
    return (
      <div className="aspect-video bg-muted-foreground/20 rounded-lg flex items-center justify-center">
        <p>Select a video to play</p>
      </div>
    );
  }

  // Autoplay is disabled on mobile devices to save bandwidth and improve performance.
  const shouldAutoPlay = autoPlay && !isMobile;

  return (
    <div className="aspect-video bg-black rounded-lg">
      {/* A real video player would be used here.
          The `shouldAutoPlay` prop would be passed to the player.
          For now, we just display the state. */}
      <div className="p-4 text-white">
        <p>Video: {video.title}</p>
        <p>Status: {shouldAutoPlay ? 'Playing (Autoplay)' : 'Paused'}</p>
        {!shouldAutoPlay && autoPlay && (
          <p className="text-sm text-gray-400">(Autoplay disabled on mobile)</p>
        )}
      </div>
    </div>
  );
}
