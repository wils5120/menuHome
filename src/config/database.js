const mongoose = require('mongoose')



const contra = encodeURIComponent("Andres1234#")
const conecctionUrl =  `mongodb+srv://wils5120:${contra}@cluster0.v4w8z.mongodb.net/menuHome?retryWrites=true&w=majority`

mongoose.connect(conecctionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then((response) => {
    console.log("Conexión a base de datos completada")
}).catch(err => { 
    console.log("deajte ver error", err)
})


/* Menu.find({}).then(res => {
    console.log("changos", res)
    mongoose.connection.close()
})
 */
/* const menu = new Menu({
    name: 'Entero',
    done: false,
    image:'https://i.ytimg.com/vi/MVgRdpt75AM/sddefault.jpg',
    specific: false,
    description: 'Tiene arroz, caldo, pollo y un rico guiso',
    lastOneDate:new Date()
})

menu.save().then(res => {
    console.log("que da de res", res)
    mongoose.connection.close()
}).catch(error => {
    console.log("error al guardar", error)
}) */