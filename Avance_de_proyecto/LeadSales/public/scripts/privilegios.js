window.onload = function() {
document.getElementById('save-changes').style.display = 'none';

var hasChanges = false;


var checkboxes = document.querySelectorAll('.privilege-checkbox');
//console.log(checkboxes);
checkboxes.forEach(function(checkbox) {
    console.log("Agregando listener a checkboxes");
    checkbox.addEventListener('change', function() {
        hasChanges = true;
        document.getElementById('save-changes').style.display = 'block';
    });
});


document.getElementById('save-changes').addEventListener('click', function() {
    var changes = [];
    console.log("Guardando cambio");
    checkboxes.forEach(function(checkbox) {
        changes.push({
            privilege: checkbox.dataset.privilege,
            role: checkbox.dataset.role,
            checked: checkbox.checked
        });
    });
    //console.log(checkboxes);
    swal({
        title: "¿Guardar los cambios?",
        text: "Los cambios se guardarán en la base de datos.",
        icon: "info",
        buttons: {
            cancel: "Cancelar",
            confirm: "Confirmar"
        },
        dangerMode: false,
    })
    .then((willSave) => {
        if (willSave) {
            console.log("llamando a ruta /privilegios/ con método POST");
            //console.log(JSON.stringify(changes));
            fetch('/privilegios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changes),
            })
            .then(response => response.json())
            .then(data => {
                swal("¡Tus cambios han sido guardados!", {
                    icon: "success",
                });
                hasChanges = false;
                document.getElementById('save-changes').style.display = 'none';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } 
    });
});

document.getElementById('close-button').addEventListener('click', function() {
    if (hasChanges) {
        swal({
            title: "¿Salir?",
            text: "No se han guardado los cambios.",
            icon: "warning",
            buttons: {
                cancel: "Cancelar",
                confirm: "Salir sin guardar"
            },
           dangerMode: true,
        })
        .then((willLeave) => {
            if (willLeave) {
                // Aquí puedes cerrar la ventana o hacer lo que necesites hacer cuando el usuario decide salir.
            }
        });
    } else {
        // Aquí puedes cerrar la ventana o hacer lo que necesites hacer cuando el usuario decide salir.
    }
});
};

