import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartSummary } from '@shared/schema';

interface CartStore {
  sessionId: string;
  cart: CartSummary | null;
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  
  // Actions
  setCart: (cart: CartSummary) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  generateSessionId: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      sessionId: crypto.randomUUID(),
      cart: null,
      isCartOpen: false,
      isMobileMenuOpen: false,
      
      setCart: (cart) => set({ cart }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      generateSessionId: () => set({ sessionId: crypto.randomUUID() }),
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({ sessionId: state.sessionId }),
    }
  )
);
