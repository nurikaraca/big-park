import { getToCart } from '@/actions/cart/getToCart';
import { Product } from '@/constans/type';
import { create } from 'zustand';


// interface CartItem {
//       product: Product;
//       quantity: number;

// }
interface CartStore {
  items: any;
  fetchItems: (userId: any, jwt: any) => Promise<void>;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  fetchItems: async (userId: any, jwt: any) => {
    const data = await getToCart(userId, jwt);
    set({ items: data });
  }
}));

export default useCartStore;


