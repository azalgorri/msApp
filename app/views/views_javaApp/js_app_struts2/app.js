// Generales javascript
String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
};
///////////////////// OBJETOS /////////////////////////////////////

function Mensaje (tp, txt, auto)
{
        this.type = tp;
        this.text = txt;
        this.autoclose = auto;
}
Mensaje.types = {
        error: -1,
        normal: 0,
        success: 1
};
///////////////////// OBJETOS /////////////////////////////////////

var app = angular.module('app', ['pascalprecht.translate', 'ui.calendar', 'ngMessages', 
        'mgcrea.ngStrap','multipleDatePicker']);
// Condiguraci�n de la localizaci�n
// Modulo usado: https://angular-translate.github.io/
app.config(function ($translateProvider) 
{
    $translateProvider.translations('es',
        {
            loc_Tienda: "Tienda",
            loc_Cliente: "Cliente",
            loc_Clave: "Clave",
            loc_Acceder: "Acceder",
            loc_Vendedor: "Vendedor",
            loc_SelecArticulo: "Selecci�n de art�culo",
            loc_SelecArticuloExp: "Seleccione en la lista que tiene a continuaci�n cu�l de los art�culos es el que desea utilizar.",
            loc_SelecEstado: "Selecci�n de estado",
            loc_SelecEstadoExp: "Seleccione en la lista que tiene a continuaci�n cu�l de los estados es el que desea utilizar.",
            loc_SelecProvincia: "Selecci�n de provincia",
            loc_SelecProvinciaExp: "Seleccione en la lista que tiene a continuaci�n cu�l de las provincia es la que desea utilizar.",
            loc_SelecCliente: "Selecci�n de cliente",
            loc_SelecClienteExp: "Seleccione en la lista que tiene a continuaci�n cu�l de los clientes es el que desea utilizar.",
            loc_Localizador: "Localizador",
            loc_Modelo: "Modelo",
            loc_Descripcion: "Descripci�n",
            loc_noDescripcion: "No hay descripci�n para el idioma elegido",
            loc_Articulo: "Art�culo",
            loc_Descripcion2: "DESCRIPCI�N",
            loc_Composicion: "Composici�n",
            loc_CompoForro: "Composici�n del forro",
            loc_StockPrecio: "Stock en las tiendas y precios (P.V.P)",
            loc_nOdt: "N� ODT",
            loc_odtSalida: "ODTs Salida",
            loc_Referencia: "Referencia",
            loc_Temporada: "Temporada",
            loc_Color: "Color",
            loc_Unidades: "Unidades",
            loc_Tiendas: "Tiendas",
            loc_Codigo: "C�digo",
            loc_Nombre: "Nombre",
            loc_SelecCod: "Seleccione el c�digo que est� buscando en la siguiente lista:",
            loc_Tarjeta: "Tarjeta",
            loc_NomAps: "Nombre y Apellidos",
            loc_Direccion: "Direcci�n",
            loc_MedCarac: "Medidas y Caracter�sticas",
            loc_BuscarPorTalla: "Buscar art�culos con stock en la talla indicada.",
            loc_BuscarPorTallaRef: "Buscar art�culos con stock en la talla indicada y con la misma referencia.",
            loc_Talla: "Talla",
            loc_ModifCliente: "Modificar cliente",
            loc_TiendaSalida: "Tienda de Salida",
            loc_Precio: "Precio",
            loc_nTarjetaCliente: "N� Tarjeta de Cliente",
            loc_Apellidos: "Apellidos",
            loc_CP: "C.P.",
            loc_Poblacion: "Poblaci�n",
            loc_Estado: "Estado",
            loc_Provincia: "Provincia",
            loc_Telefono: "Tel�fono",
            loc_Fax: "Fax",
            loc_TelefMovil: "Tel�fono m�vil",
            loc_DNI: "DNI",
            loc_FechaNac: "Fecha de Nacimiento",
            loc_Email: "E-mail",
            loc_Mujer: "M-Mujer",
            loc_Varon: "V-Var�n",
            loc_Condiciones: "Condiciones",
            loc_Medidas: "Medidas",
            loc_Similares: "Similares",
            loc_TallaIncorrecta: "Talla incorrecta",
            loc_RefIncorrecta: "Referencia incorrecta",
            loc_selecClienteOblig: "Se debe seleccionar un cliente antes de realizar la reserva",
            loc_errorReserva: "No se ha podido realizar la reserva",
            loc_confirmacionBorrado: "�Est� seguro de que desea ejecutar la operaci�n de borrado?",
            loc_Aceptar: "Aceptar",
            loc_Departamento: "Departamento",
            loc_Valor: "Valor",
            loc_Total: "Total",
            loc_NuevoCliente: "Nuevo cliente",
            loc_Ventas: "Ventas",
            loc_Prestamos: "Pr�stamos",
            loc_Reservas: "Reservas",
            loc_BorrarCliente: "Borrar cliente",
            loc_GrabarCliente: "Grabar cliente",
            loc_Desde: "Desde",
            loc_Hasta: "Hasta",
            loc_Fecha: "Fecha",
            loc_Descuento: "Descuento",
            loc_Destino: "Destino",
            loc_Estado: "Estado",
            loc_Tipo: "Tipo",
            loc_Entrada: "Entrada",
            loc_Salida: "Salida",
            loc_Pausa: "Pausa",
            loc_DiarioLaboral: "Diario laboral",
            loc_Cerrar: "Cerrar",
            loc_Guargar: "Guardar",
            loc_CargarTodos: "Cargar Todos",
            loc_Horario: "Horario",
            loc_Horarios: "Horarios",
            loc_Vacaciones: "Vacaciones",
            loc_Editar: "Editar",
            loc_Mas: "M�s",
            loc_Hoy: "Hoy",
            loc_VendedorGuardado: "Vendedor guardado",
            loc_VendedorErrorGuardar: "Error al guardar el vendedor",
            loc_ClienteCreado: "Nuevo cliente creado",
            loc_ClienteModificado: "Cliente modificado",
            loc_ClienteErrorGuardar: "Error al guardar el cliente",
            loc_ClienteEliminado: "Cliente eliminado",
            loc_ClienteErrorBorrar: "Error al eliminar el cliente",
            loc_ConfirmarBorrarFichaje: "�Confirmas el borrado del fichaje?",
            loc_FichajeEliminado: "Fichaje eliminado",
            loc_FichajeGuardado: "Fichaje guardado",
            loc_FichajeErrorBorrar: "Error al eliminar el fichaje",
            loc_FichajeErrorGuardar: "Error al guardar el fichaje",
            loc_Borrar: "Borrar",
            loc_Cancelar: "Cancelar",
            loc_AniadirFichaje: "A�adir fichaje",
            loc_Guardar: "Guardar",
            loc_Trabajo: "Trabajo",
            loc_Complementarias: "Complementarias",
            loc_FichajeFueraDeHorario: "El fichaje que quieres a�adir est� fuera de los horarios asignados al vendedor",
            loc_FichajesActualizados: "Fichajes actualizados correctamente",
            loc_FichajesErrorActualizar: "Los fichajes no han podido ser actualizados",
            loc_General: "General",
            loc_Detallado: "Detallado",
            loc_RangoFechas: "Rango de fechas: "
        }
    );
    
    $translateProvider.translations('en', {
        TITLE: 'Hello',
        FOO: 'This is a paragraph.',
        BUTTON_LANG_EN: 'english',
        BUTTON_LANG_DE: 'german'
    });
    $translateProvider.preferredLanguage('es');
});
app.config(function($datepickerProvider) 
{
    var fromTenYears = new Date().setFullYear(new Date().getFullYear() - 10);
   
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd-MM-yyyy',
            startWeek: 1,
            maxDate: new Date(),
            minDate: fromTenYears
        });
});
