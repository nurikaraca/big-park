import { getProducts } from "@/actions/getProducts";
import { Product } from "@/constans/type";
import { getMediaUrl } from "@/lib/media";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductForm from "../../_components/Product/ProductForm";
import ProductImages from "../../_components/Product/ProductImages";
import RecentProduct from "../../_components/Product/RecentProduct";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const products = await getProducts(
      `/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );

    return products[0] || null;
  } catch (error) {
    console.error("Failed to fetch product", error);
    return null;
  }
};

export const generateMetadata = async ({
  params,
}: ProductDetailPageProps): Promise<Metadata> => {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.name;
  const description =
    product.description || `${product.name} is available at ${siteConfig.name}.`;
  const imageUrl = product.images?.[0]?.url
    ? getMediaUrl(product.images[0].url)
    : undefined;
  const canonical = getAbsoluteUrl(`/product/${product.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.map((image) => getMediaUrl(image.url)),
    sku: product.documentId,
    category: product.category?.name,
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: product.sellingPrice,
      availability: "https://schema.org/InStock",
      url: getAbsoluteUrl(`/product/${product.slug}`),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mt-10 container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 container">
          <div>
            <ProductImages images={product.images} />
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold textone">{product.name}</h1>
              <h2 className="text-lg font-semibold text-mycolor3 dark:text-mycolor5">
                {product.category?.name}
              </h2>
              <p>{product.description}</p>

              <div className="flex gap-3">
                {product.sellingPrice && (
                  <h2 className="font-bold text-mycolor3 text-3xl">
                    {product.sellingPrice} TRY
                  </h2>
                )}
                <h2 className="line-through text-gray-500">{product.mrp} TRY</h2>
              </div>
              <ProductForm product={product} btnVisible={false} />
            </div>
          </div>
        </div>
      </div>
      <RecentProduct />
    </>
  );
};

export default ProductDetailPage;
