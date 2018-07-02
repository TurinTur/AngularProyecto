import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[];

    constructor (public userId: string, public shipping: any, shoppingCart: ShoppingCart ){  //
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.itemsArray.map(i => {    // porque estoy usando un map en un array, el resultado va a ser un un array en FB, con elementos 0, 1, 2, etc
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice        // guardo el precio calculado, por facilidad
            }
          })
    }
}