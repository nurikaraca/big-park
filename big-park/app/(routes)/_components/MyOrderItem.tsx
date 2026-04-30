import { OrderItem } from '@/constans/type';
import { getMediaUrl } from '@/lib/media';
import Image from 'next/image';
import React from 'react'

interface MyOrderItemProps {
    orderItem: OrderItem;
}

const MyorderItem = ({ orderItem }: MyOrderItemProps) => {
    return (
        <div className='container'>
            <div className='grid grid-cols-6 mt-3 items-center border borderone p-2 bgone gap-8'>
                <Image
                    unoptimized={true}
                    src={getMediaUrl(orderItem.product.images[0].url)}
                    width={80}
                    height={80}
                    alt={orderItem.product.name}
                    className='bgone borderone p-2 col-span-1 rounded-md border'
                />

                <div className='col-span-1'><h2>{orderItem.product.name}</h2></div>
                <div className='col-span-1'><h2>Quantity: {orderItem.quantity}</h2></div>
                <div className='col-span-1'><h2>Item price: {orderItem.amount} TRY</h2></div>
                <div className='col-span-1'><h2>Color: {orderItem.color}</h2></div>
                <div className='col-span-1'><h2>Size: {orderItem.size}</h2></div>
            </div>
        </div>
    )
}

export default MyorderItem
