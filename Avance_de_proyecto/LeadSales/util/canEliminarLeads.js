module.exports = (request, response, next) => {
    console.log('canEliminarLeads')
    console.log(JSON.stringify(request.session.funcion))
    const funcion = request.session.funcion;
    let canEliminarLeads =  false;
    if (funcion && funcion.length) {
        for (let i = 0; i < funcion.length; i++) {
            if (funcion[i].Descripcion == 'Eliminar leads.') {
                canEliminarLeads = true;
            } 
            if(canEliminarLeads) {
                next();
            }
        }
    }
    console.log(canEliminarLeads);
}