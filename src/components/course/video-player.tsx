'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Rewind, FastForward } from 'lucide-react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface VideoPlayerProps {
  source: 'local' | 'youtube' | 'dailymotion';
  identifier: string;
  thumbnail?: string;
  onEnded?: () => void;
}

export function VideoPlayer({ source, identifier, thumbnail, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubePlayerRef = useRef<any>(null);
  const dailymotionContainerRef = useRef<HTMLDivElement>(null);
  const dailymotionPlayerRef = useRef<any>(null);

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
  };

  const handleEnd = () => {
    setIsPlaying(false);
    if (source === 'youtube' && youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(0);
      youtubePlayerRef.current.pauseVideo();
    } else if (source === 'dailymotion' && dailymotionPlayerRef.current) {
      // Manual loop implementation to ensure reliability
      dailymotionPlayerRef.current.seek(0);
      dailymotionPlayerRef.current.play();
    }
    if (onEnded) {
      onEnded();
    }
  }

  const initDailymotionPlayer = () => {
    if (!dailymotionContainerRef.current || dailymotionPlayerRef.current) return;

    // Ensure container has an ID
    const containerId = `dailymotion-player-${identifier}`;
    dailymotionContainerRef.current.id = containerId;

    // @ts-ignore
    dailymotion.createPlayer(containerId, {
      video: identifier,
      width: '100%',
      height: '100%',
      params: {
        autoplay: true,
        mute: false,
        controls: false,
        loop: true,
        'queue-autoplay-next': false,
        'queue-enable': false,
        'sharing-enable': false,
        'ui-logo': false,
      },
    }).then((player: any) => {
      dailymotionPlayerRef.current = player;
      player.on('play', () => setIsPlaying(true));
      player.on('pause', () => setIsPlaying(false));
      player.on('video_end', handleEnd);
      if (typeof player.setMuted === 'function') {
        player.setMuted(false);
      }
    }).catch((e: any) => {
      console.error('Dailymotion player creation failed', e);
    });
  };

  // Dailymotion SDK Integration
  useEffect(() => {
    if (source === 'dailymotion' && identifier && hasStarted) {
      const scriptId = 'dailymotion-sdk';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://geo.dailymotion.com/libs/player.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          initDailymotionPlayer();
        };
      } else {
        if ((window as any).dailymotion) {
          initDailymotionPlayer();
        } else {
          const interval = setInterval(() => {
            if ((window as any).dailymotion) {
              clearInterval(interval);
              initDailymotionPlayer();
            }
          }, 100);
        }
      }
    }

    return () => {
      if (dailymotionPlayerRef.current) {
        dailymotionPlayerRef.current.destroy();
        dailymotionPlayerRef.current = null;
      }
    };
  }, [source, identifier, hasStarted]);

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
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
    } else if (source === 'dailymotion' && dailymotionPlayerRef.current) {
      if (isPlaying) {
        dailymotionPlayerRef.current.pause();
      } else {
        dailymotionPlayerRef.current.play();
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
    } else if (source === 'dailymotion' && dailymotionPlayerRef.current) {
      const newMutedState = !isMuted;
      if (typeof dailymotionPlayerRef.current.setMuted === 'function') {
        dailymotionPlayerRef.current.setMuted(newMutedState);
      } else {
        console.warn('setMuted method not found on Dailymotion player');
      }
      setIsMuted(newMutedState);
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
    } else if (source === 'dailymotion' && dailymotionPlayerRef.current) {
      dailymotionPlayerRef.current.seek(0);
      dailymotionPlayerRef.current.play();
    }
  };

  const handleRewind = () => {
    handleShowControls();
    if (source === 'local' && videoRef.current) {
      videoRef.current.currentTime -= 10;
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      const currentTime = youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(currentTime - 10, true);
    } else if (source === 'dailymotion' && dailymotionPlayerRef.current) {
      const time = dailymotionPlayerRef.current.currentTime;
      dailymotionPlayerRef.current.seek(time - 10);
    }
  };

  const handleForward = () => {
    handleShowControls();
    if (source === 'local' && videoRef.current) {
      videoRef.current.currentTime += 10;
    } else if (source === 'youtube' && youtubePlayerRef.current) {
      const currentTime = youtubePlayerRef.current.getCurrentTime();
      youtubePlayerRef.current.seekTo(currentTime + 10, true);
    } else if (source === 'dailymotion' && dailymotionPlayerRef.current) {
      const time = dailymotionPlayerRef.current.currentTime;
      dailymotionPlayerRef.current.seek(time + 10);
    }
  };

  const onReady: YouTubeProps['onReady'] = (event) => {
    youtubePlayerRef.current = event.target;
    if (isPlaying) {
      event.target.playVideo();
    }
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
        <div className="absolute bottom-8 right-8 z-10">
<<<<<<< HEAD
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className="text-white drop-shadow-lg transition-transform transform group-hover:scale-110">
=======
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className="text-white drop-shadow-md transition-transform transform group-hover:scale-110">
>>>>>>> FRESH
            <defs>
              <mask id="SVGOVEmxbON">
                <g fill="#555555" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                  <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
                  <path d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z" />
                </g>
              </mask>
            </defs>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#SVGOVEmxbON)" />
          </svg>
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
      ) : source === 'youtube' ? (
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
              mute: 0,
              controls: 0,
              rel: 0,
              modestbranding: 1,
              disablekb: 1,
            },
          }}
          className="w-full h-full absolute top-0 left-0 [&>iframe]:w-full [&>iframe]:h-full"
        />
      ) : (
        <div className="w-full h-full absolute top-0 left-0">
          {/* Force styles using a standard style tag and deep selectors */}
          <style>{`
              #dailymotion-player-${identifier} iframe {
                width: 100% !important;
                height: 100% !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                object-fit: cover !important;
              }
            `}</style>
          <div
            id={`dailymotion-player-${identifier}`}
            ref={dailymotionContainerRef}
            className="w-full h-full relative [&_iframe]:!w-full [&_iframe]:!h-full [&_iframe]:!absolute [&_iframe]:!top-0 [&_iframe]:!left-0"
          />
        </div>
      )}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onClick={togglePlayPause}
      >
        <div
          className="flex items-center gap-6"
          onClick={(e) => e.stopPropagation()}
        >
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
