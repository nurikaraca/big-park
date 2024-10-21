"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useCartStore from "@/hooks/useCartStore"
import { ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"
import { DeleteToCart } from "@/actions/cart/deleteToCart"

interface CartProps{
  jwt: string;
  userId: string;
}


   
const Cart = ({jwt,userId}:CartProps) => {
  const {items,fetchItems} = useCartStore();
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter()
  

  useEffect(()=>{
    fetchItems(userId,jwt)
  }, [fetchItems])

  useEffect(()=>{
    let total =0;
    items.forEach((element : any) =>{
      total = total+element.amount
    });
    setSubTotal(parseFloat(total.toFixed(2)));
  },[items])


  const onDeleteItem = async (documentId: string) => {
    try {
       await DeleteToCart(documentId, jwt)
      fetchItems(userId, jwt);
    } catch (error) {
      console.error("Error deleting item:", error);
      
    }
  };

  return (
    <Sheet>
    <SheetTrigger>
      <div className='relative cursor-pointer'>
          <span className='absolute
          bg-mycolor3 text-mycolor1 text-xs font-semibold
          -right-2 -top-1 w-5 h-5
          rounded-lg items-center justify-center text-center'>{items.length}</span>
          <ShoppingBag/>
  
      </div>
    </SheetTrigger>
    <SheetContent className='bgone'>
      <SheetHeader>
        <SheetTitle>Your Shopping Cart</SheetTitle>
        <SheetDescription>
           Here are the items currently in your cart.
        </SheetDescription>
          <div>
            {items.length ===0 ? (
              <p>Your cart is Empty</p>
            ):(
              <ul>
                {items.map((item: any)=>(
                   <CartItem key={item.id}  item={item} onDeleteItem={onDeleteItem}/>
                  
                ))}
              </ul>
            )}
  
            
          </div>
  
          <SheetClose asChild>
            <div className='absolute w-[90%] bottom-6 flex-col'>
              <h2 className='text-lg flex justify-between'>SubTotal <span>${subTotal}</span> </h2>
  
  
              <div>
              <Button disabled={items.length == 0} onClick={()=>router.push(jwt?"/checkout": "/login")}> Checkout </Button>
              </div>
            </div>
          </SheetClose>
      </SheetHeader>
    </SheetContent>
  </Sheet>
    )}
  export default Cart