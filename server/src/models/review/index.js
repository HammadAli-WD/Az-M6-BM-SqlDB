const Sequelize  = require("sequelize")
const { NUMBER, STRING, INTEGER } = require("sequelize")
const orm = require("../../db")

const review = orm.define("reviews", 
 {
  reviewid: {
    type: NUMBER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false
  },
  comment: {
    type: STRING,
    allowNull: false
  },
  rate: {
    type: NUMBER,
    allowNull: false
  },
  productid: {
    type: NUMBER,
    allowNull: false
},
},
  {
    timestamps: false,
  }
)


module.exports = review;