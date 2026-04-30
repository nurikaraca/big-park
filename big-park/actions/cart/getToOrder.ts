import { Order } from "@/constans/type";
import axios from "axios";

type RawOrder = {
  id?: number;
  subtotal?: number;
  paymentText?: string;
  OrderItemList?: Order["orderItemList"];
  createdAt: string;
};

export const getToOrder = async (userId: string, jwt: string): Promise<Order[]> => {
  if (!userId || !jwt) {
    return [];
  }

  const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders?filters[userId][$eq]=${userId}&populate=OrderItemList.product.images`;

  try {
    const response = await axios.get(Urls, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    });

    const data: RawOrder[] = response.data.data;
    return data.map((item) => ({
      id: item.id || 0,
      subtotal: item.subtotal || 0,
      paymentText: item.paymentText || "",
      orderItemList: item.OrderItemList || [],
      createdAt: item.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching order:", error);
    return [];
  }
};
