"use client"

import { getSliders } from '@/actions/getSlider';
import { Slider } from '@/constans/type';
import React, { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import SliderSkeleton from './Skeleton/SliderSkeleton';
import Autoplay from "embla-carousel-autoplay"
import Link from 'next/link';
import Image from 'next/image';


const SliderComponent = () => {

  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchsliders = async () => {
      try {
        const sliders = await getSliders();
        setSliders(sliders);

      } catch (error) {
        console.error('Failed to fetch sliders', error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchsliders();
  }, [])
  return (
    <div>
      {loading ? (
        <SliderSkeleton />
      )
        :
        (
          <Carousel opts={{ align: "start", loop: true, }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent>
              {sliders.map((slider,index) => (
                <CarouselItem key={index}>
                   <Link href={slider.media.url} key={slider.id}> 
                   <Image
                    alt='slider'
                    unoptimized={true}
                    src={
                        process.env.NEXT_PUBLIC_BACKEND_URL+
                        slider?.media?.url
                    }
                    width={500}
                    height={300}
                    className='w-full h-[200px] md:h-[650px] object-fill'
                    priority={index === 0} 
                    />
                   </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-0' />
            <CarouselNext className='right-0' />
          </Carousel>
        )
      }
    </div>
  )
}

export default SliderComponent