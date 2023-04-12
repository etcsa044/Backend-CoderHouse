// Creacion servidor express
// paso 1: importar express. 
import express from "express";
import ProductManager from "../Managers/ProductManager.js";



const pm = new ProductManager();


// paso 2: inicializar una instancia de Express: que será el punto de entrada del servidor, en este caso "app";

const app = express();


app.use(express.json());


// Paso 3: poner el servidor a escuchar en el puerto correspondiente, en este caso 8080;

app.listen(8080, ()=>{console.log("Listenning on PORT 8080")}) //recibe dos parametros el nro de puerto y una callback.


// paso 4: hago una consulta al servidor con el verbo GET: el mismo debe recibir la ruta donde estará el pedido y una callback con parametros REQ - RES;

app.get("/files", (req, res)=>{
    const User = {name: "charlie", edad :"años "+45};
    res.send();
})

//la estructura anterior se conoce como ENDPOINT la cual cuenta de:
// un METODO DEFINIDO.
// una RUTA DEFINIDA.
// una LOGICA QUE RESPONDA A UN PUNTO FINAL.

app.get("/pruebarequest", (req, res)=>{
    res.send("<h1>OK</h1>")
});



// EL OBJ REQUEST (REQ) tiene 3 propiedades o elementos principales:
// req.params, req.query y req.body

// REQ.params sirve para poder obtener el parametro de la rura visitada, el mismo se setea colocando ":nombreParam" luego de la ruta principar, y se puede recuperar con el metodo req.param.nombreParam, este resultado se puede utilizar en filtros como en el ejemplo siguiente de la linea 48.

app.get("/products/:name", (req, res)=>{

    console.log(req.params)
    let products = [{name:"Charlie", pet:"cat"},{name:"Piqui", pet:"dog"}];

    
    // el proximo codigo es un filtro a partir de req.paramas
    const product = products.find(e=>e.name === req.params.name);
    res.send(product);
})


// req.query:

app.get("/userbyquery", (req, res)=>{

    console.log(req.query);
    
    let products = [{name:"Charlie", pet:"cat"},{name:"Piqui", pet:"dog"}];


    res.send("ok")

})