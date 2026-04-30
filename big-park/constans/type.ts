export type Category = {
    id: number;
    name: string;
    slug: string;
    image: { url: string; };
}

export type Slider = {
    id: number;
    link: string;
    media: { url: string; };
}

export type Size={
    id:number;
    name:string;
}



export type Color={
    id:number;
    name:string;
}


export type ProductImage={
    id:number;
    url:string;
}

export type Product={
    id:number;
    documentId:string;
    name:string;
    description:string;
    slug:string;
    mrp:number;
    sellingPrice:number; 
    isTop:boolean;
    recent:boolean;
    images:ProductImage[];
    category:Category;
    colors:Color[];
    sizes:Size[];
}

export type CartItem = {
    id?: number;
    name: string;
    quantity: number;
    amount: number;
    documentId: string;
    color: string;
    size: string;
    productId: number;
    imageUrl: string;
}

export type OrderProduct = {
    name: string;
    images: ProductImage[];
}

export type OrderItem = {
    id?: number;
    product: OrderProduct;
    quantity: number;
    amount: number;
    color: string;
    size: string;
}

export type Order = {
    id: number;
    subtotal: number;
    paymentText: string;
    orderItemList: OrderItem[];
    createdAt: string;
}
