const Express = require('express')
const router = Express.Router()
const { User } = require('../models/user_model')
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
            res.cookie('auth', token).status(200).send(ShowUser(user))
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
function ShowUser(user)
{
    return{
        Email:user.email,
        FirstName:user.firstname,
        LastName:user.lastname,
        age:user.age
    }
}
module.exports = router;