// Creacion servidor express
// paso 1: importar express. 
import express from "express";
import ProductManager from "../Managers/ProductManager.js";



const productManager = new ProductManager();


// paso 2: inicializar una instancia de Express: que será el punto de entrada del servidor, en este caso "app";

const app = express();

// paso 2: colocar esta linea SIEMPRE para que express reconozca el formato JSON;
app.use(express.json());


// paso 3: hago una consulta al servidor con el verbo GET: el mismo debe recibir la ruta donde estará el pedido y una callback con parametros REQ - RES;



app.get("/products", async (req, res)=>{
    const products = await productManager.getProducts();
    const {limit} = req.query;
    
    const limitedRes = products.slice(0,limit)

    if(!limit)res.json(products);

    res.send(limitedRes);    
})

app.get("/products/:pid", async (req,res) => {

    
    let {pid} = req.params;
    pid = parseInt(pid);

    const productById = await  productManager.getProductByID(pid)
    
    res.send(productById);

})





//la estructura anterior se conoce como END-POINT la cual cuenta de:
// un METODO DEFINIDO.
// una RUTA DEFINIDA.
// una LOGICA QUE RESPONDA A UN PUNTO FINAL.

// app.get("/pruebarequest", (req, res)=>{
//     res.send("<h1>OK</h1>")
// });



// EL OBJ REQUEST (REQ) tiene 3 propiedades o elementos principales:
// req.params, req.query y req.body

// REQ.params sirve para poder obtener el parametro de la ruta visitada, el mismo se setea colocando ":nombreParam" luego de la ruta principar, y se puede recuperar con el metodo req.param.nombreParam, este resultado se puede utilizar en filtros como en el ejemplo siguiente de la linea 48.

// app.get("/products/:name", (req, res)=>{
    
//     console.log("maybe"+req.params)
//     let products = [{name:"Charlie", pet:"cat"},{name:"Piqui", pet:"dog"}];
    
    
//     // el proximo codigo es un filtro a partir de req.paramas
//     const product = products.find(e=>e.name === req.params.name);
//     res.send(product);
// })


// req.query:

// app.get("/userbyquery", (req, res)=>{
    
//     console.log(req.query);
    
//     let products = [{name:"Charlie", pet:"cat"},{name:"Piqui", pet:"dog"}];
    
    
//     res.send("ok")
    
// })



// Paso final: poner el servidor a escuchar en el puerto correspondiente, en este caso 8080;

app.listen(8080, ()=>{console.log("Listenning on PORT 8080")}) //recibe dos parametros el nro de puerto y una callback.
