import React from 'react';
import { Instagram, Clock, Wifi } from 'lucide-react';
import blackballLogo from '../assets/images/regenerated_image_1787686626321.png';

interface FooterProps {
  onOpenWifiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWifiModal }) => {
  return (
    <footer className="w-full border-t border-emerald-950/60 bg-[#060807] pt-8 pb-12 text-zinc-400">
      <div className="mx-auto max-w-xl px-3.5 sm:px-4">
        <div className="flex flex-col gap-6 pb-6 border-b border-zinc-900">
          {/* Brand Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {/* BlackBall Logo matching header */}
              <img
                src={blackballLogo}
                alt="BlackBall Sinuca Bar"
                className="h-9 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Bebidas autorais, coquetéis clássicos, batidas e as melhores mesas de sinuca.
            </p>
          </div>

          {/* Quick Info Grid / Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Horários de Funcionamento */}
            <div className="space-y-2 rounded-xl bg-zinc-900/40 p-3 border border-zinc-800/80">
              <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[11px]">
                <Clock className="h-3.5 w-3.5 text-[#00E676]" />
                <span>Horários de Funcionamento</span>
              </div>
              <ul className="space-y-1 text-[11px]">
                <li className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Segunda a Quinta:</span>
                  <span className="font-semibold text-zinc-200">18:00 às 03:00</span>
                </li>
                <li className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Sexta:</span>
                  <span className="font-semibold text-zinc-200">18:00 às 04:00</span>
                </li>
                <li className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Sábado:</span>
                  <span className="font-semibold text-zinc-200">15:00 às 04:00</span>
                </li>
                <li className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Domingo:</span>
                  <span className="font-semibold text-zinc-200">15:00 às 03:00</span>
                </li>
              </ul>
            </div>

            {/* Redes & Wi-Fi */}
            <div className="space-y-2 rounded-xl bg-zinc-900/40 p-3 border border-zinc-800/80 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[11px]">
                  <Instagram className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>Instagram</span>
                </div>
                <a
                  href="https://www.instagram.com/blackballsinuca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#00E676] text-[11px] font-medium transition-colors block"
                >
                  @blackballsinuca
                </a>
              </div>

              <div className="pt-2 border-t border-zinc-800/60">
                <button
                  type="button"
                  onClick={onOpenWifiModal}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-emerald-400 hover:text-[#00E676] border border-zinc-800 hover:border-emerald-500/50 text-[11px] font-semibold transition-all w-full justify-center"
                >
                  <Wifi className="h-3.5 w-3.5" />
                  <span>Wi-Fi da Casa</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-4 flex flex-col items-center justify-between gap-1.5 text-center text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="font-brand font-bold text-zinc-400">© BlackBall Sinuca Bar</span>
            <span>•</span>
            <span>Cardápio de Drinks</span>
          </div>
          <p className="text-[11px] text-zinc-500 font-medium">
            Produzido por{' '}
            <a
              id="lp-marketing-digital-link"
              href="https://www.instagram.com/lpmktdigital_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 font-semibold hover:text-[#00E676] transition-colors underline-offset-2 hover:underline inline-flex items-center gap-1"
            >
              LP Marketing Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
