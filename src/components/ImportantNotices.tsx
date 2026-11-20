import React from 'react';
import { Info } from 'lucide-react';

export const ImportantNotices: React.FC = () => {
  return (
    <section aria-label="Informações do Cardápio" className="w-full px-3.5 pt-1 pb-1.5 sm:px-4 space-y-1.5">
      {/* 1. Card discreto de Informações Importantes */}
      <div className="w-full rounded-xl bg-zinc-950/60 border border-zinc-800/60 px-3 py-2.5 backdrop-blur-sm">
        {/* Card Header discreto */}
        <div className="flex items-center gap-1.5 pb-1.5 mb-2 border-b border-zinc-800/50">
          <Info className="h-3 w-3 text-emerald-500/80 shrink-0" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            Informações importantes
          </span>
        </div>

        {/* Informações internas elegantes e compactas */}
        <div className="space-y-1.5 text-[11px] leading-relaxed">
          {/* Couvert artístico */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] shrink-0 select-none">🎵</span>
            <p className="text-zinc-400 text-[11px] leading-snug">
              <strong className="font-semibold text-zinc-200">Couvert artístico:</strong> Cobrado durante os horários de shows ao vivo.
            </p>
          </div>

          {/* Mesa de sinuca */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] shrink-0 select-none">🎱</span>
            <p className="text-zinc-400 text-[11px] leading-snug">
              <strong className="font-semibold text-zinc-200">Mesa de sinuca:</strong> Acompanhe seu horário. Para finalizar, avise um de nossos garçons.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Faixa horizontal discreta para aviso de menores */}
      <div className="w-full rounded-lg bg-zinc-950/40 border border-zinc-800/40 px-2.5 py-1.5 flex items-center gap-1.5">
        <span className="text-[10px] shrink-0 select-none">🔞</span>
        <p className="text-[10.5px] text-zinc-400 leading-tight">
          É proibida a venda de bebidas alcoólicas para menores de 18 anos.
        </p>
      </div>
    </section>
  );
};

