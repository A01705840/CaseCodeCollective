module.exports = (request, response, next) => {
    if (request.session.isLoggedIn) {
        next();
    }else{
        return response.redirect('/usuario/login');
    }
}