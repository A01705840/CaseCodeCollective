function cambiarRol(idUsuario) {
    console.log('La función cambiarRol se ha llamado');
    var idRol = document.getElementById('rol-' + idUsuario).value;
    fetch('/Roles/cambiarRol', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUsuario: idUsuario, idRol: idRol }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        location.reload(); // Recarga la página para mostrar los cambios
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
