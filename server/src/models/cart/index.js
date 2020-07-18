const orm = require("../../db")
const  Sequelize  = require("sequelize")
const Product = require("../product")

const Cart = orm.define("shoppingcarts", {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    productid: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    userid: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    /* TableName: "shoppingcart",
    freezeTableName: true */
})

module.exports = Cart