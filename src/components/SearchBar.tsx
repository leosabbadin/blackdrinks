import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
  selectedTag,
  onSelectTag,
}) => {
  return (
    <div id="search-bar-container" className="mx-auto w-full max-w-xl px-3 sm:px-4 py-2">
      <div className="relative rounded-2xl bg-zinc-900/95 p-3 border border-emerald-500/30 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Search Input Box */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-5 w-5 text-emerald-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar uma bebida... (ex: Gin, Vodka, Jack Daniel's, Maracujá)"
            autoFocus
            className="w-full rounded-xl bg-zinc-950/80 py-3 pl-11 pr-10 text-sm font-medium text-white placeholder-zinc-500 border border-zinc-800/80 focus:border-[#00E676] focus:outline-none focus:ring-2 focus:ring-[#00E676]/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Limpar busca"
              className="absolute right-3 p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Pills inside search */}
        <div className="mt-3 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pt-1">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 whitespace-nowrap">
            <span className="font-semibold text-emerald-400">{resultCount}</span> bebida(s) encontrada(s)
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectTag(selectedTag === 'destaque' ? null : 'destaque')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === 'destaque'
                  ? 'bg-amber-400 text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              🔥 Destaques
            </button>

            <button
              type="button"
              onClick={() => onSelectTag(selectedTag === 'drinks-autorais' ? null : 'drinks-autorais')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === 'drinks-autorais'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              ✨ Autorais
            </button>

            <button
              type="button"
              onClick={() => onSelectTag(selectedTag === 'drinks-classicos' ? null : 'drinks-classicos')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === 'drinks-classicos'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              🍸 Clássicos
            </button>

            <button
              type="button"
              onClick={() => onSelectTag(selectedTag === 'drinks-sem-alcool' ? null : 'drinks-sem-alcool')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === 'drinks-sem-alcool'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              🌱 Sem Álcool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
