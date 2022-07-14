const Express=require('express');
const {article} = require('../models/article_model');
const Router=Express.Router();
const {checkLoggedIn} =require('../middlewares/auth')
const {CheckPermission}=require('../middlewares/roles')
Router.route('/addarticle')
.post(checkLoggedIn,CheckPermission('createAny','article'),async(req,res)=>{
    try{
        const newarticle=new article({
            ...req.body
        })
        const doc=await newarticle.save()
        res.status(200).send(doc)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({message:"error while posting new article",error:error})
    }
})
module.exports=Router