const Cart = require("../../models/cart")
const Product = require("../../models/product")
const express = require("express")
const Sequelize = require("sequelize")
const orm = require("../../db")

const router = express.Router()

router.post("/", async(req, res)=> {
    res.send(await Cart.create(req.body))
})

router.get("/:userid", async (req, res) => {
     const response = await orm.query(`SELECT id, name, description, brand, imageurl, category, price as unitary_price, COUNT(*) As quantity, COUNT(*) * price as total
                                      FROM shoppingcarts JOIN "products" ON shoppingcarts.productid = "products".id
                                      WHERE userid = ?
                                      GROUP BY id
                                      `, {
                                        replacements: [req.params.userid],
                                        type: Sequelize.QueryTypes.SELECT
                                    }
                                          ) 

    res.send(response)              
})

router.delete("/:userid/:id", async (req, res)=>{

    const response = await Cart.destroy({
        where: {
            [Sequelize.Op.and]: [{
                userid: req.params.userid
            },{
                productid: req.params.id
            }]
        },
        limit: 1
    })

    res.send({test: response})
})

// router.get("/:userId", async(req, res)=>{
//     // const response = await Cart.findAll({
//     //      include: Product,
//     //      where: { userid: req.params.userId}
//     // })
//     const response = await Product.findAll({
//         attributes: 
//         [ "name", "description", "brand", "imageurl",  "category", "price", "id",
//             [ Sequelize.fn("COUNT", Sequelize.col('productid')), "quantity"]
//         ],
//         group: [ "name", "description", "brand", "imageurl",  "category", "price", "id"],
//         include: [{
//             model: Cart,
//             as: "shoppingcartss",
//             through: { 
//                 attributes: [] 
//             }
//         }],
//         where: {
//             '$shoppingcartss.userid$': req.params.userId
//         }
//     })

//     res.send(response)
// })



module.exports = router