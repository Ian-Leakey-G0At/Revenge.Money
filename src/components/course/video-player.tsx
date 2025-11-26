
'use client';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Rewind, FastForward } from 'lucide-react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface VideoPlayerProps {
  source: 'local' | 'youtube';
  identifier: string;
  thumbnail?: string;
  onEnded?: () => void;
}

export function VideoPlayer({ source, identifier, thumbnail, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubePlayerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const handleShowControls = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const handleHideControls = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(false);
  }

  const startVideo = () => {
    setHasStarted(true);
    setIsPlaying(true);
    // The actual play logic will be handled by the effect or autoPlay prop when rendering the player
  };

  const togglePlayPause = () => {
    handleShowControls();
    if (source === 'local' && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      const playerState = youtubePlayerRef.current.getPlayerState();
      if (playerState === 1) {
        // Playing
        youtubePlayerRef.current.pauseVideo();
      } else {
        // Paused, buffering, ended, etc.
        youtubePlayerRef.current.playVideo();
      }
    }
  };

  const toggleMute = () => {
    handleShowControls();
    if (source === 'local' && videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      if (youtubePlayerRef.current.isMuted()) {
        youtubePlayerRef.current.unMute();
        setIsMuted(false);
      } else {
        youtubePlayerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleReplay = () => {
    handleShowControls();
    if (source === 'local' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(0);
      youtubePlayerRef.current.playVideo();
    }
  };

  const handleRewind = () => {
    handleShowControls();
    if (source === 'local' && videoRef.current) {
      videoRef.current.currentTime -= 10;
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      const currentTime = youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(currentTime - 10, true);
    }
  };

  const handleForward = () => {
    handleShowControls();
    if (source === 'local' && videoRef.current) {
      videoRef.current.currentTime += 10;
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      const currentTime = youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(currentTime + 10, true);
    }
  };

  const handleEnd = () => {
    setIsPlaying(false);
    if (source === 'youtube' && youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(0);
      youtubePlayerRef.current.pauseVideo();
    }
    if (onEnded) {
      onEnded();
    }
  }

  const onReady: YouTubeProps['onReady'] = (event) => {
    youtubePlayerRef.current = event.target;
  };

  if (!hasStarted && thumbnail) {
    return (
      <div
        className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted group cursor-pointer"
        onClick={startVideo}
      >
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-brand-purple/50 blur-xl rounded-full" />
            <div className="relative bg-brand-purple text-white rounded-full p-6 shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-white/20">
              <Play className="w-12 h-12 fill-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted group"
      onMouseMove={handleShowControls}
      onMouseLeave={handleHideControls}
    >
      {source === 'local' ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={identifier}
          autoPlay
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleEnd}
        />
      ) : (
        <YouTube
          videoId={identifier}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnd={handleEnd}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1,
              mute: 0, // Unmute by default when explicitly started
              controls: 0,
              rel: 0,
              modestbranding: 1,
            },
          }}
          className="w-full h-full absolute top-0 left-0 [&>iframe]:w-full [&>iframe]:h-full"
        />
      )}
      <div
        className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleRewind}
          >
            <Rewind className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleForward}
          >
            <FastForward className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-8 h-8" />
            ) : (
              <Volume2 className="w-8 h-8" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleReplay}
          >
            <RotateCcw className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
