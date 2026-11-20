import React, { useState, useEffect } from 'react';
import { Wifi, Search } from 'lucide-react';
import { getBusinessStatus } from '../utils/businessHours';
import blackballLogo from '../assets/images/regenerated_image_1787686626321.png';

interface HeaderProps {
  onOpenWifiModal: () => void;
  onToggleSearch: () => void;
  isSearchOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWifiModal,
  onToggleSearch,
  isSearchOpen,
}) => {
  const [status, setStatus] = useState(() => getBusinessStatus());

  useEffect(() => {
    // Update every minute to ensure real-time accuracy
    const timer = setInterval(() => {
      setStatus(getBusinessStatus());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full bg-[#070908]/95 backdrop-blur-xl transition-all">
      {/* Top billiard felt accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00E676] to-transparent opacity-80" />

      <div className="mx-auto flex max-w-xl items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3">
        {/* Brand & Logo (aligned compactly to the left) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* BlackBall Logo Image */}
          <div className="relative shrink-0 flex items-center justify-center">
            <img
              src={blackballLogo}
              alt="BlackBall Sinuca Bar"
              className="h-9 sm:h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col justify-center">
            {/* Status Aberto / Fechado com Horário de Funcionamento Clean */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium leading-none whitespace-nowrap">
              <span
                className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                  status.isOpen
                    ? 'bg-[#00E676] shadow-[0_0_8px_#00E676]'
                    : 'bg-rose-500/90'
                }`}
              />
              <span
                className={`font-bold tracking-tight ${
                  status.isOpen ? 'text-[#00E676]' : 'text-rose-400'
                }`}
              >
                {status.isOpen ? 'Aberto' : 'Fechado'}
              </span>
              <span className="text-zinc-500 text-[9px]">•</span>
              <span className="text-zinc-300 font-normal tracking-tight">
                {status.hoursLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Icons: Wi-Fi & Search */}
        <div className="flex items-center gap-2">
          {/* Wi-Fi Info Button */}
          <button
            type="button"
            onClick={onOpenWifiModal}
            aria-label="Informações do Wi-Fi"
            title="Wi-Fi da Casa"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/90 text-zinc-300 border border-zinc-800 hover:border-emerald-500/50 hover:text-[#00E676] transition-all active:scale-95"
          >
            <Wifi className="h-4 w-4" />
          </button>

          {/* Search Toggle Button */}
          <button
            id="header-search-btn"
            type="button"
            onClick={onToggleSearch}
            aria-label="Pesquisar bebidas"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all active:scale-95 ${
              isSearchOpen
                ? 'bg-[#00E676] text-black border-[#00E676] shadow-[0_0_12px_rgba(0,230,118,0.5)]'
                : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-emerald-500/50 hover:text-[#00E676]'
            }`}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
