window.onload = function() {
    document.getElementById('save-changes').style.display = 'none';

    var hasChanges = false;

    var checkboxes = document.querySelectorAll('.privilege-checkbox');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            hasChanges = true;
            document.getElementById('save-changes').style.display = 'block';
        });
    });

    document.getElementById('save-changes').addEventListener('click', function() {
        var changes = {
            roleID: null,
            privileges: []
        };
        checkboxes.forEach(function(checkbox) {
            let roleID = checkbox.getAttribute('data-role');
            let privilegeID = checkbox.getAttribute('data-privilege');
            let checked = checkbox.checked;
            if (!changes.roleID) {
                changes.roleID = roleID;
            }
            changes.privileges.push({privilegeID, checked});
        });
        //console.log(changes);
        swal({
            title: '¿Estás seguro?',
            text: 'Los cambios se guardarán en la base de datos.',
            icon: 'warning',
            buttons: {
                cancel: 'No, cancelar',
                confirm: 'Sí, guardar cambios',
            },
            dangerMode: true,
        }).then((isConfirm) => {
            if (isConfirm) {
                fetch('/privilegios/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(changes),
                })
                //.then(console.log(JSON.stringify(changes)))
                .then(response => response.json())
                .then(data => {
                    swal('Guardado', 'Los cambios se han guardado.', 'success');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    swal('Error', 'Ocurrió un error al guardar los cambios.', 'error');
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