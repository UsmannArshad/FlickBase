const Express=require('express');
const App=Express();
const port=process.env.PORT || 3001;
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
require('dotenv').config()
const mongoURI=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoURI)
App.use(bodyparser.json())
App.get('/',(req,res)=>{
    res.status(200).send("Server");
})
App.listen(port,()=>{
    console.log(`listening on port ${port}`)
})