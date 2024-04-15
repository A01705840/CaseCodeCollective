module.exports = (request, response, next) => {
    let canEditRoles = false;
    for (let permiso of request.session.permisos) {
      if (permiso.permiso == "Modificar roles.") {
        canEdit = true;
      }
    }
    if (canEditRoles) {
      next();
    } else {
      return response.redirect("/usuario/logout");
    }
  }