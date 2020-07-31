const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks',auth, async (req,res)=>{       //Creating Posts
    // const task= new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.used._id
    })

    try{
        await task.save()
        await res.status(400).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks',async (req,res)=>{         //Getting all tassks
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',async(req,res)=>{          //Getting tasks by id
    const _id = req.params.id
    try{
        const task =await Task.findById(_id)
        if(!task)
        {
            return res.status(404).send()
        }

        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id',async (req,res)=>{        //Update  Task

    const updates = Object.keys(req.body)
    const allowedUpdates = ['Done','Description']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if (!isValidOperation)
    {
        return res.status(400).send('Error: Invalid Operation')
    }

    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true})

        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(400).send()
    }

})

router.delete('/tasks/:id',async (req,res)=>{  //Deleting task
    try{
        const task =await Task.findByIdAndDelete(req.params.id)

        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e)
    {
        res.status(500).send()
    }
})

module.exports = router