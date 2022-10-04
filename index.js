require('./src/config/database')

const express = require('express')
const app = express()
const Menu = require('./src/models/Menu.model')
const handleErrors = require('./src/middleware/handleErrors')
const PORT = require('./src/config/configPort')


app.use(express.json())


app.get('/api/allMenu', (request, response) => {
    Menu.find({}).then(res =>{
        response.json(res)
    })
})


app.get('/api/allMenu/:id', (request, response, next) => {
    const { id } = request.params

    
    Menu.findById(id).then(res =>{
        if(res){
            return response.json(res)
        }else{
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})


app.post('/api/create', (request, response) => {
    const body = request.body
    
    const newMenu = new Menu({
        name: body.name,
        done: body.done,
        image: body.image,
        specific: body.specific,
        description: body.description,
        lastOneDate:new Date().toISOString()
    })

    if(!body.name){
        return response.status(400).json({
            error:'requiered name'
        })
    }
 
    newMenu.save().then(saveMenu => {
        response.json(saveMenu)
    })
})


app.put('/api/updateMenu/:id', (request, response, next) => {
    const { id } = request.params
    const body = request.body
    

    const updateMenu = {
        name: body.name,
        done: body.done,
        image: body.image,
        specific: body.specific,
        description: body.description,
        lastOneDate:new Date().toISOString()
    }

    Menu.findByIdAndUpdate(id, updateMenu, {new: true}).then(res =>{
        response.json(res)
    }).catch(err => next(err))
})


app.use(handleErrors)

const PORTLISTEN = PORT.PORT
app.listen(PORTLISTEN, () => {
    console.log(`Server running on port ${PORTLISTEN}`)
})