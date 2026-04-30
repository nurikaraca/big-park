import { getToCart } from '@/actions/cart/getToCart';
import { CartItem } from '@/constans/type';
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  fetchItems: (userId: string, jwt: string) => Promise<void>;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  fetchItems: async (userId: string, jwt: string) => {
    if (!userId || !jwt) {
      set({ items: [] });
      return;
    }

    try {
      const data = await getToCart(userId, jwt);
      set({ items: data });
    } catch (error) {
      console.error("Error loading cart items:", error);
      set({ items: [] });
    }
  }
}));

export default useCartStore;


