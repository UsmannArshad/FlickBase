const Express=require('express')
const router=Express.Router()
const {User}=require('../models/user_model')
router.route('/register')
.post((req,res)=>{
    console.log("ff")
    res.status(200).send('OK')
})
module.exports=router;