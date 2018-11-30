/*jshint esversion: 6 */
//<i class="far fa-times-circle"></i>
class Task { //clase Tareas
    constructor (name){
        this.name = name;
        this.isComplete = false; //si la tarea esta completada cambia a true
    }
    complete(){
        this.isComplete = !this.isComplete; //el nuevo valor va a ser el opuesto al anterior
    }   //LO UNICO QUE HACE ES CAMBIAR AL ATRIBUTO BOOLEANOS
}

class TaskList { //lista de tareas
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    addTask(task, element){ //agrega una tarea a la lista
        this.tasks.push(task);
        this.renderTasks(element);
    }

    removeTask(i, element){ //elimina una taria de la lista
        this.tasks.splice(i, 1);
        this.renderTasks(element);
    }

    renderTasks(element){
        let tasks = this.tasks.map(task => `
        <li class="task ${task.isComplete ? 'complete' : ''}">
            <input type="checkbox" 
            class="task__complete-button"
            ${task.isComplete ? 'checked' : '' }
            >
            <span class="task__name" >${task.name}</span>
            <a href="#" class="task__remove-button">x</a>
        </li>
        `);
        element.innerHTML = tasks.reduce((a,b) => a + b, ''); //innerHTMl significa que lo ingreda dentro del html
    }
}

//TRABAJAR CON EL DOM
//Element por convencion es un elemento html
const addTaskElement = document.getElementById('add-task');
const tasksContainerElement = document.getElementById('tasks-container'); //del documento html obtenga el elemento con id 'tasks-container'
const inbox = new TaskList('inbox');

//Añadir tarea desde el DOM
function addDOMTask (e, list = inbox){
    //obtener el texto del input
    if (e.key === 'Enter'){
        //crear la tarea instanciando la clase
        let task = new Task(this.value); //this es el elemento en el que fue ejecutado, en este caso el valor del input
        //añadir la tarea a la lista
        list.addTask(task, tasksContainerElement);
        //borrar texto del input
        this.value = "";
    }
}
addTaskElement.addEventListener('keyup', addDOMTask); //el navegador esta atento al evento de soltar una tecla

//obtener indice de la tarea actual
function getTaskIndex(e){
    let taskItem = e.target.parentElement; // el elemennto de la tarea
    let tasksItems = [...tasksContainerElement.querySelectorAll('li')]; //array completo de tareas
    //query selector es como un selector en CSS
    return tasksItems.indexOf(taskItem); //cual es el indice?
}

//Elimiar tarea desde el DOM, usando delegacion de evetos para borrar cada task
function removeDOMtask(e, list = inbox){
    if (e.target.tagName === 'A'){ //se esta haciendo click en elemento enlace?
        //remover tarea de la lista (se necesita el indice)
        list.removeTask(getTaskIndex(e), tasksContainerElement);
    }
}   
//"escucha" el contenedor de los items, este evento se hace una vez
tasksContainerElement.addEventListener('click', removeDOMtask);


//Completar la tarea

function completeDOMtask(e, list = inbox) {
    if (e.target.tagName === 'INPUT') { //se esta haciendo click en el input (checkbox)?
        //completar la tarea
        list.tasks[getTaskIndex(e)].complete();
        e.target.parentElement.classList.toggle('complete'); //togle añade o quita una clase
    }
}
//"escucha" el contenedor de los items, este evento se hace una vez
tasksContainerElement.addEventListener('click', completeDOMtask);
