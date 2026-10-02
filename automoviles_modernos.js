/*----------------------------------------*/
/*--|funcionalidad_automoviles_modernos|--*/
/*----------------------------------------*/
const automoviles = document.querySelectorAll(".automovil");
const botonRestablecer = document.getElementById("boton_restablecer");
const mensajeGeneral = document.getElementById("mensaje_general");
const datosIniciales = {
    1: {
        nombre: "Porsche 911",
        marca: "Porsche",
        anio: 2025,
        precio: "$850.000.000"
    },
    2: {
        nombre: "Tesla Model 3",
        marca: "Tesla",
        anio: 2025,
        precio: "$220.000.000"
    },
    3: {
        nombre: "Range Rover",
        marca: "Land Rover",
        anio: 2025,
        precio: "$650.000.000"
    }
};
/*----------------------------------------*/
/*--|obtener_los_datos_del_localstorage|--*/
/*----------------------------------------*/
function obtenerDatos(id) {
    const datosGuardados = localStorage.getItem(`automovil_${id}`);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales[id];
}
/*---------------------------------*/
/*--|mostrar_datos_en_la_tarjeta|--*/
/*---------------------------------*/
function mostrarDatos(automovil) {
    const id = automovil.dataset.id;
    const datos = obtenerDatos(id);
    automovil.querySelector(".campo_nombre").value = datos.nombre;
    automovil.querySelector(".campo_marca").value = datos.marca;
    automovil.querySelector(".campo_anio").value = datos.anio;
    automovil.querySelector(".campo_precio").value = datos.precio;
    automovil.querySelector(".nombre_auto").textContent = datos.nombre;
}
/*-----------------------------------------------------------------*/
/*--|guardar_y_restaurar_los_datos_del_automovil_en_localstorage|--*/
/*-----------------------------------------------------------------*/
function guardarDatos(automovil) {
    const id = automovil.dataset.id;
    const nombre = automovil.querySelector(".campo_nombre").value;
    const marca = automovil.querySelector(".campo_marca").value;
    const anio = automovil.querySelector(".campo_anio").value;
    const precio = automovil.querySelector(".campo_precio").value;
    const datos = {
        nombre: nombre,
        marca: marca,
        anio: anio,
        precio: precio
    };
    localStorage.setItem(`automovil_${id}`, JSON.stringify(datos));
    automovil.querySelector(".nombre_auto").textContent = nombre;
    mostrarMensaje(automovil, "Información guardada correctamente.");
}
function restaurarDatos(automovil) {
    const id = automovil.dataset.id;
    localStorage.removeItem(`automovil_${id}`);
    mostrarDatos(automovil);
    mostrarMensaje(automovil, "Información restaurada.");
}
/*------------------------------------*/
/*--|mostrar_los_mensaje_individual|--*/
/*------------------------------------*/
function mostrarMensaje(automovil, texto) {
    const mensaje = automovil.querySelector(".mensaje_auto");
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000);
}
/*--------------------------------------------------*/
/*--|restablecer_todos_los_autos_con_localstorage|--*/
/*--------------------------------------------------*/
function restablecerTodos() {
    const confirmacion = confirm("¿Deseas restablecer todos los automóviles?");
    if (!confirmacion) {
        return;
    }
    automoviles.forEach((automovil) => {
        const id = automovil.dataset.id;
        localStorage.removeItem(`automovil_${id}`);
        mostrarDatos(automovil);
    });
    mensajeGeneral.textContent = "Todos los automóviles fueron restablecidos.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2000);
}
/*------------------------------------*/
/*--|eventos_de_los_botones|----------*/
/*------------------------------------*/
automoviles.forEach((automovil) => {
    const botonGuardar = automovil.querySelector(".boton_guardar");
    const botonRestaurar = automovil.querySelector(".boton_restaurar");
    botonGuardar.addEventListener("click", () => {
        guardarDatos(automovil);
    });
    botonRestaurar.addEventListener("click", () => {
        restaurarDatos(automovil);
    });
});
botonRestablecer.addEventListener("click", restablecerTodos);
/*--------------------------------*/
/*--|cargar_los_datos_guardados|--*/
/*--------------------------------*/
function cargarDatos() {
    automoviles.forEach((automovil) => {
        mostrarDatos(automovil);
    });
}
cargarDatos();