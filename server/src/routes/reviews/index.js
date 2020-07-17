const express = require("express");
const review = require("../../models/review");
const router = express.Router();
router.get("/:id", async (req, res)=>{
  try{
      res.send(await review.findAll({
          where: {
              reviewid: req.params.id
          }
      }))
  }
  catch(e){
      console.log(e)
      res.status(500).send(e)
  }
})
// In the postman its route is like this http://localhost:3003/reviews/id of product
router.post("/:id", async (req,res)=>{
  try{
      res.send(await review.create({
          ...req.body,
          productid: req.params.id
      }))
  }
  catch(e){
      console.log(e)
      res.status(500).send(e)
  }
})

router.put("/:reviewid", async (req, res)=>{
  try{
      delete req.body.productid // we don't want to update the productid field. Once a review is created, it should be fixed on one book
      //delete req.body.userid // we don't want to update the userid field. Once a reviewer wrote a review, that review is fixed to him

      const result = await review.update({ //update the review
          ...req.body  // <= all the fields included in the req.body
      }, {
          where: { // for the element with id = req.params.reviewId
              reviewid: req.params.reviewid
          }
      })

      if (result[0] === 1) // if we updated something
          res.send("OK") // we return OK 
      else 
          res.status(404).send("Not found") // probably the ID was not there, NOT FOUND
  }
  catch(e){
      console.log(e)
      res.status(500).send(e)
  }
})

router.delete("/:reviewid", async (req, res)=>{
  try{
    const result = await review.destroy({
      where: {
        reviewid: req.params.reviewid
      }
  })

  if (result === 1)
      res.send("DELETED")
  else
      res.status(404).send("Not Found")
  }
  catch(e){
      console.log(e)
      res.status(500).send(e)
  }
})

module.exports = router