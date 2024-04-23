window.onload = function() {
    //se muestra un mensaje de confirmacion al guardar los cambios
    document.getElementById('save-changes').addEventListener('click', function() {
        //se muestra un mensaje de confirmacion al guardar los cambios
    swal('Guardado', 'Los cambios se han guardado.', 'success')
    })
};