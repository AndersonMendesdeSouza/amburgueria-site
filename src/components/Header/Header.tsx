import type { RefObject } from "react";
import { Search, ShoppingCart, X } from "lucide-react";
import styles from "./Header.module.css";

type HeaderProps = {
  search?: string;
  searchRef?: RefObject<HTMLInputElement | null>;
  cartCount?: number;
  searchPlaceholder?: string;
  showSearch?: boolean;
  onCartClick: () => void;
  onSearchChange?: (value: string) => void;
  onClearSearch?: () => void;
};

export function Header({
  search = "",
  searchRef,
  cartCount = 2,
  searchPlaceholder = "Buscar itens...",
  showSearch = true,
  onCartClick,
  onSearchChange,
  onClearSearch,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.brand}>
          <img
            className={styles.brandLogo}
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            alt="Logo Mais Burguer"
          />
          <span className={styles.brandName}>Mais Burguer</span>
        </div>

        <button
          className={styles.cartButton}
          type="button"
          onClick={onCartClick}
          aria-label="Abrir carrinho"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </button>
      </div>

      {showSearch && (
        <div className={styles.searchInputWrap}>
          <Search size={18} />
          <input
            ref={searchRef}
            className={styles.searchInput}
            value={search}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            inputMode="search"
          />
          {search && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={onClearSearch}
              aria-label="Limpar busca"
            >
              <X size={18} />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
