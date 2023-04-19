// Creacion servidor express
// paso 1: importar express. 
import express from "express";
import productsRouter from "./routes/products.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products", productsRouter);




// Listennig Server
app.listen(8080, ()=>{console.log("Listenning on PORT 8080")}) //recibe dos parametros el nro de puerto y una callback.
