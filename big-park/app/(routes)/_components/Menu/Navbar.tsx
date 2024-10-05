import Logo from '@/components/Logo'
import React from 'react'
import Search from './Search'
import Cart from './Cart'
import UserMenu from './UserMenu'
import { ToggleSwitch } from '@/components/ToggleSwitch'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  return (
    <> 
       <header className="flex py-4 border-b borderone bgone ">
          <div className="container flex items-center justify-between mx-auto px-4">
            <Logo />
            <Search />

            <div className="flex items-center space-x-4">
                <Cart />
                <UserMenu/>
                <ToggleSwitch/>
                <div className="flex lg:hidden">
                  <MobileMenu />
                </div>
            </div>
          </div>
       </header>

       <nav className="hidden border-b  borderone bgone lg:flex py-4 justify-center">
          <div className="hidden lg:flex gap-8">
             <p>Aayyakkabı</p>
             <p>Aayyakkabı</p>
             <p>Aayyakkabı</p>
             <p>Aayyakkabı</p>
             <p>Aayyakkabı</p>
             <p>Aayyakkabı</p>
          </div>
       </nav>
    </>
  )
}

export default Navbar