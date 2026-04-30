import { CartItem as CartItemType } from '@/constans/type';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { getMediaUrl } from '@/lib/media';


interface CartItemProps {
  item: CartItemType;
  onDeleteItem: (id: string) => void;
}
const CartItem = ({ item, onDeleteItem }: CartItemProps) => {
  return (
    <div className='flex justify-between items-center p-2 mb-1 '>
      <div className="flex gap-4 items-center">
        <Image
          unoptimized={true}
          src={getMediaUrl(item.imageUrl)}
          width={90} height={90}
          alt={item.name}
          className='border borderone p-2'
        />
        <div className='space-y-2'>
          <h2 className='font-bold'>{item.name}</h2>
          <h2 className='text-xs'>Quantity : {item.quantity}</h2>
          <h2 className='text-xs'>{item.color} {item.size}</h2>
          <h2 className='text-lg font-bold text-mycolor3'>{item.amount} TRY</h2>

        </div>
      </div>
      <TrashIcon
            className='cursor-pointer'
             onClick={()=>onDeleteItem(item.documentId)}
            /> 
            
    </div>
  )
}

export default CartItem
