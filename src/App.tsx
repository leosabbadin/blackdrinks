import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  FilterX
} from 'lucide-react';
import { Dish } from './types';
import { CATEGORIES, PRODUCTS, matchesSearch } from './data/menuData';
import { Header } from './components/Header';
import { ImportantNotices } from './components/ImportantNotices';
import { OtherMenusButtons } from './components/OtherMenusButtons';
import { HeroBanner } from './components/HeroBanner';
import { SearchBar } from './components/SearchBar';
import { CategoryNav } from './components/CategoryNav';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { DishCard } from './components/DishCard';
import { DishDetailModal } from './components/DishDetailModal';
import { WifiModal } from './components/WifiModal';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';

// Ordem oficial dos Destaques de Bebidas BlackBall
const FEATURED_ORDER = [
  'pitaya-drink',
  'dama-de-vermelho',
  'caip-da-estacao',
  'gin-tropical',
];

export default function App() {
  // UI state
  const [activeCategoryId, setActiveCategoryId] = useState<string>(CATEGORIES[0]?.id || 'destaques');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState<boolean>(false);

  // References for category section scrolling
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Featured dishes for the top spotlight carousel strictly ordered
  const featuredDishes = useMemo(() => {
    const list = PRODUCTS.filter((p) => p.featured);
    return list.sort((a, b) => {
      const idxA = FEATURED_ORDER.indexOf(a.id);
      const idxB = FEATURED_ORDER.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }, []);

  // Real-time filtered products based on search query & tags using accent-insensitive matching
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    // Filter by text search using matchesSearch
    if (searchQuery.trim()) {
      list = list.filter((p) => matchesSearch(p, searchQuery));
    }

    // Filter by tag if selected
    if (selectedTagFilter) {
      if (selectedTagFilter === 'destaque') {
        list = list.filter((p) => p.featured);
      } else if (selectedTagFilter === 'drinks-autorais') {
        list = list.filter((p) => p.category === 'drinks-autorais');
      } else if (selectedTagFilter === 'drinks-classicos') {
        list = list.filter((p) => p.category === 'drinks-classicos');
      } else if (selectedTagFilter === 'drinks-sem-alcool') {
        list = list.filter((p) => p.category === 'drinks-sem-alcool');
      } else {
        list = list.filter((p) => p.category === selectedTagFilter || p.badges?.includes(selectedTagFilter as any));
      }
    }

    return list;
  }, [searchQuery, selectedTagFilter]);

  // Categories that have at least 1 matching product
  const activeCategoriesWithResults = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      if (cat.id === 'destaques') {
        return filteredProducts.some((p) => p.featured);
      }
      return filteredProducts.some((p) => p.category === cat.id);
    });
  }, [filteredProducts]);

  // Items count per category for current filtered results
  const categoryItemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      if (cat.id === 'destaques') {
        counts[cat.id] = filteredProducts.filter((p) => p.featured).length;
      } else {
        counts[cat.id] = filteredProducts.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, [filteredProducts]);

  const isFiltering = Boolean(searchQuery.trim() || selectedTagFilter);
  const isManualScrolling = useRef<boolean>(false);

  // Scroll to section when category is clicked
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    isManualScrolling.current = true;

    if (categoryId === 'destaques') {
      const el = sectionRefs.current['destaques'];
      if (el) {
        const yOffset = -115;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 750);
      return;
    }

    const sectionEl = sectionRefs.current[categoryId];
    if (sectionEl) {
      const yOffset = -115; // Account for sticky header with categories navigation
      const y = sectionEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });

      // Reset manual scroll lock after smooth scroll completes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 750);
    } else {
      isManualScrolling.current = false;
    }
  };

  // Scrollspy: update active category dynamically as user scrolls through menu sections
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isManualScrolling.current || isFiltering) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const categoriesToCheck = activeCategoriesWithResults;
          if (!categoriesToCheck || categoriesToCheck.length === 0) {
            ticking = false;
            return;
          }

          // If at the top of the page (scrollY < 220), highlight 'destaques'
          if (window.scrollY < 220) {
            setActiveCategoryId('destaques');
            ticking = false;
            return;
          }

          // If scrolled to the bottom of the page, highlight the last category
          const isAtBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 50;

          if (isAtBottom) {
            const lastCat = categoriesToCheck[categoriesToCheck.length - 1];
            if (lastCat) {
              setActiveCategoryId((prev) => (prev !== lastCat.id ? lastCat.id : prev));
            }
            ticking = false;
            return;
          }

          // Trigger point right below the sticky bar
          const triggerPoint = 140;
          let currentCategory: string | null = null;

          for (const cat of categoriesToCheck) {
            if (cat.id === 'destaques') continue;
            const el = sectionRefs.current[cat.id];
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
                currentCategory = cat.id;
                break;
              }
            }
          }

          if (currentCategory) {
            setActiveCategoryId((prev) => (prev !== currentCategory ? currentCategory : prev));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load to establish correct state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFiltering, activeCategoriesWithResults]);

  // Auto-close search and reset filters to default layout
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSelectedTagFilter(null);
  };

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const searchEl = document.getElementById('search-bar-container');
      const searchBtn = document.getElementById('header-search-btn');

      if (
        searchEl &&
        !searchEl.contains(target) &&
        searchBtn &&
        !searchBtn.contains(target)
      ) {
        handleCloseSearch();
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Ao fechar a pesquisa, limpar query e filtros para voltar ao layout padrão
        setSearchQuery('');
        setSelectedTagFilter(null);
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTagFilter(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#060807] text-zinc-100 selection:bg-[#00E676] selection:text-black">
      {/* Background ambient billiard glow */}
      <div className="fixed inset-0 pointer-events-none felt-gradient z-0 opacity-80" />

      {/* 100% Mobile Centered Container Frame */}
      <div className="relative z-10 mx-auto w-full max-w-xl min-h-screen flex flex-col bg-[#080b09] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-zinc-900/60 pb-12">
        
        {/* 1. Header BlackBall (Sticky top) */}
        <div className="sticky top-0 z-40 w-full bg-[#070908]/98 backdrop-blur-xl border-b border-emerald-950/80 shadow-md">
          <Header
            onOpenWifiModal={() => setIsWifiModalOpen(true)}
            onToggleSearch={toggleSearch}
            isSearchOpen={isSearchOpen}
          />
        </div>

        {/* 2 & 3. Título "Cardápio de Drinks" e Descrição */}
        <HeroBanner />

        {/* 4 & 5. Card compacto de Informações Importantes e Faixa de Menores */}
        <ImportantNotices />

        {/* Botões de Redirecionamento para Outros Cardápios */}
        <OtherMenusButtons />

        {/* 6. Campo de Busca (quando ativado ou em uso) */}
        {isSearchOpen && (
          <div className="w-full px-3.5 pt-1 pb-2 sm:px-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultCount={filteredProducts.length}
              selectedTag={selectedTagFilter}
              onSelectTag={setSelectedTagFilter}
              onClose={handleCloseSearch}
            />
          </div>
        )}

        {/* 7. Categorias com Scroll Spy (Sticky logo abaixo do Header) */}
        <div className="sticky top-[52px] sm:top-[56px] z-30 w-full bg-[#070908]/98 backdrop-blur-xl border-y border-emerald-950/60 shadow-lg">
          <CategoryNav
            categories={isFiltering ? activeCategoriesWithResults : CATEGORIES}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
            categoryItemCounts={categoryItemCounts}
          />
        </div>

        {/* 8. Conteúdo do Cardápio */}
        <main className="w-full flex-1 px-3 sm:px-4 py-4 space-y-7">
          {/* SEARCH RESULTS HEADER IF FILTERING */}
          {isFiltering && (
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 animate-in fade-in duration-200">
              <div>
                <h2 className="font-brand text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                  <Search className="h-4 w-4 text-[#00E676]" />
                  <span>Resultados da Busca</span>
                </h2>
                <p className="text-[11px] text-zinc-400">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item encontrado' : 'itens encontrados'} em {activeCategoriesWithResults.length} categoria(s)
                </p>
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="flex items-center gap-1 rounded-xl bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-300 hover:text-white border border-zinc-800 active:scale-95"
              >
                <FilterX className="h-3.5 w-3.5 text-rose-400" />
                <span>Limpar</span>
              </button>
            </div>
          )}

          {/* NO RESULTS VIEW */}
          {isFiltering && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 animate-in fade-in duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-600 border border-zinc-800">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="font-brand text-base font-bold text-white">Nenhuma bebida encontrada</h3>
              <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                Não encontramos nenhuma bebida correspondente a "{searchQuery}". Tente pesquisar por termos como <strong className="text-zinc-300">Gin, Vodka, Jack Daniel's, Maracujá ou Sem Álcool</strong>.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="rounded-xl bg-[#00E676] px-4 py-2 font-brand font-bold text-xs text-black shadow-lg hover:bg-emerald-400 transition-colors active:scale-95"
              >
                Ver Cardápio Completo
              </button>
            </div>
          )}

          {/* FEATURED CAROUSEL (Show in main view when not actively searching, or when featured items exist) */}
          {!isFiltering && featuredDishes.length > 0 && (
            <div
              id="section-destaques"
              ref={(el) => {
                sectionRefs.current['destaques'] = el;
              }}
              className="w-full scroll-mt-28"
            >
              <FeaturedCarousel
                dishes={featuredDishes}
                onSelectDish={setSelectedDish}
              />
            </div>
          )}

          {/* CATEGORY SECTIONS (1 Item Per Row on Mobile) */}
          {activeCategoriesWithResults.map((category) => {
            if (category.id === 'destaques') return null;

            const categoryProducts = filteredProducts.filter((p) => p.category === category.id);
            if (categoryProducts.length === 0) return null;

            return (
              <section
                key={category.id}
                id={`section-${category.id}`}
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                className="scroll-mt-28 space-y-3 w-full animate-in fade-in duration-300"
              >
                {/* Category Header */}
                <div className="flex flex-col gap-0.5 border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#00E676]" />
                      <span className="text-[10px] uppercase font-montserrat font-extrabold tracking-widest text-emerald-400">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                      {categoryProducts.length} {category.id === 'tabacaria-e-outros' ? (categoryProducts.length === 1 ? 'item' : 'itens') : (categoryProducts.length === 1 ? 'bebida' : 'bebidas')}
                    </span>
                  </div>
                  <h2 className="font-montserrat font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    {category.name}
                  </h2>
                  <p className="text-xs text-zinc-400 font-normal">
                    {category.subtitle}
                  </p>
                </div>

                {/* 100% Mobile 1-Card per row Vertical Stream */}
                <div className="flex flex-col gap-3.5">
                  {categoryProducts.map((dish, idx) => (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      onSelect={setSelectedDish}
                      priority={idx < 1 && !isFiltering}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </main>

        {/* Floating Back to Top Button */}
        <BackToTop />

        {/* Mobile Footer */}
        <Footer onOpenWifiModal={() => setIsWifiModalOpen(true)} />
      </div>

      {/* DISH DETAIL FULL MEDIA MODAL */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />

      {/* WI-FI MODAL */}
      <WifiModal
        isOpen={isWifiModalOpen}
        onClose={() => setIsWifiModalOpen(false)}
      />
    </div>
  );
}
