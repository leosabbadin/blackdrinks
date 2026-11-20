export type BadgeType =
  | 'mais-pedido'
  | 'recomendado'
  | 'novidade'
  | 'serve-2'
  | 'serve-4'
  | 'especial-blackball'
  | 'picante'
  | 'vegetariano'
  | 'chef-choice';

export interface Category {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  iconName: string;
  order: number;
}

export interface Dish {
  id: string;
  slug?: string;
  name: string;
  category: string; // Category ID matching Category.id
  categoryName?: string;
  description?: string;
  fullDescription?: string;
  price: number;
  priceUnit?: string; // e.g. "/ hora"
  quantity?: string; // e.g. "600ml", "7 unidades"
  options?: string[]; // Opções / versões disponíveis (ex: Red Bull, Coca-Cola)
  observation?: string; // Observações como "Consultar sabores disponíveis"
  video?: string; // Direct MP4 video URL (ready for actual files)
  image?: string; // High-res poster/fallback photo (ready for actual files)
  poster?: string;
  serves?: string;
  weight?: string;
  prepTime?: string;
  ingredients?: string[];
  sides?: string[];
  sauces?: string[];
  allergens?: string[];
  badges?: BadgeType[];
  featured?: boolean;
  pairing?: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isAddon?: boolean;
  keywords?: string[]; // Palavras-chave para busca enriquecida
}

export interface TableInfo {
  tableNumber: string;
  guestName?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  activeBadgeFilter: string | null;
  onlyVegetarian: boolean;
  onlySpicy: boolean;
  forSharingOnly: boolean;
}

