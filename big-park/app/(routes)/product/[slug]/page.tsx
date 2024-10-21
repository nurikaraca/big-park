"use client"
import { getProducts } from '@/actions/getProducts'
import React, { useEffect, useState } from 'react'
import ProductDetailSkeleton from '../../_components/Skeleton/ProductDetailSkeleton'
import ProductImages from '../../_components/Product/ProductImages'
import { Product } from '@/constans/type'
import ProductForm from '../../_components/Product/ProductForm'
import RecentProduct from '../../_components/Product/RecentProduct'

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}
const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [productDetail, setproductDetail] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const product = await getProducts(`/products?filters[slug][$eq]=${params.slug}&populate=*`)
        setproductDetail(product)
      } catch (error) {
        console.log("Failed to fetch products", error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchProducts();
  }, [])
  return (
    <>
      {
        loading ? (
          <ProductDetailSkeleton />
        )
          :
          (
            <div className="mt-10 container">
              {productDetail.map((product, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 container ">
                  <div><ProductImages images={product?.images} /></div>
                  <div>
                    <div className="flex flex-col gap-3">
                      <h2 className='text-3xl font-semibold textone'>{product?.name}</h2>
                      <h2 className='text-lg font-semibold text-mycolor3 dark:text-mycolor5'>{product?.category?.name}</h2>
                      <p>{product?.description}</p>

                      <div className="flex gap-3">
                        {product?.sellingPrice &&
                          <h2 className='font-bold text-mycolor3 text-3xl'>{product?.sellingPrice}</h2>
                        }
                        <h2 className={`product?.sellingPrice && line-through text-gray-500`}>
                          {`$${product?.mrp}`}
                        </h2>
                      </div>
                      <ProductForm
                        product={product}
                        btnVisible={false}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          )}
      <RecentProduct />
    </>
  )
}

export default ProductDetailPage