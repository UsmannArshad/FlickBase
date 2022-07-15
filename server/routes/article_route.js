const Express=require('express');
const {article} = require('../models/article_model');
const Router=Express.Router();
const {checkLoggedIn} =require('../middlewares/auth')
const {CheckPermission}=require('../middlewares/roles');
const mongoose=require('mongoose')
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
Router.route('/:id')
.get(checkLoggedIn,CheckPermission('readAny','article'),async(req,res)=>{
    try{
        const id= mongoose.Types.ObjectId(req.params.id.trim());
        const article1=await article.findById(id)
        if(!article1||article1.length===0) return res.status(400).send("Article not found")
        res.status(200).send(article1)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({message:"error while displaying article",error:error})
    }
})
.patch(checkLoggedIn,CheckPermission('updateAny','article'),async(req,res)=>{
    try{
        const id=mongoose.Types.ObjectId(req.params.id.trim())
        const article1=await article.findByIdAndUpdate(
            id,
            {$set:{
                ...req.body
            }},
            {new:true}
        )
        if(!article1) return res.status(400).send('Article not found')
        res.status(200).send(article1)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({message:"error while displaying article",error:error})
    }
})
.delete(checkLoggedIn,CheckPermission('deleteAny','article'),async(req,res)=>{
    try{
        const id=mongoose.Types.ObjectId(req.params.id.trim())
        const article1=await article.findByIdAndRemove(id)
        if(!article1) res.status(400).send('User not found')
        res.status(200).send("Deleted Succesfully")
    }
    catch(error)
    {
        console.log(error)
        res.status(400),json({message:'Error Deleting',error:error})
    }
})
module.exports=Router