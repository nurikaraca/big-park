import { Product } from '@/constans/type'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductModal from './ProductModal';
import ProductImages from './ProductImages';
import { Images } from 'lucide-react';

interface ProductItemProps {
    product: Product;
}
const ProductItem = ({ product }: ProductItemProps) => {
    
    return (
        <div className='group p-2 md:p-4 lg:p-6 flex flex-col items-center gap-4 border borderone bgone rounded-xl hover:shadow-lg transition-all cursor-pointer duration-300'>
            <ProductImages images={product.images}/>

            <h2 className='font-bold text-lg'>{product?.name}</h2>
            <div className="flex gap-3 ">
                {
                    product?.sellingPrice &&
                    <h2>${product?.sellingPrice}</h2>
                }
                <h2 className={`product?.sellingPrice && line-through  text-gray-500`}>
                    {`$${product?.mrp}`}

                </h2>
            </div>
            <div className="flex flex-row gap-4">

            <Dialog>
                {/* aschild ekledim */}
                <DialogTrigger asChild>
                <DialogDescription> 
                    <Button variant="destructive">
                    Add To Cart
                       
                    </Button>
                    </DialogDescription>
                </DialogTrigger>
                <DialogContent className='bgone sm:max-w-[900px]'>
                    <DialogTitle></DialogTitle>
                   <ProductModal
                   product={product}
                   /> 
                </DialogContent>
            </Dialog>
            <Button asChild>
                <Link href={`/product/${product?.slug}`}>
                Detail
                </Link>
            </Button>
            </div>
        </div>
    )
}

export default ProductItem