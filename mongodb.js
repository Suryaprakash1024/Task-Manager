const {MongoClient,ObjectId} = require('mongodb')
// const MongoClient = mongodb.MongoClient

const curl = 'mongodb://127.0.0.1:27017'
const databasename = 'task-manager'

MongoClient.connect(curl,{useNewUrlParser: true},(error,client)=>{
    if (error)
    {
        return console.log("Error...found")
    }
     
    const db = client.db(databasename)
    db.collection('tasks').find({done:true}).toArray((error,decs) =>{
        if(error){console.log('Iten not found')}
        else{console.log(decs)}
    

    }



//     db.collection('tasks').insertMany([{
//         description: 'Clean the house',
//         done: true
//     },{
//         description: 'Buy snacks',
//         done: false
//     },{
//         description: 'Read Books',
//         done: true
//     }],
//         (error,result)=>
//         {
//         if(error){console.log('Not nserted')}
//         else{console.log(result.ops)}
//         }
//     )
)})