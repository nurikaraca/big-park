import axios from "axios"

const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`

type CreateOrderPayload = {
    data: {
        name: string;
        phone: string;
        address: string;
        subtotal: number;
        paymentText: string;
        userId: string;
        OrderItemList: Array<{
            product: number;
            quantity: number;
            amount: number;
            color: string;
            size: string;
        }>;
    };
}

export const createOrder = async (data: CreateOrderPayload, jwt: string) => {
    try {
        const response = await axios.post(Urls, data, {
            headers: {
                Authorization: 'Bearer ' + jwt,
                'Content-Type': 'application/json' 
                
            }
        })
        console.log("response.data " , response.data)
        return response.data;
    } catch (error) {
        
        console.log("error", error)
        throw error;
    }
}






// import axios from "axios";

// const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`;

// export const createOrder = async (data: unknown, jwt: string) => {
//    console.log("işte data  => ", data)
//     try {
//          const response = await axios.post(Urls,data,
//             {
//             headers: {
//                 Authorization: 'Bearer ' + jwt,
//                 'Content-Type': 'application/json' 
//             }
//         }
//         );
//         console.log("Başarılı:", response.data);
//         return response.data;
//     } catch (error) {
//         console.log("Hata oluştu:", JSON.stringify(error.response?.data, null, 2) || error.message);
//         throw error;
//     }
// };





