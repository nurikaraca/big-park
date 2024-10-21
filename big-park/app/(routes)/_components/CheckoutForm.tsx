"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import useCartStore from '@/hooks/useCartStore'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import axios from 'axios'
import { useRouter } from 'next/navigation'

import { DeleteToCart } from '@/actions/cart/deleteToCart'
import { useToast } from '@/hooks/use-toast'
import { createOrder } from '@/actions/cart/createOrder'

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(2, { message: "Phone must be at least 2 characters." }),
  address: z.string().min(2, { message: "Address must be at least 2 characters." }),
  holdername: z.string().min(2, { message: "Holder Name must be at least 2 characters." }),
  ccnumber: z.string().regex(/^\d{16}$/, { message: "Credit Number must be 16 digits." }),
  month: z.preprocess((val) => Number(val), z.number().min(1, { message: "Month is required." }).max(12, { message: "Month must be between 1 and 12." })),
  year: z.preprocess((val) => Number(val), z.number().min(new Date().getFullYear(), { message: "Year must be the current year or later." })),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits." })
});


interface FormData {
  name: string;
  phone: string;
  address: string;
  holdername: string;
  ccnumber: string;
  month: number;
  year: number;
  cvc: string;
}

interface CheckoutFormProps {
  subtotal: string;
  userId: string;
  jwt: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ subtotal, jwt, userId }) => {
  const { items, fetchItems } = useCartStore();
  const [response, setResponse] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "nuri karaca",
      phone: "+90 234533434",
      address: "İstanbul, Türkiye",
      holdername: "karaca",
      ccnumber: "5528790000000008",
      month: 12,
      year: 2029,
      cvc: "089",
    }
  });

  // Submit handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const paymentCard = {
      cardHolderName: data.holdername,
      cardNumber: data.ccnumber,
      expireMonth: data.month,
      expireYear: data.year,
      cvc: data.cvc,
      registerCard: '0',
    };

    const buyer = {
      id: 'BY789',
      name: data.name,
      surname: 'Doe',
      gsmNumber: data.phone,
      email: 'john.doe@example.com',
      identityNumber: '74300864791',
      lastLoginDate: '2015-10-05 12:43:35',
      registrationDate: '2013-04-21 15:12:09',
      registrationAddress: data.address,
      ip: '85.34.78.112',
      city: 'İstanbul',
      country: 'Türkiye',
      zipCode: '34732',
    };

    const shippingAddress = {
      contactName: data.name,
      city: 'İstanbul',
      country: 'Türkiye',
      address: data.address,
      zipCode: '34742',
    };

    const billingAddress = {
      contactName: data.name,
      city: 'İstanbul',
      country: 'Türkiye',
      address: data.address,
      zipCode: '34742',
    };

    const basketItems = items.map((item:any) => ({
      id: item.documentId,
      name: item.name,
      category1: 'Collectibles',
      category2: 'Accessories',
      itemType: 'PHYSICAL',
      price: item.amount

    }));


    const paymentData = {
      price: subtotal,
      paidPrice: subtotal,
      currency: 'TRY',
      basketId: 'B67832',
      paymentCard: paymentCard,
      buyer: buyer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      basketItems: basketItems,
    };

    try {
      const response = await axios.post('http://localhost:3002/api/payment', paymentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
     
      setResponse(response.data);
      console.log(response.data)
 
      if (response.data.status === "success") {
        const OrderItems = items.map((item:any) => ({

          
          product:item.productId,
            quantity: Number(item.quantity),               
            amount: Number(item.amount),                 
            color: item.color,                            
            size: item.size,                               
        }));

        const payload = {
          data: {
            name: data.name,
            phone: data.phone,
            address: data.address,
            subtotal: subtotal,
            paymentText: "Iyzico",
            userId: userId,
            OrderItemList: OrderItems,                  
          },
        };
        console.log(payload);
    
    
    
        
        await createOrder(payload, jwt);


        items.forEach((item: any, index: any) => {
          DeleteToCart(item.documentId, jwt).then(resp => {

          })
        })

        toast({
          variant: "success",
          title: "Order Success",
        });

        fetchItems(userId, jwt);
        router.push("/my-order");
      } else {
        toast({
          variant: "destructive",
          title: "Order Error",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Order Error: ${error}`,
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className='p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <h2 className='border-b borderone text-2xl'>Address</h2>
          <div className='flex flex-row gap-4'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+90 *** ** **" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='textone'>Address</FormLabel>
                <FormControl>
                  <Input placeholder="City Street" {...field} />
                </FormControl>
                <FormMessage className='validationLogin' />
              </FormItem>
            )}
          />

          <div className='h-8'></div>
          <h2 className='border-b borderone text-2xl'>Cart Information</h2>

          <div className='flex flex-row gap-4'>
            <FormField
              control={form.control}
              name="holdername"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Holder Name" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ccnumber"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Credit Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Credit Number" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-row gap-4'>
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Month</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="MM" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="YYYY" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>CVC</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="CVC" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

 export default CheckoutForm;
