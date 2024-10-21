

import axios from "axios";

// Tip tanımlaması yapıyoruz
type OrderItem = {
  id: number;
  subtotal: number;
  paymentText: string;
  orderItemList: Array<{
    product: {
      images: Array<{ url: string }>
    }
  }>;
  createdAt: string;
};

export const getToOrder = async (userId: string, jwt: string): Promise<OrderItem[]> => {
    const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders?filters[userId][$eq]=${userId}&populate=OrderItemList.product.images`;

    try {
        const response = await axios.get(Urls, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        });

        const data = response.data.data;
        // Dönen veriyi map ederken tip tanımlaması yapıyoruz
        const orderList: OrderItem[] = data.map((item: any) => ({
            id: item.id,
            subtotal: item.subtotal,
            paymentText: item.paymentText,
            orderItemList: item.OrderItemList,
            createdAt: item.createdAt,
        }));
        
        return orderList;

    } catch (error) {
        console.error("Error fetching order:", error);
        throw error; // Hata yönetimini doğru yapıyoruz
    }
};


















// import axios from "axios"
// export const getToOrder = async (userId: string, jwt: string) => {
//     const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders?filters[userId][$eq]=${userId}&populate=OrderItemList.product.images`;
//     try {
//         const response = await axios.get(Urls, {
//             headers: {
//                 Authorization: 'Bearer ' + jwt
//             }})
//         const data = response.data.data;
//         const orderList = data.map((item: any) => ({
//             id: item.id,
//             subtotal: item.subtotal,
//             paymentText: item.paymentText,
//             orderItemList: item.OrderItemList,
//             createdAt: item.createdAt,

//         }))
//         return orderList;

//     } catch (error) {

//         console.log("error", error)
//         throw error;

//     }
// }

