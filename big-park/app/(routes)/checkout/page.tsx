'use client'
import { DeleteToCart } from '@/actions/cart/deleteToCart';
import useCartStore from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CartItem from '../_components/Menu/CartItem';
import CheckoutForm from '../_components/CheckoutForm';


const CheckoutPage = () => {

    const {items, fetchItems} = useCartStore();
    const [subtotal, setSubTotal] = useState(0);
    const router = useRouter();

    let jwt = ''; 
    let user = '';
    let userId = '';

    try {
      if(typeof window !="undefined"){
      jwt = localStorage.getItem("jwt") || "";
      user = localStorage.getItem('user') || '';
      if (user) {
        const userObj = JSON.parse(user);
        userId = userObj.id;
       
      }
    }
    } catch (e) {
      console.error('Error:', e);
    }

    useEffect(()=>{
        fetchItems(userId,jwt)
      }, [fetchItems])
    
      useEffect(()=>{
        let total =0;
        console.log(items)
        items.forEach((element: any) =>{
          total = total+element.amount
        });
        setSubTotal(parseFloat(total.toFixed(2)));
      },[items])

      const onDeleteItem= async(documentId : string)=>{
        await DeleteToCart(documentId,jwt)
        fetchItems(userId,jwt)
    
      }

  return (
    <div className='container mt-8 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <div className='col-span-1 lg:col-span-3 bgone border borderone rounded-md lg:h-screen'>
                <CheckoutForm subtotal={subtotal} userId={userId} jwt={jwt} />
            </div>

            <div className='col-span-1 bgone border borderone justify-center items-center rounded-md lg:h-screen'>
              {items.map((item: any)=>(
                <CartItem key={item.id}  item={item} onDeleteItem={onDeleteItem}/>
              ))}
              <div className='flex border border-one justify-center items-center'>
              Subtotal : {subtotal}
              </div>
                    
                    
            </div>

        </div>
    </div>
  )
}

export default CheckoutPage