import express from 'express'
import routerGrade from './router/grade'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Grades Control API. Welcome!');
});

app.use('/grade', routerGrade)

app.listen(3000, () => {
    console.log('API runing on port 3000!');
});