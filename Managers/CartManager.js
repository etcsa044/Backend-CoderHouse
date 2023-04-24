//imports
import fs from "fs"
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager()

export default class CartManager {

    constructor() {
        this.path = "./files/carts.json";
    }

    // get Function:

    getCarts = async () => {

        try {
            if (fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, "utf-8");
                const parsedCarts = JSON.parse(data); //array
                return parsedCarts
            }
            return [];

        } catch (error) {
            console.log(error);
        }
    }

    createCart = async () => {

        const carts = await this.getCarts();
        console.log(carts);

        try {


            const cart = {
                products: []
            };

            if (carts.length === 0) {
                cart.id = 1
            } else {
                cart.id = carts[carts.length - 1].id + 1;
            }
            carts.push(cart);
            const jsonCarts = JSON.stringify(carts, null, "\t");
            await fs.promises.writeFile(this.path, jsonCarts);
            return 200

        } catch (error) {
            console.log(error);
        }
    }

    getCartById = async (id) => {
        const carts = await this.getCarts();
        const selectedCart = carts.find(e => e.id === id) ?? "Cart not Found"
        return selectedCart
    }


    addProductToCart = async (cid, pid) => {


        let selectedCart = await cartManager.getCartById(cid);
        if (selectedCart == "Cart not Found") {
            return ({
                error: 404,
                message: "Cart not Found"
            });
        }
        const selectedProduct = await productManager.getProductByID(pid);
        if (selectedProduct == "400 - Product Not Found") {
            return ({
                error: 404,
                message: "Product not Found"
            });
        }

        let quantity;
        let productsOnCart = selectedCart.products;
        let exist = productsOnCart.some(e => e.id == pid);

        if(!exist){
            quantity = 1
        }else{
           let prod= productsOnCart.find(e => e.id == pid);
           quantity = prod.quantity;
        }

        

        let productToAdd = {
            id: pid,
            quantity: quantity
        }

        if (productsOnCart.some(e => e.id == productToAdd.id)) {
            const repeatedProduct = {
                id : pid,
                quantity : productToAdd.quantity + 1
            }

            productsOnCart = productsOnCart.filter(e => e.id != pid);
            
            productsOnCart.push(repeatedProduct);
            
            selectedCart.products = productsOnCart;

        }else{
            productsOnCart.push(productToAdd);
        }

       

        let carts = await cartManager.getCarts()
        carts = carts.filter(e => e.id != cid);
        // console.log("listado de carros " + carts.map(e => console.log(e)));
        carts.push(selectedCart);
        // console.log("listado de carros " + carts.map(e => console.log(e)));

        const jsonCarts = JSON.stringify(carts, null, "\t");
        await fs.promises.writeFile(this.path, jsonCarts);
        return {
            status: 200,
            message: "Productos actualizado"
        }
    }

}

const cartManager = new CartManager();