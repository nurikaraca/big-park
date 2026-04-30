import axios from "axios";
import { CartItem } from "@/constans/type";

type RawCartItem = {
  id?: number;
  documentId?: string;
  quantity?: number;
  amount?: number | string;
  color?: string;
  size?: string;
  products?: Array<{
    id?: number;
    name?: string;
    images?: Array<{ url?: string }>;
  }>;
};

export const getToCart = async (userId: string, jwt: string): Promise<CartItem[]> => {
  if (!userId || !jwt) {
    return [];
  }
  
  const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts?filters[userId][$eq]=${userId}&populate=products.images`;

  try {
    const response = await axios.get(Urls, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    });

    const data: RawCartItem[] = response.data.data;


    const cartItemList = data.map((item) => {
      const product = item?.products?.[0] || {};  // Ürünün ilk elemanını al
      const image = product?.images?.[0] || {};   // Ürünün ilk resmini al
      return {
        id: item.id,
        name: product.name || "No name",
        quantity: item.quantity || 0,
        amount: Number(item.amount || 0),
        documentId: item.documentId || "",
        color: item.color || "No color",
        size: item.size || "No size",
        productId: product.id || 0,
        imageUrl: image.url || "",  // Eğer resim yoksa boş string döner
      };
    });

    return cartItemList;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};




