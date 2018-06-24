export interface Product {
    title: string,
    category: string,
    price: number,
    imageUrl: string
    //$key: string
  }

  export interface ProductKey 
    {
      key: string,
      data: Product
    }

  
  