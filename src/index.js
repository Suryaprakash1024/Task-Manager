const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{    //Use this during maintance
//     res.status(503).send('Site is under maintanance...We will be back Soon..!')
// })

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{                       //Port server
    console.log('server is up on port '+ port)
})