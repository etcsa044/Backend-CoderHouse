// imports
import fs from "fs";

// Class ProductManager:
export default class ProductManager {

    constructor() {
        this.path = "./files/products.txt"
    }



    // Function to Get
    getProducts = async () => {  
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(data);
                return products;
            }
            
            return [];
    };



    // Function to add.
    addProduct = async (product) => {

        const products = await this.getProducts();

        try {

            // Validacion: CODE
            const codeValidation = products.some(e => e.code === product.code);

            if (codeValidation) {
                console.log("El codigo del producto ya existe")
                return
            }

            // Asignacion ID autoIncrementable:

            if (products.length === 0) {
                product.id = 1;
            } else {
                //                  0               1 - 1 => 0.id => 1   +  1 = 2
                product.id = products[products.length - 1].id + 1;
            }

            products.push(product)

            const jsonProducts = JSON.stringify(products, null, "\t");


            await fs.promises.writeFile(this.path, jsonProducts);


        } catch (error) {
            console.log("fallo en el addProduct() ", error)
        }


    };

    // Function to Get by ID:

    getProductByID = async (id) => {
        const stringProducts = await fs.promises.readFile(this.path, "utf-8");
        const parsedProducts = JSON.parse(stringProducts);
        // console.log("desde el getbyID ", parsedProducts)
        const gettedProduct = parsedProducts.find(e=>e.id === id) ?? "Product Not Found"
        console.log(gettedProduct);
        
    }

    unpdateProduct = async (id, price) => {

        const parsedProducts = await this.getProducts();

        const selectedProduct = parsedProducts.find(e => e.id === id);
        
        selectedProduct.price = price;
        
        const updatedProducts = parsedProducts.filter(e => e.id != id )
        

        updatedProducts.push(selectedProduct);
        

        const stringifyUpdatedProducts = JSON.stringify(updatedProducts,null,"\t");

        await fs.promises.writeFile(this.path,stringifyUpdatedProducts);

        console.log("listado Actualizado Correctamente")
    };


    deleteProduct = async (id) => {

        try {

            const parsedProducts = await this.getProducts();

            if(!parsedProducts.some(e => e.id === id)){
                console.log("Producto no encontrado, verifique el `ID`")
                return
            }

            const updatedProducts = parsedProducts.filter(e => e.id != id);
            const stringifyUpdatedProducts = JSON.stringify(updatedProducts,null,"\t");
            await fs.promises.writeFile(this.path,stringifyUpdatedProducts);
            console.log("Producto Borrado Correctamente");
            
        } catch (error) {
            console.log ("el producto seleccionado no se encontró")
        }

    }

}