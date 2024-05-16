import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.js";


const router = Router();
router.get("/", async (req, res) => {
  try {
    const products = await productDao.getAll();
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}); 

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; 
    console.log(`Obteniendo producto con ID: ${pid}`);

    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    console.error(`Error al obtener producto con ID ${pid}:`, error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Agregando un nuevo producto...");
    const product = req.body;
    console.log("Datos del nuevo producto:", product);
    const newProduct = await productDao.create(product);
    console.log("Producto agregado:", newProduct);
    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    console.error("Error al agregar un nuevo producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    console.log(`Actualizando producto con ID: ${pid}`);
    const productData = req.body;
    console.log("Nuevos datos del producto:", productData);
    const updateProduct = await productDao.update(pid, productData);
    if (!updateProduct) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });
    res.status(200).json({ status: "success", payload: updateProduct });
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${pid}:`, error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.deleteOne(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });
    
    res.status(200).json({ status: "success", payload: "Producto eliminado" });
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${pid}:`, error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default router;
