//primero IMPORTAR router:
import Router from "express";
// importar los MANAGER:
import CartManager from "../../Managers/CartManager.js";
import ProductManager from "../../Managers/ProductManager.js";


//declaramos el router:
const router = Router();

//declaramos los Manager:
const cartManager = new CartManager();
const productManager = new ProductManager();

// consultas:

// get
router.get("/:cid", async (req, res) => {
    let {
        cid
    } = req.params;
    cid = parseInt(cid);
    const selectedCart = await cartManager.getCartById(cid);
    const prodQuantity  = selectedCart.products.length;   
    if (prodQuantity == 0) {
        res.send("El carrito está vacio")
    }
    else{
        res.send(selectedCart.products);
    }


    
})


// post

router.post("/", async (req, res) => {
    res.sendStatus(await cartManager.createCart());
})


router.post("/:cid/product/:pid", async (req, res) => {

    let {cid} = req.params;
    let {pid} = req.params;
    cid = parseInt(cid);
    pid = parseInt(pid);

    const response = await cartManager.addProductToCart(cid, pid);

    res.send(response);


})

// put
// delete

export default router