const mongoose  = require('mongoose')
 
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
})



// ------------------------------------------------Task------------------------------------------------

// const Task = mongoose.model('Task',{
//     Description:{type:String,required:true,trim:true},
//     Done:{type:Boolean,default:false}
// })

// const me = new Task({
//     Description: 'Clean Home'
    
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })