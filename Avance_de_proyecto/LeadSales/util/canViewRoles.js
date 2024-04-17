module.exports = (request, response, next) => {
    let canViewRoles =  false;
    for (let permiso of request.session.permisos) {
        if (permiso.Descripcion == 'Consultar roles.') {
            canEdit = true;
        }
    }
    if(canViewRoles) {
        next();
    } else {
        return response.redirect('/usuario/logout');    
    }
}