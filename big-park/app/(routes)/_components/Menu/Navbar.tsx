"use client"

import Logo from '@/components/Logo'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import Cart from './Cart'
import UserMenu from './UserMenu'
import { ToggleSwitch } from '@/components/ToggleSwitch'
import MobileMenu from './MobileMenu'
import clsx from 'clsx'
import { getCategories } from '@/actions/getCategories'
import { Category } from '@/constans/type'
import Link from 'next/link'
import NavSkeleton from '../Skeleton/NavSkeleton'


const Navbar = () => {

  const [categories,setCategories] = useState<Category[]>([]);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
   const fetchCategories = async () =>{
    try {
      const categories = await getCategories();
      setCategories(categories);
      
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
    finally{
      setLoading(false);
    }
   }
   fetchCategories();
  }, [])

  let jwt = "";
    let user = "";
    let userId = "";
    try {
       if(typeof window != "undefined"){
        jwt = localStorage.getItem("jwt") ?? "";
        user = localStorage.getItem("user") ?? "";
        if (user) {
            const userObj = JSON.parse(user);
            userId = userObj.id
        }}

    } catch (error) {
        console.log("Error", error)

    }
  
  return (
    <> 
       <header className="flex py-4 border-b borderone bgone ">
          <div className="container flex items-center justify-between mx-auto px-4">
            <Logo />
            <Search />

            <div className="flex items-center space-x-4">
                <Cart jwt={jwt} userId={userId} />
                <UserMenu/>
                <ToggleSwitch/>
                <div className="flex lg:hidden">
                  <MobileMenu categories={categories} />
                </div>
            </div>
          </div>
       </header>

       <nav className="hidden border-b  borderone bgone lg:flex py-4 justify-center">
          <div className="hidden lg:flex gap-8">
             {loading? (
                  <NavSkeleton />
             ): (
              categories.map((category) => (
               <Link href={`/search?category=`+category?.slug || '#'} key={category.id}> 
                    {category?.name}
                 </Link>
              ))
             )}
          </div>
       </nav>
    </>
  )
}

export default Navbar