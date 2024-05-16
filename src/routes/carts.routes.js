import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";
const router = Router();

router.post("/", async (_req, res) => {
  try {
    const cart = await cartDao.create();
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.addProductToCart(cid, pid);

    if (cart.product === false) {
      return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    }
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    if (!cart) {
      return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    }

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
