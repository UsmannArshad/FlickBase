const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const Validator=require('validator');
const jwt=require('jsonwebtoken')
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!Validator.isEmail(value))
            {
                throw new Error('Invalid Email');
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    firstname:{
        type:String,
        maxLength:100,
        trim:true
    },
    lastname:{
        type:String,
        maxLength:100,
        trim:true
    },
    age:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String
    }
},{versionKey:false})
userSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        const hash= await bcrypt.hash(this.password,10)
        this.password=hash
    }
    next();
})
userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email});
    return !!user;
}
userSchema.statics.CreateToken=async function(userEmail){
    const token=jwt.sign(userEmail,process.env.SUPERSECRET)
    this.token=token
    return this.token
}
userSchema.statics.checkEmail=async function(email){
    const user = await this.findOne({email});
    return user;
}
userSchema.methods.checkPwd=async function(givenpwd,user){
    const result=await bcrypt.compare(givenpwd,user.password)
    return result;
}
const User=mongoose.model('User',userSchema)
module.exports={User}