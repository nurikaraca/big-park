import Image from 'next/image';
import React from 'react'

interface MyOrderItemProps {
    orderItem: any;
}

const MyorderItem = ({ orderItem }: MyOrderItemProps) => {
    console.log("orderitem ", orderItem)
    return (
        <div className='container'>

            <div className='grid grid-cols-6 mt-3 items-center border borderone p-2 bgone gap-8'>
               <Image

                    unoptimized={true}
                    src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        orderItem.product.images[0].url
                        // orderItem.product.data.images.data[0].url

                    }

                    width={80}
                    height={80}
                    alt='image'
                    className='bgone borderone p-2 col-span-1 rounded-md border'
                />

                <div className='col-span-1'><h2>{orderItem.product.name}</h2></div>
                <div className='col-span-1'><h2>Quantity{orderItem.quantity}</h2></div>
                <div className='col-span-1'><h2>İtemPrice{orderItem.amount}</h2></div>
                <div className='col-span-1'><h2>Color{orderItem.color}</h2></div>
                <div className='col-span-1'><h2>size{orderItem.size}</h2></div> 
            </div>
        </div>
    )
}
export default MyorderItem