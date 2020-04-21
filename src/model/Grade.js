import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

const getDataBase = async () => {
    const data = await readFile("./database.json")
    return JSON.parse(data)
}

const GradeModel = {
    save: (grade) => {

    },
    validate: (grade, criteria) => {

    },
    find: async (criteria = []) => {
        const db = await getDataBase()
        let grades = db.grades

        grades = grades.filter(grade => {
            let valid = true

            criteria.forEach(criterio => {
                let valor = grade[criterio[0]]
                valid &= valor === criterio[1]
            })

            return valid
        })

        return grades
    },
    findOne: (id) => {

    },
    remove: (id) => {

    }
}

export default GradeModel