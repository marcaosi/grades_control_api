import express from 'express'
import model from '../model/Grade'

const router = express.Router()

router.get('/', async (req, res) => {
    const grades = await model.find()

    res.send(JSON.stringify(grades))
})

router.get('/:id', async (req, res) => {
    try{
        const grade = await model.findOne(req.params.id)
        
        if(grade.length > 0)
            res.send(JSON.stringify(grade[0]))
        else
            res.status(204).send()
    }catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
})

router.post('/', async (req, res) => {
    try{
        model.validate(req.body, [
            ["student", "required|string"],
            ["subject", "required|string"],
            ["type"   , "required|string"],
            ["value"  , "required|number"]
        ])
        const grade = await model.save(req.body)
    
        res.send(JSON.stringify(grade))
    }catch(err){
        console.log(err.message)
        res.status(400).send(JSON.stringify({err: err.message}))
    }
})

router.put('/', async (req, res) => {
    try{
        model.validate(req.body, [
            ["student", "required|string"],
            ["subject", "required|string"],
            ["type"   , "required|string"],
            ["value"  , "required|number"],
            ["id", "required|number"]
        ])
        const grade = await model.save(req.body)
    
        res.send(JSON.stringify(grade))
    }catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        await model.remove(req.params.id)
        
        res.status(204).send()
    }catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
})
  

export default router