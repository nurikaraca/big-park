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
    mrp:Number;
    sellingPrice:number; 
    isTop:boolean;
    recent:boolean;
    images:ProductImage[];
    category:Category;
    colors:Color[];
    sizes:Size[];
}