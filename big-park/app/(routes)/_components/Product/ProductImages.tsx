import { Product } from '@/constans/type'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'



interface ProductImagesProps{
    images:Product['images']
}

const ProductImages = ({images}:ProductImagesProps) => {
  
   const hasmultipleImages = images.length> 1;
  return (
    <Carousel   opts={{
        align: "start",
        loop: true,
      }}
      
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      >
  <CarouselContent>
    {images?.map((image, index) => (
     
      <CarouselItem key={index}>
        <Image
        width={500}
        alt='alt'
        height={200}
        unoptimized={true}
        src={
          process.env.NEXT_PUBLIC_BACKEND_URL +
          image.url
        }
         className='rounded-3xl scale-95 w-[300px] h-[300px] group-hover:scale-100 transition-all duration-700'
        />
      </CarouselItem>

    ))}
    
  </CarouselContent>
  {hasmultipleImages && <CarouselPrevious className='left-0' />}
  {hasmultipleImages && <CarouselNext className='right-0' />}
</Carousel>

  )
}

export default ProductImages