import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Grades Control API. Welcome!');
});
  
app.listen(3000, () => {
    console.log('API runing on port 3000!');
});