import React from 'react';

export const OtherMenusButtons: React.FC = () => {
  const menus = [
    {
      id: 'comidas',
      label: 'COMIDAS',
      href: 'http://blackballsinuca.com.br/comidas',
      active: false,
    },
    {
      id: 'bebidas',
      label: 'BEBIDAS',
      href: 'http://blackballsinuca.com.br/bebidas',
      active: true,
    },
    {
      id: 'rosh',
      label: 'ROSH',
      href: 'http://blackballsinuca.com.br/rosh',
      active: false,
    },
  ];

  return (
    <section aria-label="Outros Cardápios" className="w-full px-3.5 py-1 sm:px-4">
      <div className="grid grid-cols-3 gap-2">
        {menus.map((menu) => (
          <a
            key={menu.id}
            href={menu.href}
            className={`flex items-center justify-center py-2 px-1.5 rounded-lg border text-center transition-all duration-150 active:scale-[0.98] ${
              menu.active
                ? 'bg-emerald-500/15 border-[#00E676] text-[#00E676] font-bold shadow-[0_0_12px_rgba(0,230,118,0.15)]'
                : 'bg-zinc-950/60 border-zinc-800/60 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-900/60'
            }`}
          >
            <span className="text-[11px] font-semibold tracking-wider text-center">
              {menu.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

