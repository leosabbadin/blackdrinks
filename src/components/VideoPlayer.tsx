import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Utensils } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  alt: string;
  aspectRatio?: '4/5' | '16/9' | '16/11' | '16/12' | 'square' | 'auto';
  className?: string;
  autoPlayInView?: boolean;
  priority?: boolean;
  onClick?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  posterUrl,
  alt,
  aspectRatio = '16/11',
  className = '',
  autoPlayInView = true,
  priority = false,
  onClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const hasMedia = Boolean(videoUrl || posterUrl);

  // Determine ratio class
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16/11':
        return 'aspect-[16/11]';
      case '4/5':
        return 'aspect-[4/5]';
      case '16/12':
        return 'aspect-[16/12]';
      case '16/9':
        return 'aspect-video';
      case 'square':
        return 'aspect-square';
      default:
        return 'aspect-[16/11]';
    }
  };

  // Immediate play helper on touch / hover / view
  const triggerPlay = () => {
    if (!videoRef.current || hasError) return;
    videoRef.current.muted = true;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoaded(true);
        })
        .catch(() => {});
    }
  };

  // Intersection Observer to detect when video enters/leaves viewport
  useEffect(() => {
    if (!videoUrl || !autoPlayInView || !containerRef.current) return;

    // Initial attempt to start if in view or priority
    if (priority) {
      triggerPlay();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasError) {
          triggerPlay();
        } else if (videoRef.current && !entry.isIntersecting) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.05, // Trigger as soon as 5% is visible
        rootMargin: '250px 0px', // Pre-load & play 250px before entering viewport
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [videoUrl, autoPlayInView, hasError, priority]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={triggerPlay}
      onTouchStart={triggerPlay}
      onPointerEnter={triggerPlay}
      className={`relative w-full overflow-hidden bg-[#0a0f0c] ${getAspectClass()} ${className} group select-none`}
    >
      {/* If No Video & No Poster URL: Discrete Luxury BlackBall Placeholder */}
      {!hasMedia ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[#0e1611] via-[#080d0a] to-[#050806] border border-emerald-950/40">
          {/* Subtle Billiard Felt Glow Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.08)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Billiard Ball Stylized Badge */}
          <div className="relative mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-black border-2 border-emerald-500/40 shadow-[0_0_20px_rgba(0,230,118,0.15)] group-hover:scale-105 transition-transform">
            <span className="font-brand font-black text-xl text-white">8</span>
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00E676] text-black">
              <Utensils className="h-2.5 w-2.5" />
            </div>
          </div>

          <div className="relative space-y-0.5 max-w-[85%]">
            <span className="font-brand text-xs font-bold tracking-wider text-zinc-300 line-clamp-1">
              {alt}
            </span>
            <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-emerald-400/80">
              <Sparkles className="h-2.5 w-2.5 text-[#00E676]" />
              <span className="tracking-widest uppercase text-[9px]">Gastronomia BlackBall</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Poster Image (Fallback & Initial Fast View) */}
          {posterUrl && (
            <img
              src={posterUrl}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}

          {/* Video Element - Preloaded & Instant Play (Always Muted) */}
          {videoUrl && !hasError && (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              autoPlay
              playsInline
              muted
              loop
              preload={priority ? 'auto' : 'auto'}
              onCanPlay={() => setIsLoaded(true)}
              onLoadedData={() => setIsLoaded(true)}
              onPlaying={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Subtle Dark Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/20 pointer-events-none" />
        </>
      )}

      {/* Subtle Cue Corner Accent */}
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#00E676] rotate-45 transform" />
      </div>
    </div>
  );
};

