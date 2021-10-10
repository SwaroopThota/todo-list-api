const express = require('express');
const router = express.Router();
const todoModel = require("../models/todoModel");

router.get('/', async (req,res)=>{
    try{
    const todos = await todoModel.find();
    res.json(todos);
    }catch(err){
        res.sendStatus(404);
    }
})

router.post('/', async (req,res)=>{
    const { done, todo} = req.body;
    try{
       const newTodo = await new todoModel({ done : done, todo : todo}).save();
        res.status(200).send(newTodo);
    }catch(e){
        console.log(e);
        res.status(404).send("can't add an empty string as todo");
    }
})

router.put('/',async (req,res)=> {
    const {id,done} = req.body;
    try{
    await todoModel.findByIdAndUpdate(id, { $set: { done: done } });
    res.status(200).send(done);
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
})

router.delete('/', async (req,res)=>{
    try{
    const {id} = req.body;
    await todoModel.findByIdAndDelete(id);
    res.status(200).send("todo deleted successfully");
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
})

module.exports = router;