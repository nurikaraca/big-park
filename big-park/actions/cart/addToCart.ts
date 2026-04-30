

import axios from "axios"

const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts`

type AddToCartPayload = {
    data: {
        quantity: number;
        amount: string;
        size: string | null;
        color: string | null;
        products: number;
        users_permissions_user: string;
        userId: string;
    }
}

export const AddToCart = async(data: AddToCartPayload, jwt:string)=>{
    try {

        const response = await axios.post(Urls, data, {
            
            headers:{
                Authorization: 'Bearer ' + jwt
            }
        })
        
        return response.data;
        
    } catch (error) {

        console.log("error", error)
        throw error;
        
    }



}
