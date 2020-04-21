import express from 'express'
import model from './model/Grade'

const app = express()

app.get('/', (req, res) => {
    res.send('Grades Control API. Welcome!');
});

app.get('/grade', async (req, res) => {
    const grades = await model.find()

    res.send(JSON.stringify(grades))
})
  
app.listen(3000, () => {
    console.log('API runing on port 3000!');
});