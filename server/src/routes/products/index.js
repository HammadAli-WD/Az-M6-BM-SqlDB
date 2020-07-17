const express = require("express")
const { request, response } = require("express")
const productRouter = express.Router()
//const q2m = require("query-to-mongo")
const review = require("../../models/review")
const product = require("../../models/product")
const { writeFile } = require("fs-extra")
const multer = require("multer")
const upload = multer({})
const { join } = require("path")
const orm = require("../../db")
const Sequelize = require('sequelize')


/* const MyModel = orm.define('myModel', {
    filePath: Sequelize.STRING,
  })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
}) */

const imgFolderPath = join(__dirname, "../../images/")
productRouter.get("/", async(req, res, next) =>{
try {
    
    const limit = req.query.limit || 10
        const offset = req.query.offset || 0
        const order = req.query.order || "asc"

        delete req.query.limit
        delete req.query.offset
        delete req.query.order

        const Products = await product.findAll({
            where : {
                ...req.query
            },
            offset: offset,
            limit: limit,
            order: [
                ["name", order]
            ],
            include: review
        })
        res.send(Products)  
        
} catch (e) {
    e.httpRequestStatusCode = 404
    next(e)
    
}
})
productRouter.get("/:id", async(req, res, next) => {
    try {
        const Product = await product.findOne({
            where: {
                id: req.params.id
            },
            include: review
        })

        if (Product)
            res.send(Product)
        else
            res.status(404).send("Not found")
    } catch (e) {
        e.httpRequestStatusCode = 500
        next(e)
    }
})
productRouter.post("/", async(req, res, next) => {
//console.log("test")
try {
    delete req.body.id
    const Product = await product.create(req.body)
    res.send(Product)
} catch (e) {
    console.log(e);
    e.httpRequestStatusCode = 500;
    next(e);
}
})
productRouter.put("/:id", async(req, res, next) => {
    try {
        const Product = await product.update({
            ...req.body
        }, {
            where: { id: req.params.id }
        })

        if (Product[0] === 1)
            res.send("UPDATED")
        else
            res.status(404).send("Not found")
    } catch (e) {
        e.httpRequestStatusCode = 500;
        next(e)
    }
})
productRouter.delete("/:id", async (req, res, next) =>{
    try {
        const result = await product.destroy({
            where: {
                id: req.params.id
            }
        })

        if (result === 1)
            res.send("DELETED")
        else
            res.status(404).send("Not Found")
    } catch (e) {
        e.httpRequestStatusCode = 500;
        next(e);
    }
})

productRouter.get("/search", async (req, res) => {
    try {
        //const result = sequelize.query(`SELECT * FROM "products"`, QueryTypes.SELECT)
        const result = await product.findAll({
            where: {
                [Op.or]: [
                        {
                            category: {
                                [Op.iLike]: `%${req.query.category}%`
                            }
                        }
                ]
            }
        })

        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//for upload (multiple)
productRouter.post("/:id/upload", upload.array("avatar"), async(req, res, next)=>{
    try {
        const arrayOfPromises = req.files.map((file) =>
        writeFile(join(imgFolderPath, file.originalname), file.buffer)
      )
      await Promise.all(arrayOfPromises)
        res.send(200).send("uploaded")
    } catch (e) {
        
    }
})

/* productRouter.post("/:id/upload", multer({ storage }).single, async (req, res) => {
    // This needs to be done elsewhere. For this example we do it here.
    await orm.sync()

    const filePath = `${req.file.destination}/${req.file.filename}`

    const myModel = await MyModel.create({ filePath })
}) */

module.exports = productRouter
