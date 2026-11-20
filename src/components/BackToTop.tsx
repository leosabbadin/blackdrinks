import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo do cardápio"
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/90 hover:bg-black text-[#00E676] border border-emerald-500/50 shadow-[0_0_20px_-3px_rgba(0,230,118,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in zoom-in-75"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
