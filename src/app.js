import express from 'express'
import routerGrade from './router/grade'
import fs from 'fs'
import { promisify } from 'util'

const exists = promisify(fs.exists)
const writeFile = promisify(fs.writeFile)

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Grades Control API. Welcome!')
});

app.use('/grade', routerGrade)

app.listen(3000, async () => {
    
    try{
        const dbExists = await exists("./database.json")
        
        if(!dbExists){
            const initDB = {
                nextId: 1,
                grades: []
            }
            
            await writeFile("./database.json", JSON.stringify(initDB))
        }
    }catch(err){
        console.log("Error on starting API.")
    }

    console.log('API runing on port 3000!')
});