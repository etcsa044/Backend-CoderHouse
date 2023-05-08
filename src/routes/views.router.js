import {
    Router
} from "express";
import ProductManager from "../../Managers/ProductManager.js";
import CartManager from "../../Managers/CartManager.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/', (req, res) => {
    let title = "Create Product"
    const label = "Title"
    res.render('home', {
        title: title,
        label: label
    });
});

router.get("/register", (req, res) => {
    res.render('register', {
        css: 'register'
    })
});


router.get("/products", async (req, res) => {

    const products = await productManager.getProducts();
    res.render('index', {
        products
    });
});



router.get("/realtimeproducts", async (req, res) => {
    res.render(`realTimeProducts`)
});


export default router;