const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
//Aqui seleccionamos elementos del html para poder manipularlos con JavaScript, los selecionamos a traves del ID que le hayamos asignado .

const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
//Las clases de estilos.

let LIST
//Para almacenar las tareas en un Array.

let id // para que inicie en 0 cada tarea tendra un id diferente.


//creacion de fecha actualizada .
const FECHA = new Date () 
fecha.innerHTML = FECHA.toLocaleDateString('es-ES',{weekday: 'long', month: 'short', day:'numeric'}) //Para obtener la fecha, de España.


// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // Si la tarea está eliminada, no se añade.

    const REALIZADO = realizado ? check : uncheck //Depende de si esta completada usa 'check' o 'uncheck'. 

    const LINE = realizado ? lineThrough : '' //En caso de estar realizada, añade el 'lineThrough'.

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)//Añade la tarea a la lista.

}


// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)//Alterna entre 'Check' y 'UnCheck'.
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)//Tacha el texto.
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //Cambia el estado en la lista.
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)//Borra el elemento.
    LIST[element.id].eliminado = true//Cambia el estado a eliminado.
    console.log(LIST)//Actualiza el Listado.
}

 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))// Guarda en localStorage.
        id++
        input.value = '' // Limpia el campo de texto.
    }

})

botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({ nombre: tarea, id, realizado: false, eliminado: false })
        localStorage.setItem('TODO', JSON.stringify(LIST)) // Guarda en localStorage.
        id++
        input.value = '' // Limpia el campo de texto.
    }
})

document.addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
        const tarea = input.value
        if (tarea) {
            agregarTarea(tarea, id, false, false)
            LIST.push({ nombre: tarea, id, realizado: false, eliminado: false })
            localStorage.setItem('TODO', JSON.stringify(LIST))
            input.value = ''
            id++
        }
    }
})


lista.addEventListener('click',function(event){
    const element = event.target //Elemento al que he hecho CLick
    const elementData = element.attributes.data.value // Obtiene su atributo 'data'.
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))// Actualiza el almacenamiento.
})

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)// Convierte el string almacenado en un array.
    console.log(LIST)
    id = LIST.length// Actualiza el id.
    cargarLista(LIST)// Vuelve a mostrar las tareas.
}else {
    LIST = []
    id = 0
}

function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}