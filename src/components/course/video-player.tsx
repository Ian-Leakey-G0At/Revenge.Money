'use client';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Rewind, FastForward } from 'lucide-react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface VideoPlayerProps {
  source: 'local' | 'youtube';
  identifier: string;
  onEnded?: () => void;
}

export function VideoPlayer({ source, identifier, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubePlayerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const togglePlayPause = () => {
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
    if (source === 'local' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(0);
      youtubePlayerRef.current.playVideo();
    }
  };

  const handleRewind = () => {
    if (source === 'local' && videoRef.current) {
      videoRef.current.currentTime -= 10;
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      const currentTime = youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(currentTime - 10, true);
    }
  };

  const handleForward = () => {
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
    if(onEnded) {
      onEnded();
    }
  }
  
  const onReady: YouTubeProps['onReady'] = (event) => {
    youtubePlayerRef.current = event.target;
  };

  return (
    <div
      className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {source === 'local' ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={identifier}
          autoPlay
          muted
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
              mute: 1,
              controls: 0,
              rel: 0,
            },
          }}
          className="w-full h-full absolute top-0 left-0"
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
