import express from 'express'
import model from './model/Grade'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Grades Control API. Welcome!');
});

app.get('/grade', async (req, res) => {
    const grades = await model.find()

    res.send(JSON.stringify(grades))
})

app.get('/grade/:id', async (req, res) => {
    try{
        const grade = await model.findOne(req.params.id)
        
        if(grade.length > 0)
            res.send(JSON.stringify(grade))
        else
            res.status(204).send()
    }catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
})

app.post('/grade', async (req, res) => {
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
  
app.listen(3000, () => {
    console.log('API runing on port 3000!');
});