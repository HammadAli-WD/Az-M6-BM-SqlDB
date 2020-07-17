const express = require("express")
const {join} = require("path")
const listEndpints = require("express-list-endpoints")
const cors = require("cors")
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db')
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews")
const cartRoutes = require("./routes/cart")

const {
    notFoundHandler,
    badRequestHandler,
    genericErrorHandler,
  } = require("./errorHandler")

app.use(cors())

app.use(express.json())
//const port = process.env.PORT || 3001


// ERROR HANDLERS MIDDLEWARES

app.use(badRequestHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)
console.log(listEndpints(app))

app.get("/", (req, res)=> {
    res.send("The server is running!")
})

app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes)
app.use("/cart", cartRoutes)
app.listen(process.env.PORT || 3456, () => console.log("Running on ", process.env.PORT || 3456))