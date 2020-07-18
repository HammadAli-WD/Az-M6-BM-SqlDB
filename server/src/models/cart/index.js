const orm = require("../../db")
const  Sequelize  = require("sequelize")
const Product = require("../product")

const Cart = orm.define("cart", {
    cartid: {
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
    TableName: "cart",
    freezeTableName: true
})

module.exports = Cart