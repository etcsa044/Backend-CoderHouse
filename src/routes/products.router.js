import {
    Router
} from "express";
import ProductManager from "../../Managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

// getteo de productos
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

// getteo de productos por ID
router.get("/:pid", async (req, res) => {
    let {
        pid
    } = req.params;
    pid = parseInt(pid);
    const productById = await productManager.getProductByID(pid)
    res.send(productById);
});

router.post("/", (req, res) => {

    const product = req.body;
    console.log(product);

    productManager.addProduct(product);

    res.sendStatus(200)

})

export default router