import React from 'react';
import { 
  X, 
  Users, 
  Clock, 
  Scale, 
  Utensils, 
  AlertTriangle, 
  Sparkles
} from 'lucide-react';
import { Dish } from '../types';
import { BADGE_LABELS } from '../data/menuData';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
}) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Mobile Bottom Sheet Modal Container */}
      <div className="relative z-10 flex flex-col w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#0a0e0c] border-t sm:border border-emerald-500/40 shadow-[0_-10px_50px_rgba(0,0,0,0.9)] no-scrollbar animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="sticky top-0 z-30 flex justify-center py-2.5 bg-black/40 backdrop-blur-md">
          <div className="h-1.5 w-12 rounded-full bg-zinc-600/80" />
        </div>

        {/* Close Button Floating */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute top-3 right-3 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white hover:text-[#00E676] hover:bg-black border border-white/20 transition-all active:scale-95 shadow-xl"
        >
          <X className="h-4 w-4" />
        </button>

        {/* TOP HEADER: Clean BlackBall Brand Header without Photo */}
        <div className="relative w-full bg-gradient-to-r from-[#0c1610] via-[#080e0a] to-[#060807] px-5 pt-4 pb-4 border-b border-zinc-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 border border-emerald-500/30 text-emerald-400 font-brand font-black text-xl shadow-[0_0_15px_rgba(0,230,118,0.15)]">
              8
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400">
                {dish.categoryName || 'BlackBall Sinuca Bar'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Sparkles className="h-3 w-3 text-[#00E676]" />
                <span>Informações do Item</span>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS BODY */}
        <div className="p-4 sm:p-6 space-y-4 pb-8">
          {/* Header Title, Badges & Price */}
          <div className="flex flex-col gap-2 border-b border-zinc-800/80 pb-3">
            {/* Badges if any */}
            {(dish.featured || (dish.badges && dish.badges.length > 0)) && (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {dish.featured && (
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide text-amber-400 border border-amber-500/30 shadow-sm">
                    🔥 DESTAQUE
                  </span>
                )}
                {dish.badges?.map((badgeKey) => {
                  const badge = BADGE_LABELS[badgeKey];
                  if (!badge) return null;
                  return (
                    <span
                      key={badgeKey}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide border ${badge.bg} ${badge.color} ${badge.border} shadow-sm`}
                    >
                      {badge.label}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="flex items-start justify-between gap-3 pt-1">
              <div>
                <h2 className="font-brand text-xl sm:text-2xl font-black text-white leading-tight">
                  {dish.name}
                </h2>
              </div>
              <div className="shrink-0 text-right">
                <div className="flex items-baseline font-brand font-black text-[#00E676] tracking-tight">
                  <span className="text-xs sm:text-sm font-semibold text-emerald-400/90 mr-1 select-none">R$</span>
                  <span className="text-2xl sm:text-3xl font-black">
                    {dish.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  {dish.priceUnit && (
                    <span className="text-sm font-bold text-zinc-400 ml-1 select-none">{dish.priceUnit}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description if present */}
          {(dish.fullDescription || dish.description) && (
            <div className="space-y-1.5">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                Composição / Detalhes
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {dish.fullDescription || dish.description}
              </p>
            </div>
          )}

          {/* Opções / Versões Disponíveis (ex: Soda Italiana) */}
          {dish.options && dish.options.length > 0 && (
            <div className="space-y-2 rounded-2xl bg-zinc-900/90 p-3.5 border border-zinc-800">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {dish.id === 'soda-italiana' ? 'Escolha seu xarope:' : 'Opções Disponíveis:'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dish.options.map((opt, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-zinc-950 px-2.5 py-1 text-xs font-semibold text-zinc-200 border border-zinc-700/80"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Observação especial */}
          {dish.observation && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-950/40 p-3 border border-emerald-500/30 text-xs text-emerald-300">
              <Sparkles className="h-4 w-4 text-[#00E676] shrink-0" />
              <span className="font-semibold">{dish.observation}</span>
            </div>
          )}

          {/* Quick Metric Pills Grid (Quantity, Weight, Prep, Serves) */}
          {(dish.quantity || dish.weight || dish.serves || dish.prepTime) && (
            <div className="flex flex-wrap gap-2">
              {dish.quantity && (
                <div className="flex-1 min-w-[100px] flex flex-col items-center justify-center text-center rounded-2xl bg-zinc-900/90 p-2.5 border border-zinc-800">
                  <span className="text-base mb-0.5">📦</span>
                  <div className="text-[9px] uppercase font-bold text-zinc-400">Quantidade / Volume</div>
                  <div className="text-xs font-bold text-zinc-200">{dish.quantity}</div>
                </div>
              )}

              {dish.weight && !dish.quantity && (
                <div className="flex-1 min-w-[100px] flex flex-col items-center justify-center text-center rounded-2xl bg-zinc-900/90 p-2.5 border border-zinc-800">
                  <Scale className="h-4 w-4 text-emerald-400 mb-1" />
                  <div className="text-[9px] uppercase font-bold text-zinc-400">Porção</div>
                  <div className="text-xs font-bold text-zinc-200">{dish.weight}</div>
                </div>
              )}

              {dish.serves && (
                <div className="flex-1 min-w-[100px] flex flex-col items-center justify-center text-center rounded-2xl bg-zinc-900/90 p-2.5 border border-zinc-800">
                  <Users className="h-4 w-4 text-[#00E676] mb-1" />
                  <div className="text-[9px] uppercase font-bold text-zinc-400">Compartilhar</div>
                  <div className="text-xs font-bold text-zinc-200">{dish.serves}</div>
                </div>
              )}

              {dish.prepTime && (
                <div className="flex-1 min-w-[100px] flex flex-col items-center justify-center text-center rounded-2xl bg-zinc-900/90 p-2.5 border border-zinc-800">
                  <Clock className="h-4 w-4 text-cyan-400 mb-1" />
                  <div className="text-[9px] uppercase font-bold text-zinc-400">Preparo</div>
                  <div className="text-xs font-bold text-zinc-200">{dish.prepTime}</div>
                </div>
              )}
            </div>
          )}

          {/* Ingredientes se fornecidos */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Utensils className="h-3 w-3 text-emerald-400" />
                Ingredientes Principais
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-zinc-800"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {dish.allergens && dish.allergens.length > 0 && (
            <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/30 p-2.5 rounded-xl border border-amber-500/20">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
              <span><strong>Alérgenos:</strong> {dish.allergens.join(' • ')}</span>
            </div>
          )}

          {/* Close / Return Button */}
          <div className="pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full flex items-center justify-center rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-3 border border-zinc-700 transition-colors active:scale-98"
            >
              Voltar ao Cardápio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

