

import axios from "axios"



export const DeleteToCart = async(documentId:string, jwt:string)=>{
   const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts/${documentId}`

    try {
        
        const response = await axios.delete(Urls, {
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
