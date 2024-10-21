import axios from "axios";

export const getToCart = async (userId: any, jwt: any) => {
  
  const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts?filters[userId][$eq]=${userId}&populate=products.images`;

  try {
    const response = await axios.get(Urls, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    });

    const data = response.data.data;


    const cartItemList = data.map((item: any) => {
      const product = item?.products?.[0] || {};  // Ürünün ilk elemanını al
      const image = product?.images?.[0] || {};   // Ürünün ilk resmini al
      return {
        name: product.name || "No name",
        quantity: item.quantity || 0,
        amount: item.amount || 0,
        documentId: item.documentId || null,
        color: item.color || "No color",
        size: item.size || "No size",
        productId: product.id || null,
        imageUrl: image.url || "",  // Eğer resim yoksa boş string döner
      };
    });

    return cartItemList;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};




