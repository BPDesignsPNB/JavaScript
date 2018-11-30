'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
//<i class="far fa-times-circle"></i>
var Task = function () {
    //clase Tareas
    function Task(name) {
        _classCallCheck(this, Task);

        this.name = name;
        this.isComplete = false; //si la tarea esta completada cambia a true
    }

    _createClass(Task, [{
        key: 'complete',
        value: function complete() {
            this.isComplete = !this.isComplete; //el nuevo valor va a ser el opuesto al anterior
        } //LO UNICO QUE HACE ES CAMBIAR AL ATRIBUTO BOOLEANOS

    }]);

    return Task;
}();

var TaskList = function () {
    //lista de tareas
    function TaskList(name) {
        _classCallCheck(this, TaskList);

        this.name = name;
        this.tasks = [];
    }

    _createClass(TaskList, [{
        key: 'addTask',
        value: function addTask(task, element) {
            //agrega una tarea a la lista
            this.tasks.push(task);
            this.renderTasks(element);
        }
    }, {
        key: 'removeTask',
        value: function removeTask(i, element) {
            //elimina una taria de la lista
            this.tasks.splice(i, 1);
            this.renderTasks(element);
        }
    }, {
        key: 'renderTasks',
        value: function renderTasks(element) {
            var tasks = this.tasks.map(function (task) {
                return '\n        <li class="task ' + (task.isComplete ? 'complete' : '') + '">\n            <input type="checkbox" \n            class="task__complete-button"\n            ' + (task.isComplete ? 'checked' : '') + '\n            >\n            <span class="task__name" >' + task.name + '</span>\n            <a href="#" class="task__remove-button">x</a>\n        </li>\n        ';
            });
            element.innerHTML = tasks.reduce(function (a, b) {
                return a + b;
            }, ''); //innerHTMl significa que lo ingreda dentro del html
        }
    }]);

    return TaskList;
}();

//TRABAJAR CON EL DOM
//Element por convencion es un elemento html


var addTaskElement = document.getElementById('add-task');
var tasksContainerElement = document.getElementById('tasks-container'); //del documento html obtenga el elemento con id 'tasks-container'
var inbox = new TaskList('inbox');

//Añadir tarea desde el DOM
function addDOMTask(e) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

    //obtener el texto del input
    if (e.key === 'Enter') {
        //crear la tarea instanciando la clase
        var task = new Task(this.value); //this es el elemento en el que fue ejecutado, en este caso el valor del input
        //añadir la tarea a la lista
        list.addTask(task, tasksContainerElement);
        //borrar texto del input
        this.value = "";
    }
}
addTaskElement.addEventListener('keyup', addDOMTask); //el navegador esta atento al evento de soltar una tecla

//obtener indice de la tarea actual
function getTaskIndex(e) {
    var taskItem = e.target.parentElement; // el elemennto de la tarea
    var tasksItems = [].concat(_toConsumableArray(tasksContainerElement.querySelectorAll('li'))); //array completo de tareas
    //query selector es como un selector en CSS
    return tasksItems.indexOf(taskItem); //cual es el indice?
}

//Elimiar tarea desde el DOM, usando delegacion de evetos para borrar cada task
function removeDOMtask(e) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

    if (e.target.tagName === 'A') {
        //se esta haciendo click en elemento enlace?
        //remover tarea de la lista (se necesita el indice)
        list.removeTask(getTaskIndex(e), tasksContainerElement);
    }
}
//"escucha" el contenedor de los items, este evento se hace una vez
tasksContainerElement.addEventListener('click', removeDOMtask);

//Completar la tarea

function completeDOMtask(e) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

    if (e.target.tagName === 'INPUT') {
        //se esta haciendo click en el input (checkbox)?
        //completar la tarea
        list.tasks[getTaskIndex(e)].complete();
        e.target.parentElement.classList.toggle('complete'); //togle añade o quita una clase
    }
}
//"escucha" el contenedor de los items, este evento se hace una vez
tasksContainerElement.addEventListener('click', completeDOMtask);