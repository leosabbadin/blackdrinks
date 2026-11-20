import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="w-full px-3.5 pt-3 pb-1 sm:px-4 sm:pt-3.5 sm:pb-1">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight font-brand">
          Cardápio de <span className="text-[#00E676]">Drinks</span>
        </h1>
        <p className="text-[11px] sm:text-xs text-zinc-400 font-normal leading-relaxed">
          Do clássico ao exclusivo BlackBall. Escolha seu drink e aproveite a noite.
        </p>
      </div>
    </section>
  );
};
