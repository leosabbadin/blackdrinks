import React, { useState } from 'react';
import { X, Wifi, Copy, Check, Lock, Sparkles } from 'lucide-react';

interface WifiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WifiModal: React.FC<WifiModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const wifiSSID = 'Dj Maycon Douglas';
  const wifiPass = 'blackball2026';

  if (!isOpen) return null;

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(wifiPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-zinc-950 p-6 border border-emerald-500/40 shadow-2xl space-y-5 text-center">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 text-[#00E676] border border-emerald-500/40">
            <Wifi className="h-6 w-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h3 className="font-brand text-lg font-bold text-white">Wi-Fi de Alta Velocidade</h3>
          <p className="text-xs text-zinc-400 mt-1">Conecte-se gratuitamente no BlackBall Sinuca Bar</p>
        </div>

        {/* Network Box */}
        <div className="rounded-xl bg-zinc-900/90 p-4 border border-zinc-800 space-y-3 text-left">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-500">Nome da Rede (SSID)</span>
            <div className="font-mono text-sm font-semibold text-white mt-0.5">{wifiSSID}</div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80">
            <span className="text-[10px] uppercase font-bold text-zinc-500">Senha</span>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-[#00E676]">
                <Lock className="h-3.5 w-3.5" />
                <span>{wifiPass}</span>
              </div>

              <button
                type="button"
                onClick={handleCopyPassword}
                className="flex items-center gap-1 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded-lg transition-colors active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#00E676]" />
                    <span className="text-[#00E676]">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 font-bold text-xs py-2.5 border border-emerald-500/30 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
