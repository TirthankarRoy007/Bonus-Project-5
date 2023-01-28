const express = require("express")
const router = express.Router()


router.all("/*",(req,res)=>{
    return res.status(400).send({message:"invalid path"})
})

module.exports = router;