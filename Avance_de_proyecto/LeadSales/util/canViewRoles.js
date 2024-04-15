module.exports = (request, response, next) => {
    let canViewRoles =  false;
    //console.log('I AM THE PROBLEM')
    for (let permiso of request.session.permisos) {
        if (permiso.Descripcion == 'Consultar roles.') {
            canViewRoles = true;
        }
    }
    if(canViewRoles) {
        next();
    } else {
        return response.redirect('/usuario/logout');    
    }
}