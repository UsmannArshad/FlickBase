//libraries Required
const Express=require('express');
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const {checkToken}=require('./middlewares/auth')
require('dotenv').config()

//routes
const user=require('./routes/user_route')

//variables
const App=Express();
const port=process.env.PORT || 3001;
const mongoURI=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoURI)

//MiddleWares
App.use(bodyparser.json())
App.use(checkToken)
App.use("/api/users",user)

App.get('/',(req,res)=>{
    res.status(200).send("Server");
})
App.listen(port,()=>{
    console.log(`listening on port ${port}`)
})