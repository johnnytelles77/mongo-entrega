import mongoose from "mongoose";


class Cart {
  constructor() {
    this.cartCollection = "carts";

    this.cartSchema = new mongoose.Schema({
      products: {
        type: Array,
        default: [],
      }
    });

    this.cartModel = mongoose.model(this.cartCollection, this.cartSchema);
  }
}

const cartInstance = new Cart(); // Creamos una instancia de la clase Cart
export default cartInstance.cartModel;