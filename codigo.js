//Obtener los elementos
const formulario = document.querySelector(".formularioTarea");
const inputTarea = document.querySelector(".inputTarea");
const contenedor = document.querySelector(".contenedor-tareas");

let tareas = [];

if(localStorage.getItem("tareas")){
    tareas = JSON.parse(localStorage.getItem('tareas'));
    tareas.forEach(t => renderTarea(t));
}

formulario.addEventListener("submit" ,(event)=>{
    event.preventDefault();
    const texto = inputTarea.value.trim();
    if(texto === '')return;

    const tareaObj={
        texto: texto,
        completada : false
    }
    tareas.push(tareaObj);


    localStorage.setItem("tareas", JSON.stringify(tareas));

    renderTarea(tareaObj);
    inputTarea.value = '';
});

function renderTarea(tarea){
    const nuevaTarea = document.createElement("div");
    nuevaTarea.classList.add("tarea");

    if(tarea.completada){
        nuevaTarea.classList.add("Completada");
    }

    const spanTexto = document.createElement("span");
    spanTexto.textContent = tarea.texto;

    const botonCompletar = document.createElement("button");
    botonCompletar.textContent = "Completada";
    botonCompletar.style.marginLeft="10px";
    botonCompletar.addEventListener('click',()=>{
        tarea.completada = !tarea.completada;

        if(tarea.completada){
            nuevaTarea.classList.add("completada");
        }else{
            nuevaTarea.classList.remove("completada");
        }
        localStorage.setItem('tareas', JSON.stringify(tareas));
    });

    //Boton de eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.style.marginLeft="10px";

    //Escucha del boton eliminar
    botonEliminar.addEventListener('click', ()=>{
        nuevaTarea.remove();
        tareas = tareas.filter(t => t !== tarea);

        //Actualizar el almacenamiento
        localStorage.setItem('tareas', JSON.stringify(tareas));
    });
    nuevaTarea.appendChild(spanTexto);
    nuevaTarea.appendChild(botonCompletar);
    nuevaTarea.appendChild(botonEliminar);
    contenedor.appendChild(nuevaTarea);
}