import {Router} from "express";
import ProductManager from "../../Managers/ProductManager.js";
import uploader from "../services/uploader.js";

const router = Router();
const productManager = new ProductManager();

//Query de consulta de productos
router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    const {
        limit
    } = req.query;
    const limitedRes = products.slice(0, limit);
    if (!limit) {
        res.json(products);
        return
    }
    res.json(limitedRes);
})

//Query de consulta de productos por ID
router.get("/:pid", async (req, res) => {
    let {
        pid
    } = req.params;

    pid = parseInt(pid);
    const productById = await productManager.getProductByID(pid)
    res.send(productById);
});


// Query para agregar Productos: funciona con el index
router.post("/", async (req, res) => {

    const product = req.body;
    //middleware de validaciones,
    //midleware asi
    const status = await productManager.addProduct(product);
    const products = await productManager.getProducts();

    req.io.emit("products", products);

    if (status == 200) {
        res.send({
            status: "Ok",
            message: "Producto agregado con éxito"
        })
    } else if (status == 400) {
        res.send({
            status: "Error",
            message: "Código ya ingresado"
        });
    }
})



router.post("/realtimeproducts", async (req, res) => {
    const product = req.body;
    
    const status = await productManager.addProduct(product);
    const products = await productManager.getProducts();

    req.io.emit("products", products);

    if (status == 200) {
        res.send({
            status: "Ok",
            message: "Producto agregado con éxito"
        })
    } else if (status == 400) {
        res.send({
            status: "Error",
            message: "Código ya ingresado"
        });
    }
})



// Query de Actualización de productos:
router.put("/:pid", async (req, res)=>{
    const pid = req.params;
    const updatedProduct = req.body;
    const response = await productManager.updateProduct(pid, updatedProduct);
    res.sendStatus(response);
})

// Query de borrado de productos por ID:

router.delete("/:pid", async (req, res) => {
    let {pid} = req.params;
    pid = parseInt(pid);
    let response = await productManager.deleteProduct(pid);
    res.sendStatus(response);
})

router.delete("/realtimeproducts/:pid", async (req, res) => {
    let {pid} = req.params;
    pid = parseInt(pid);
    let response = await productManager.deleteProduct(pid);
    res.sendStatus(response);
})






export default router