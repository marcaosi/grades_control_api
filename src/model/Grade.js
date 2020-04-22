import fs from 'fs'
import { promisify, isNumber } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const getDataBase = async () => {
    const data = await readFile("./database.json")
    return JSON.parse(data)
}

const setDataBase = async (data) => {
    await writeFile("./database.json", JSON.stringify(data))
}

const validateFunctions = {
    required : (value, cb) => {
        if(value != undefined && value != null && value != ""){
            return true
        }else{
            cb("Campo vazio.")
        }
    },
    string: (value, cb) => {
        if (typeof value === "string"){
            return true
        }else {
            cb("Campo deve ser uma string.")
        }
    },
    number: (value, cb) => {
        if(typeof value === "number"){
            return true
        }else{
            cb("Campo deve ser um número.")
        }
    }
}

const GradeModel = {
    save: async (grade) => {
        const db = await getDataBase()
        if(grade.id){
            const oldGradeIndex = db.grades.findIndex(g => parseInt(g.id) === parseInt(grade.id))
            db.grades[oldGradeIndex] = grade
        }else{
            grade.id = db.nextId++
            grade.timestamps = new Date()
            db.grades.push(grade)
        }

        setDataBase(db)

        return grade
    },
    validate: (grade, criteria = []) => {
        if(!grade){
            throw new Error("Deve enviar dados no corpo da requisição")
        }
        criteria.forEach(criterio => {
            const field = criterio[0]
            const stringValidations = criterio[1]
            const validations = stringValidations.split("|")

            validations.forEach(validation => {
                let validationFunction = validateFunctions[validation]
                if(validateFunctions == null){
                    throw new Error("Validação não é possível.")
                }

                validationFunction(grade[field], (msg) => {
                    throw new Error(JSON.stringify({
                        field,
                        error: msg
                    }))
                })
            })
        })
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
    findOne: async (id) => {
        id = parseInt(id, 10)
        if (!isNumber(id)){
            throw new Error("O campo id deve ser um número.")
        }
        const db = await getDataBase()
        let grades = db.grades

        const grade = grades.filter(grade => parseInt(grade.id) === id)

        return grade
    },
    remove: (id) => {

    }
}

export default GradeModel