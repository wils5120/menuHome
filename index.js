require('./src/config/database')

const express = require('express')
const app = express()
const fs = require('fs');
const Menu = require('./src/models/Menu.model')
const handleErrors = require('./src/middleware/handleErrors')
const PORT = require('./src/config/configPort')
var moment = require('moment');
app.use(express.json({limit: "50mb"}))


app.get('/api/allMenu/:date', (request, response) => {
    let { date } = request.params
    console.log("jumm pinche life", date)
    let dateConsult = moment(parseInt(date)).format("MM-DD-YYYY")  
    console.log("jumm pinche life dateConsult dateConsult", dateConsult)
    Menu.find({lastOneDate: {$lt: new Date(dateConsult)}}).then(res =>{
        response.json(res)
    }
)
})


app.get('/api/allMenu/by/:id', (request, response, next) => {
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
    const base64Image = body.image.split(';base64,').pop();
    fs.writeFile(`public/images/${body.name}.jpg`, base64Image, { encoding: 'base64' }, function(err) {
        const newMenu = new Menu({
            name: body.name,
            done: body.done,
            image: base64Image,
            specific: body.specific,
            description: body.description,
            lastOneDate:new Date()
        })
        if(!body.name){
            return response.status(400).json({
                error:'requiered name'
            })
        }
        newMenu.save().then(saveMenu => {
            response.json(saveMenu)
        })
      });

})


app.delete('/api/delete/:id', (request, response) =>{
    const  id  = request.params
    if(id){
        Menu.deleteOne({_id: id.id}).then(res => {
            return response.json(res)
        }).catch(err => console.log(err))
    }else{
        response.status(404).end()
    }
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