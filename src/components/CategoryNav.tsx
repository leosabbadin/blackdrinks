import React, { useRef, useEffect } from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  categoryItemCounts?: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  categoryItemCounts = {},
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);
  const prevActiveIdRef = useRef<string>(activeCategoryId);

  // Auto-scroll the active category button into center view inside the horizontal container ONLY
  useEffect(() => {
    if (!scrollContainerRef.current || !activeBtnRef.current) return;

    const container = scrollContainerRef.current;
    const btn = activeBtnRef.current;

    // Calculate exact center position inside the horizontal container
    const containerWidth = container.clientWidth;
    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.clientWidth;
    const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);

    // Only scroll if the active category actually changed or initial mount
    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: prevActiveIdRef.current === activeCategoryId ? 'auto' : 'smooth',
    });

    prevActiveIdRef.current = activeCategoryId;
  }, [activeCategoryId]);

  return (
    <nav
      id="category-nav-bar"
      className="w-full max-w-full overflow-hidden border-t border-emerald-950/40 bg-[#080b09]/95 py-2 transition-all"
    >
      <div className="mx-auto max-w-xl px-3 sm:px-4">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 w-full"
        >
          {categories.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            const count = categoryItemCounts[cat.id];

            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                ref={isActive ? activeBtnRef : null}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                aria-pressed={isActive}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-montserrat font-bold tracking-tight whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
                  isActive
                    ? 'bg-[#00E676] text-black shadow-[0_0_16px_-2px_rgba(0,230,118,0.5)] font-extrabold scale-100'
                    : 'bg-zinc-900/90 text-zinc-300 border border-zinc-800/90 hover:border-emerald-500/40 hover:text-white hover:bg-zinc-800/80'
                }`}
              >
                <span>{cat.shortName}</span>

                {count !== undefined && count > 0 && (
                  <span
                    className={`flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                      isActive ? 'bg-black text-[#00E676]' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
