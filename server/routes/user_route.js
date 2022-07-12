const Express = require('express')
const router = Express.Router()
const { User } = require('../models/user_model')
router.route('/register')
    .post(async (req, res) => {
        try {
            const user = req.body
            if (await User.emailTaken(req.body.email)) {
                return res.status(400).json({ message: 'Sorry email taken' })
            }
            const token=await User.CreateToken(user.email)
            const newUser = new User({
                email: user.email,
                password: user.password
            })
            const doc=await newUser.save();
            res.cookie('auth', token).status(200).send(doc)
        }
        catch (error) {
    res.status(400).json({ message: 'Error', error: error })
}
    })
module.exports = router;