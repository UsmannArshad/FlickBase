const Express = require('express')
const router = Express.Router()
const { User } = require('../models/user_model')
const {checkLoggedIn}=require('../middlewares/auth')
const {CheckPermission}=require('../middlewares/roles')
router.route('/register')
    .post(async (req, res) => {
        try {
            const user = req.body
            if (await User.emailTaken(user.email)) {
                return res.status(400).json({ message: 'Sorry email taken' })
            }
            const token = await User.CreateToken(user.email)
            const newUser = new User({
                email: user.email,
                password: user.password
            })
            const doc = await newUser.save();
            res.cookie('auth', token).status(200).send(ShowUser(doc))
        }
        catch (error) {
            res.status(400).send(error)
        }
    })
router.route('/signin')
.post(async (req,res)=>{
    try{
        const user=await User.checkEmail(req.body.email)
        if(!user) return res.status(400).send('User not Present')
        const check=user.checkPwd(req.body.password,user)
        if(!check) return res.status(400).send('Wrong Credentials')
        const token = await User.CreateToken(user.email)
        res.cookie('auth', token).status(200).send(ShowUser(user))
    }
    catch(error){
        res.status(400).json({ message: 'Error', error: error })
    }
})
router.route('/profile')
.get(checkLoggedIn,CheckPermission('readOwn','profile'),async(req,res)=>{
    const permission=res.locals.permission
    const user=await User.findOne({email:req.user.email})
    res.status(200).send(permission.filter(user._doc))
})
.patch(checkLoggedIn,CheckPermission('updateOwn','profile'),async(req,res)=>{
    try{
        const user=await User.findOneAndUpdate(
            //how to find
            {email:req.user.email},
            //what to update
            {"$set":
            {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            age:req.body.age}},
            //what u want to return (old/new)
            {new:true}
        )
        if(!user) return res.status(400).send('User not Found')
        res.status(200).json(user)
    }
    catch(error)
    {
        return res.status(400).json({message:"Problem updating",error:error});
    }
})
function ShowUser(user)
{
    return{
        Id:user._id,
        Email:user.email,
        FirstName:user.firstname,
        LastName:user.lastname,
        age:user.age,
        role:user.role
    }
}
module.exports = router;