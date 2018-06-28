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

    export interface ShoppingCartItem
    {
      product: Product,
      quantity: number
    }

    export interface ShoppingCart
    {
      product: ShoppingCartItem[]
    }
