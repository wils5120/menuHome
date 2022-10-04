const { Schema, model } = require('mongoose')


const MenuShema = new  Schema({
    name: String,
    done: Boolean,
    image: String,
    specific: Boolean,
    description: String,
    lastOneDate:Date
})

const Menu = model('Menu', MenuShema)

MenuShema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = Menu