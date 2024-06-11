//------------------------------FUNCIÓN PARA ASIGNAR UNA ORDEN AL ÍNDICE DE FUNCIONES------------------------------------------------------------
const indiceDeFunciones = () => { //PROMPT PARA QUE EL USUARIO ELIJA UNA OPERACIÓN
    const indiceInput = prompt("Que función deseas realizar? \n"+
                             "1. Ingresar un producto \n" +
                             "2. Buscar un producto \n"+
                             "3. Editar un producto \n"+
                             "4. Borrar un producto \n" +
                             "5. Cantidad de productos registrados");

        if (indiceInput === null) { // CUANDO EL USUARIO PRESIIONA CANCELAR
            despedida();
            return; // TERMINA LA EJECUCIÓN DE LA FUNCIÓN
        }        
        if (indiceInput == "" || (/[^0-9]/.test(indiceInput))){ // CUANDO EL USUARIO NO INGRESA VALOR, O INGRESA LETRAS, ARROJA UNA ALERTA
            alert("Debe ingresar un valor numérico entre el 1 y el 5.");
            indiceDeFunciones();//RETORNA AL INDICE DE FUNCIONES
        }        
    const indice = parseInt(indiceInput); //CONVIERTE EL VALOR INGRESADO EN NUMERO

        if (indice < 1 || indice > 5 ) { //VALIDACIÓN PARA QUE EL INGRESO DE VALOR SEA ENTRE LOS VALORES 1 Y 4 Y NO SEA UN TEXTO O STRING
            alert("Valor inválido, debe ingresar un número entre el 1 y el 5.");
            indiceDeFunciones();
            return;// TERMINA LA EJECUCIÓN DE LA FUNCIÓN
        }  

            switch (indice) { //VALIDACIÓN A INGRESO DE VALOR "1" - REGISTRO DE PRODUCTO
                case 1: {
                    registrarProducto(); //EJECUTO LA FUNCIÓN DE REGISTRAR UN PRODUCTO
                    indiceDeFunciones(); //TERMINADA LA FUNCIÓN DE REGISTRO, VUELVO AL INDICE DE FUNCIONES
                    break;           
                }    
                case 2: { //VALIDACIÓN A INGRESO DE VALOR "2" - BUSQUEDA DE PRODUCTO

                    let idBusqueda = parseInt(prompt("Ingresa el ID del producto que deseas buscar:"));//SOLICITO NUMERO DE ID
                    let indiceProducto = buscarProductoPorID(idBusqueda); //COPIA LOS VALORES DEL PRODUCTO QUE COINCIDA CON LA ID SOLICITADA

                    if (indiceProducto !== null) { //SI EL VALOR DEL ID ES DISTINTO A NULL (SE ENCUENTRA COINCIDENCIA), SE EJECUTA EL IF
                        let productoEncontrado = productos[indiceProducto];//MUESTRA LOS VALORES DEL PRODUCTO QUE LLEVE EL INDEX DEL ID BUSCADO

                            alert( `Producto encontrado: 
                                    ID: ${productoEncontrado.id} 
                                    Descripción: ${productoEncontrado.descripcion}
                                    Nombre: ${productoEncontrado.nombre}
                                    Stock: ${productoEncontrado.stock}
                                    Precio: ${productoEncontrado.precio}`);
                        } else {
                            alert("Producto no encontrado."); //MENSAJE EN CASO DE NO EXISTIR COINCIDENCIA
                        }         
                    indiceDeFunciones(); //TERMINADA LA FUNCIÓN DE BUSQUEDA, VUELVO AL INDICE DE FUNCIONES
                break; 
                }
                case 3: { //VALIDACIÓN A INGRESO DE VALOR "3" - EDICION DE PRODUCTO
                    editarProducto();//EJECUTO LA FUNCIÓN DE EDICIÓN DE UN PRODUCTO
                break; 
                }
                case 4: { //VALIDACIÓN A INGRESO DE VALOR "4" - BORRADO DE PRODUCTO        
                    eliminarProductoPorID(); //EJECUTO LA FUNCIÓN DE BORRADO DE UN PRODUCTO
                break; 
                }  
                case 5: {
                    alert("Existen " + productos.length + " productos registrados. ")
                    indiceDeFunciones(); //TERMINADA LA FUNCIÓN DE BUSQUEDA, VUELVO AL INDICE DE FUNCIONES
                break;
                }   
        }
}
//___________________________________________________________________________________________________________________________________


//------------------------------------ FUNCION PARA INGRESAR VALORES DEL PRODUCTO ------------------------------------------------------------
const registrarProducto = () => {
    // SOLICITA VALORES CON PROMPTS
    const id = parseInt(prompt("Ingresa el ID del producto:"));

        // VERIFICA SI EL ID ES UN NÚMERO Y NO ES UN NULL
        if (isNaN(id) || id === null) {
            alert("El ID debe ser un número válido.");
            return; // SALE DE LA FUNCIÓN SI EL ID NO ES UN ENTERO
        }

        // VERIFICAR SI EXISTE EL ID
        if (buscarProductoPorID(id) !== null) { // UTILIZA EL VALOR DE ID RETORNADO POR LA FUNCION buscarProductoPorID, SI ES NULL, SIGNIFICA QUE NO HUBO COINCIDENCIAS Y EL IF NO SE EJECUTA
            alert("El ID del producto ya existe. No se puede registrar el producto con un mismo ID que otro.");
            return; //ESCAPA DE LA FUNCION SI EXISTE LA ID
        }

    const descripcion = prompt("Ingresa la descripción del producto:");
    const nombre = prompt("Ingresa el nombre del producto:");
    const stock = parseInt(prompt("Ingresa el stock del producto:"));
    const precio = parseFloat(prompt("Ingresa el precio del producto:"));

    const producto = {id, nombre, descripcion, stock, precio}; // ASIGNO AL ARRAY PRODUCTO LOS VALORES INGRESADOS
    productos.push(producto);//AÑADO CON PUSH LOS VALORES DEL ARRAY CREADO AL ARRAY PRODUCTOS
    alert("El producto ha sido añadido con el ID número: " + id);
}
//___________________________________________________________________________________________________________________________________


//------------------------------------------ FUNCION PARA EDITAR UN PRODUCTO ------------------------------------------------------------
const editarProducto = () => {
    
    let idBusqueda = parseInt(prompt("Ingresa el ID del producto que deseas buscar:"));//SOLICITO NUMERO DE ID   
    let indiceProducto = buscarProductoPorID(idBusqueda); 
        if (indiceProducto !== null) {

            let productoEncontrado = productos[indiceProducto]; //ACCEDO A LOS VALORES DEL PRODUCTO EN EL ARRAY MEDIANTE SU INDICE Y MUESTRO SUS VALORES EN UN CONFIRM
            let confirmaEditado = confirm(`Producto encontrado:
                    ID: ${productoEncontrado.id}
                    Descripción: ${productoEncontrado.descripcion}
                    Nombre: ${productoEncontrado.nombre}
                    Stock: ${productoEncontrado.stock}
                    Precio: ${productoEncontrado.precio} 
                    
                    Estos son los datos del producto solicitado.
                    ¿Desea editar los valores?`);

                        if (confirmaEditado == true) { //SI SE ACEPTA EL CONFIRM, PASARÁ A LA FUNCIÓN DE EDITADO DEL PRODUCTO
                            registrarProductoEditado(indiceProducto);                        
                        }
                        else {
                            indiceDeFunciones(); //SI SE CANCELA EL CONFIRM, SE VUELVE AL INDICE DE FUNCIONES
                        }              
        } else {
            alert("Producto no encontrado.");
        }    
    indiceDeFunciones(); 
}
//___________________________________________________________________________________________________________________________________


//------------------------------ FUNCION PARA ELIMINAR UN OBJETO SEGÚN SU ID ------------------------------------------------------------
const eliminarProductoPorID = () => {
    let idBusqueda = parseInt(prompt("Ingresa el ID del producto que deseas buscar:"));//SOLICITO NUMERO DE ID        
    let indiceProducto = buscarProductoPorID(idBusqueda);//IGUALO LOS VALORES RETORNADOS POR LA FUNCION buscarProductoPorID EN LA ID INGRESADA EN idBusqueda
        if (indiceProducto !== null) {//SI HAY COINCIDENCIA, EL VALOR NO SERÁ NULL Y EJECUTARÁ EL IF

            let productoEncontrado = productos[indiceProducto]; //ACCEDO A LOS VALORES DEL PRODUCTO EN EL ARRAY MEDIANTE SU INDICE Y MUESTRO SUS VALORES EN UN CONFIRM
            let confirmaBorrado = confirm(`Producto encontrado: 
                    ID: ${productoEncontrado.id}
                    Descripción: ${productoEncontrado.descripcion}
                    Nombre: ${productoEncontrado.nombre}
                    Stock: ${productoEncontrado.stock}
                    Precio: ${productoEncontrado.precio}
                    
                    DESEA ELIMINAR EL REGISTRO?`);

                        if (confirmaBorrado == true) { //SI SE ACEPTA EL CONFIRM, EL PRODUCTO SE ELIMINARÁ DEL INDEX
                            let idBorrado = productoEncontrado.id; //CREO LA VARIABLE PARA SER MOSTRADA EN UN ALERT SI SE BORRA EL PRODUCTO EXITOSAMENTE
                            productos.splice(indiceProducto, 1);//SPLICE QUE AFECTA SOLO AL ID A BORRAR                            
                                alert("El producto con Nro de ID: " + idBorrado + " ha sido borrado.")//MENSAJE QUE MUESTRA LA ID DEL PRODUCTO BORRADO
                        }
                        else {
                            indiceDeFunciones(); //SI SE CANCELA EL CONFIRM, SE VUELVE AL INDICE DE FUNCIONES
                        }                    
        } else {
            alert("Producto no encontrado.");//SI NO HAY COINCIDENCIA (indiceProducto = NULL), SE MUESTRA ESTE MENSAJE
        }
        indiceDeFunciones(); 
}
//___________________________________________________________________________________________________________________________________


//------------------------------ FUNCION PARA REGISTRAR LOS NUEVOS DATOS A ASIGNAR AL PRODUCTO EDITADO ------------------------------
const registrarProductoEditado = (indiceProducto) => {
    // SOLICITA LOS NUEVOS VALORES MEDIANTE PROMPOTS Y MUESTRA LOS VALORES ANTERIORES  
    const id = productos[indiceProducto].id // MANTIENE EL ID
    const descripcion = prompt("Ingresa la nueva descripción del producto: " + "\n" + 
                               "La descripción anterior es: " + productos[indiceProducto].id);    
    const nombre = prompt("Ingresa el nuevo nombre del producto: " + "\n" + 
                          "El nombre anterior es: " + productos[indiceProducto].nombre);
    const stock = parseFloat(prompt("Ingresa el nuevo stock del producto: " + "\n" + 
                         "El stock anterior es: " + productos[indiceProducto].stock));
    const precio = parseFloat(prompt("Ingresa el nuevo precio del producto: " + "\n" + 
                                     "El precio anterior es: " + productos[indiceProducto].precio));

        // CONFIRM PARA VALIDAR SI SE QUIEREN REGISTRAR LOS CAMBIOS O NO
        let confirmEdita = confirm("Desea confirmar los cambios efectuados?")

            if (confirmEdita == true){
                // ACTUALIZA LAS PROPIEDADES 
                productos[indiceProducto] = {id, nombre, descripcion, stock, precio};
                    // ALERT QUE MUESTRA LOS NUEVOS VALORES ASIGNADOS 
                    alert(`Producto actualizado: 
                    ID: ${productos[indiceProducto].id}
                    Nombre: ${productos[indiceProducto].nombre}
                    Descripción: ${productos[indiceProducto].descripcion}
                    Stock: ${productos[indiceProducto].stock}
                    Precio: ${productos[indiceProducto].precio}`);
            }
            else {
                alert("Los cambios NO han sido efectuados.");//MENSAJE MOSTRADO AL CANCELAR EL CONFIRM DE EDICIÓN
                indiceDeFunciones();// SI SE CANCELA LA CONFIRM, SE VUELVE AL INDICE DE FUNCIONES
            } 
}
//___________________________________________________________________________________________________________________________________


//---------------------------------------- FUNCION PARA BUSCAR PRODUCTO POR ID ---------------------------------------------------
const buscarProductoPorID = (id) => { 
    let index = 0; //ASIGNO EL VALOR DE 0 PARA QUE ITERE DESDE ESA POSICIÓN
    for (let producto of productos) { //RECORRO EL ARRAY PRODUCTOS
        if (producto.id === id) { //COMPARACIÓN ESTRICTA PARA QUE COMPARE MISMO TYPE DEL VALOR
            return producto, index; //RETORNO EL VALOR DEL PRODUCTO QUE COINCIDA CON LA ID SOLICITADA
        }
        index++; // SUMO 1 AL VALOR DE INDEX PARA CONTINUAR EL BUCLE        
    }
    return null; //RETORNO UN NULL SI NO HAY COINCIDENCIA, VALOR QUE SIRVE PARA APLICARLE CONDICIONAL PARA QUE NO SE REPITAN LAS ID    
}
//___________________________________________________________________________________________________________________________________


// --------------------------------------- FUNCION PARA TERMINAR CICLO EN CASO DE CONFIRM FALSE ---------------------------------------
const despedida = () => {    
    alert("Gracias! Hasta luego.");  
}
//___________________________________________________________________________________________________________________________________


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> COMIENZO DEL PROGRAMA <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const productos = []; // ARRAY DONDE SE IRÁN PUSHIANDO LOS PRODUCTOS

indiceDeFunciones(); 

console.log("Productos registrados disponibles: " + productos.length) // MUESTRA LA CANTIDAD DE PRODUCTOS REGISTRADOS
console.table(productos); //MUESTRA LOS PRODUCTOS INGRESADOS EN UNA TABLA

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FIN DEL PROGRAMA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
