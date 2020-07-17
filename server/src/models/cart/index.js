const orm = require("../../db")
const  Sequelize  = require("sequelize")
const Product = require("../product")

const Cart = orm.define("shoppingcart", {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    productid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userid: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "shoppingcart",
    freezeTableName: true
})

module.exports = Cart