
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
import { Category } from "@/constans/type";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  categories: Category[];
}
const MobileMenu = ({ categories }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="bgone flex  justify-center items-center  h-screen ">

        <div className="flex flex-col   space-y-5 ">
          {
            categories.map((category) => (

              <Link href={`/search?category=` + category?.slug || '#'} key={category.id}>
                {category?.name}
              </Link>
            ))
          }

        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu