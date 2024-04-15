module.exports = (request, response, next) => {
  let canViewLeads = false;
  //console.log('I AM THE PROBLEM')
  for (let permiso of request.session.permisos) {
    if (permiso.Descripcion == "Consultar leads.") {
      canViewLeads = true;
    }
  }
  if (canViewLeads) {
    next();
  } else {
    return response.redirect("/usuario/logout");
  }
};
