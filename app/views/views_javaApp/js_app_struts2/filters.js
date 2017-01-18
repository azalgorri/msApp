function startingLetter(valor, expected)
{  
    if(expected)
    {
        var newValue=[];

        for(var i=0;i<valor.length;i++)
        {
            if(valor[i].nombre.toUpperCase().indexOf(expected.toUpperCase()) === 0)
            {
                newValue.push(valor[i]);
            }
        }

        return newValue;
    }
    
    return valor;
}
function seleccionFilter(valor, expected, entity)
{
    var newValue=[];

    for(var i=0;i<valor.length;i++)
    {
        switch (entity)
        {
            case 'cliente':
                if (valor[i].nombre.indexOf(expected)===0
                || valor[i].tarjeta.indexOf(expected)===0
                || (valor[i].codigo && valor[i].codigo.indexOf(expected)===0)
                || valor[i].dni.indexOf(expected)===0
                || valor[i].email.indexOf(expected)===0
                || valor[i].poblacion.indexOf(expected)===0) {
                    newValue.push(valor[i]);
                }
                if(newValue.length == 0)
                    newValue = valor;
                break;
            
            case 'provincia':
                if(valor[i].estado)
                {
                    if (valor[i].estado.indexOf(expected)===0) {
                        newValue.push(valor[i]);
                    }
                }
                break;
        }
    }

    // En el caso de buscar los estado los devolveremos todos
    return (entity == 'estado') ? valor : newValue;
}
app.filter("startingLetter",['$log',function ($log) {
    $log.log("Creando el filtro startingFilter");
    return startingLetter;
}]);
app.filter("seleccionFilter",['$log',function ($log) {
    $log.log("Creando el filtro seleccionFilter");
    return seleccionFilter;
}]);
app.filter('startFromGrid', [ 'glService', function() {
    return function(input, start) {
        start = +start;
        return (input) ? input.slice(start) : null;
    };
}]);