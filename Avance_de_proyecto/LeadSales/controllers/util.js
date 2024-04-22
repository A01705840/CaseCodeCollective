// utils.js

// Función para calcular la fecha de inicio y la fecha de fin
exports.calcularRangoFechas = function(seleccion) {
    //console.log("SELECCION",seleccion);
    var ahora = new Date(2023, 0, 1); // Fecha actual
    var inicio;
    var fin = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - 1); // Un día antes del último día

    //Convertir seleccion a entero
    seleccion = parseInt(seleccion);
    switch (seleccion) {
        case 1:
            inicio = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - 7);
            break;
        case 2:
            inicio = new Date(ahora.getFullYear(), ahora.getMonth() - 1, ahora.getDate());
            break;
        default:
            inicio = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - 7);
    }
    //console.log("INICIO",inicio);
    return { inicio: inicio, fin: fin };
};


// Función para generar un array de fechas que representen todos los días en el rango de fechas seleccionado
exports.generarFechas = function(inicio, fin) {
    var fechas = [];
    var fechaActual = new Date(inicio);
    while (fechaActual <= fin) {
        fechas.push(new Date(fechaActual));
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return fechas;
};

// Función para agrupar los leads por agente
exports.agruparLeadsPorAgente = function(leadsPorAgente) {
    return leadsPorAgente.reduce((grupos, item) => {
        var grupo = grupos[item.Agente] || [];
        grupo.push(item);
        grupos[item.Agente] = grupo;
        return grupos;
    }, {});
};

// Función para crear un conjunto de datos para cada agente
exports.generarDatasetsPorAgente = function(gruposPorAgente, fechas) {
    return Object.keys(gruposPorAgente).map(agente => {
        var grupo = gruposPorAgente[agente];
        var datos = fechas.map(fecha => {
            var item = grupo.find(item => {
                var fechaItem = new Date(item.Fecha);
                return fechaItem.getTime() === fecha.getTime();
            });
            return item ? item.CantidadLeads : 0; // Si no hay item, asignar 0
        });
        return {
            agente,
            datos,
        };
    });
};