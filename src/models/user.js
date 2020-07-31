const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new error('Email invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new error('Password invalid.!')
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if (value<0)
            {
                throw new error('Age cannot be ngative')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
//         useNewUrlParser:true,
//         useCreateIndex:true
// })

// const me = new User({
//     name:'arjun',
//     email:'sjds@gmail.com',
//     password:'qwerty',
//     age:21
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

userSchema.methods.generateAuthToken = async function() {
    const user = this
    // console.log(user.id)    
    const token = jwt.sign({_id:user._id.toString()},'thisisnewcourse')
    // console.log(token)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    // console.log('Email Found'+ user.password)
    if(!user){
        // console.log('Error..1?')
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log(user.password, '----',password)
    if (isMatch){
        return user
    }
    if (user.password == password){return user}
    if((!isMatch) | (user.password !== password)){
        console.log(!isMatch,user.password !== password)
        throw new Error('Unable to login')
    }
    // console.log(user.email)
    return user
}

userSchema.pre("save",async function(next){
    const user = this
    // console.log('Password hashing place')
    if(!user.isModified('password'))
    { 
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('User',userSchema)
module.exports = User