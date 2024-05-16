import ProductModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";

class CartDao {
  async getById(id) {
    const cart = await CartModel.findById(id);
    return cart;
  }

  async create() {
    const cart = await CartModel.create({});
    return cart;
  }

  async addProductToCart(cid, pid) {
    const product = await ProductModel.findById(pid);
    if (!product) {
      return { product: false };
    }

    await CartModel.findByIdAndUpdate(cid, { $push: { products: product } });

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return { cart: false };
    }

    return cart;
  }
}

export default new CartDao();

