module.exports = (error, request, response, next) => {
    if(error.name === 'CastError'){
        response.status(400).send({error: "la id no existe"})
    }
    else{
        response.status(500).end()
    } 
}