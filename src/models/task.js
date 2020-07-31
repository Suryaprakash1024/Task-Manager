const mongoose  = require('mongoose')
 
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
//         useNewUrlParser:true,
//         useCreateIndex:true
// })



// ------------------------------------------------Task------------------------------------------------

const Task = mongoose.model('Task',{
    Description:{type:String,required:true,trim:true},
    Done:{type:Boolean,default:false},
    Owner:{
        type:mongoose.Schema.Types.Object,
        required:true

    }
})

module.exports = Task