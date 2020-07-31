const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

router.post('/users', async (req,res)=>{             //Creating Users
    const user = new User(req.body)
    try{
        const token = await user.generateAuthToken()
        await user.save()
        await res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }// user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

router.post('/users/login',async (req,res)=>{ //Login User
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send(user)

    }
    catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

router.post('/users/logout',auth,async(req,res)=>{  //logout
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me',auth,async (req,res)=>{         //Getting USers
    console.log('User should  be display')
    res.send(req.user)
    
})

router.get('/users/:id', async (req,res)=>{        //Getting Users by Id
    const _id = req.params.id
    try{
    const user = await User.findById(_id)

    if(!user)
    {
        return res.status(404).send()
    }
    res.send(user)
    }
    catch(e){
        res.status(500).send()
    }
})

router.patch('/users/:id',async (req,res)=>{        //Update  User

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if (!isValidOperation)
    {
        return res.status(400).send('Error: Invalid Operation')
    }

    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update)=> user[update] = req.body[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true})

        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(400).send()
    }

})

router.delete('/users/:id',async (req,res)=>{  //Deleting user
    try{
        const user =await User.findByIdAndDelete(req.params.id)

        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e)
    {
        res.status(500).send()
    }
})
 


module.exports = router