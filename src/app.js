// Creacion servidor express
// paso 1: importar express. 
import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js"
import ProductManager from "../Managers/ProductManager.js";


const app = express();

const server = app.listen(8080, ()=>{console.log("Listenning on PORT 8080")});

// Server de sockets:
const io = new Server(server);


// managers:
const productManager = new ProductManager;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

// handlebars:
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// midlewares
app.use((req, res, next) => {
    req.io = io;
    next();
});

//routers
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/", viewsRouter);



// On: es el escuchador de EVENTOS:

const products = await productManager.getProducts();


io.on(`connection`, async socket => {
    console.log("nuevo cliente conectado");
    socket.on(`click`, data =>{       
        socket.emit("sendProducts", products)
    });
});


