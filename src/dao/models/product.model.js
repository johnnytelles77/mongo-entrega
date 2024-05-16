import mongoose from "mongoose";

class Product {
  constructor() {
    this.productCollection = "products";

    this.productSchema = new mongoose.Schema({
      title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      thumbnail: {
        type: Array,
        default: [],
      },
      code: {
        type: String,
        require: true,
      },
      stock: {
        type: Number,
        require: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
      price: {
        type: Number,
        require: true,
      },
    });

    this.productModel = mongoose.model(this.productCollection, this.productSchema);
  }
}


const productInstance = new Product(); // Creamos una instancia de la clase Product
export default productInstance.productModel; 

