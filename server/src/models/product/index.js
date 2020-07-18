const orm = require("../../db")
const Sequelize = require("sequelize")
const v = require("validator")
const review = require("../review")
const Cart = require("../cart")

const product = orm.define ( "products", 
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
      imageurl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
    },
    {
        timestamps: true,
})

product.hasMany(review,{
  foreignKey : "productid"
})

product.hasMany(Cart,{
  foreignKey : "productid"
})
module.exports = product
