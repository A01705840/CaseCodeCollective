module.exports = (request, response, next) => {
    let canEliminarLeads =  false;
    for (let funcion of request.session.funcion) {
        if (funcion.funcion == 'Eliminar leads') {
            canEliminarLeads = true;
        }
    }
    if(canEliminarLeads) {
        next();
    } else {
        return response.redirect('/usuario/logout');    
    }
}