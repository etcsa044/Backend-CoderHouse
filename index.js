// imports
import ProductManager from "./Managers/ProductManager.js";
import { products } from "./productsApi/mockProducts.js";



const contex = async() =>{




// TESTING: 

const productManager = new ProductManager;
// console.log(await productManager.getProducts());

// productManager.addProduct({
//     title:"prod prueba",
//     description: "Este es un prod Prueba",
//     price: 200,
//     thumbnail: "sin imagen",
//     code: "abc123",
//     stock: 25
// });

// productManager.addProduct(products[3]);
// productManager.addProduct(products[0]);
// productManager.addProduct(products[1]);
// productManager.addProduct(products[2]);
// productManager.addProduct(products[4]);
// productManager.addProduct(products[5]);

console.log(await productManager.getProducts());

// productManager.getProductByID(1);
// productManager.unpdateProduct(1,24500);
// productManager.deleteProduct(1);


// TESTING OK!

}

contex();





