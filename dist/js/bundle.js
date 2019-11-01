/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/img/search.png":
/*!****************************!*\
  !*** ./src/img/search.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/search.png\";\n\n//# sourceURL=webpack:///./src/img/search.png?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../sass/main.sass */ \"./src/sass/main.sass\");\r\n__webpack_require__(/*! ../img/search.png */ \"./src/img/search.png\");\r\nconst UI = __webpack_require__(/*! ./ui.js */ \"./src/js/ui.js\");\r\nconst Storage = __webpack_require__(/*! ./storage.js */ \"./src/js/storage.js\");\r\n\r\n// Event show Tasks filtered by 'all', 'all' after document loading\r\nUI.filterTasks();\r\n\r\n//Event Create a new Task\r\ndocument.querySelector('#create-form').addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n    UI.saveTask();\r\n});\r\n\r\n//Event Manage a Task menu\r\ndocument.querySelector('.tasks').addEventListener('click', (e) => {\r\n    e.preventDefault();\r\n    const btn = e.target;\r\n    let taskCard = btn.parentElement.parentElement.parentElement;\r\n    const taskId = taskCard.dataset.taskId;\r\n    \r\n    //Change a Task status\r\n    if(btn.classList.contains('task-menu-stat')){\r\n        UI.changeTaskStatus(btn, taskCard);\r\n        Storage.changeTaskStatus(taskId);\r\n    } else\r\n        \r\n        //Edit a Task\r\n        if(btn.classList.contains('task-menu-edit') && !btn.classList.contains('btn-disabled')){\r\n            UI.editTask(taskId);\r\n            UI.openModalForm();\r\n            UI.openTaskMenu(taskCard);\r\n    } else \r\n        \r\n        //Delete a Task\r\n        if(btn.classList.contains('task-menu-del')){\r\n            UI.removeTask(taskCard);\r\n            Storage.removeTask(taskId);\r\n    } else \r\n        \r\n        //Open/Close Task menu\r\n        if(btn.classList.contains('task-manage-btn')){\r\n            taskCard = btn.parentElement.parentElement;\r\n            UI.openTaskMenu(taskCard);\r\n    }\r\n});\r\n\r\n//Event Filter tasks by status and priority\r\ndocument.querySelector('#task-priority').addEventListener('change', () => {\r\n    UI.filterTasks();\r\n});\r\ndocument.querySelector('#task-status').addEventListener('change', () => {\r\n    UI.filterTasks();\r\n});\r\n\r\n//Event Search task by title\r\ndocument.querySelector('#search-form').addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n    UI.findTasks();\r\n});\r\n\r\n//Event Create a new task\r\n  //Open Task Create Form\r\ndocument.querySelector('#create-btn').addEventListener('click', () => {\r\n    document.querySelector('#create-form').dataset.act = 'create';\r\n    UI.openModalForm();\r\n});\r\n\r\n  //Close Task Create Form\r\ndocument.querySelector('#cancel-btn').addEventListener('click', () => {\r\n    UI.closeModalForm();\r\n});\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//Storage Class\r\nclass Storage{\r\n    \r\n    //Get tasks from LocalStorage\r\n    static getTasks(){\r\n        let tasks;\r\n        if(localStorage.getItem('tasks') === null){\r\n            tasks = [];\r\n        } else {\r\n            tasks = JSON.parse(localStorage.getItem('tasks'));\r\n        }\r\n        return tasks;\r\n    }\r\n    \r\n    //Add task to the LocalStorage\r\n    static addTask(task){\r\n        const tasks = Storage.getTasks();\r\n        tasks.push(task);\r\n        Storage.refreshStorage(tasks);\r\n    }\r\n    \r\n    //Remove task from the LocalStorage\r\n    static removeTask(id){\r\n        const tasks = Storage.getTasks();\r\n        const taskIndex = Storage.getTaskById(id).taskIndex;\r\n        \r\n        tasks.splice(taskIndex, 1);\r\n        Storage.refreshStorage(tasks);\r\n    }\r\n    \r\n    // Update Task Data after editing\r\n    static updateTask(id, title, descr, priority, status){\r\n        const tasks = Storage.getTasks();\r\n        const task = Storage.getTaskById(id).taskItem;\r\n        const taskIndex = Storage.getTaskById(id).taskIndex;\r\n        \r\n        task.title = title;\r\n        task.descr = descr;\r\n        task.priority = priority;\r\n        task.status = status;\r\n        tasks[taskIndex] = task;\r\n        Storage.refreshStorage(tasks);\r\n    }\r\n    \r\n    //Change Task status in the storage\r\n    static changeTaskStatus(id){\r\n        const tasks = Storage.getTasks();\r\n        const task = Storage.getTaskById(id).taskItem;\r\n        const taskIndex = Storage.getTaskById(id).taskIndex;\r\n        const taskStatus = task.status == 'open' ? 'done' : 'open';\r\n        \r\n        task.status = taskStatus;\r\n        tasks[taskIndex] = task;\r\n        Storage.refreshStorage(tasks);\r\n    }\r\n    \r\n    //Get Task by id\r\n    static getTaskById (id){\r\n        const tasks = Storage.getTasks();\r\n        let taskData;\r\n        tasks.forEach((task, index) => {\r\n            if(task.id == id){\r\n                taskData = {taskItem: task, taskIndex: index};\r\n            }\r\n        });\r\n        return taskData;\r\n    }\r\n    \r\n    //Redefine Task Ids to keep them in order\r\n    static redefineTaskIds(){\r\n        const tasks = Storage.getTasks();\r\n        \r\n        tasks.forEach((task,index) => {\r\n                task.id = index +1;\r\n        });\r\n        \r\n        Storage.refreshStorage(tasks);\r\n    }\r\n    \r\n    //Update task data in the LocalStorage\r\n    static refreshStorage(tasks){\r\n        localStorage.setItem('tasks', JSON.stringify(tasks));\r\n    }\r\n}\r\n\r\nmodule.exports = Storage;\n\n//# sourceURL=webpack:///./src/js/storage.js?");

/***/ }),

/***/ "./src/js/task.js":
/*!************************!*\
  !*** ./src/js/task.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Task item Class\r\nclass Task {\r\n    constructor(title, descr, priority, status, id){\r\n        this.title = title;\r\n        this.descr = descr;\r\n        this.priority = priority;\r\n        this.status = status;\r\n        this.id = id;\r\n    }\r\n}\r\n\r\nmodule.exports = Task;\n\n//# sourceURL=webpack:///./src/js/task.js?");

/***/ }),

/***/ "./src/js/ui.js":
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Storage = __webpack_require__(/*! ./storage.js */ \"./src/js/storage.js\");\r\nconst Task = __webpack_require__(/*! ./task.js */ \"./src/js/task.js\");\r\n\r\n//Define variables\r\nconst createForm = document.querySelector('#create-form'),\r\n      searchField = document.querySelector('#search'),\r\n      priorityField = document.querySelector('#task-priority'),\r\n      statusField = document.querySelector('#task-status'),\r\n      newTaskTitle = document.querySelector('#create-form-title'),\r\n      newTaskDescr = document.querySelector('#create-form-descr'),\r\n      newTaskPriority = document.querySelector('#create-form-priority'),\r\n      tasksContainer = document.querySelector('.tasks'),\r\n      modalWrap = document.querySelector('.modal-wrap');\r\n\r\n//UI Class\r\nclass UI{\r\n    \r\n    //Show filtered tasks on the page\r\n    static showTasks(task){\r\n            \r\n            //Create the first option for the task menu depending on task status\r\n            const taskStatusOption = task.status === 'done' ? 'open' : 'done';\r\n            const menuEditAvailable = task.status === 'done' ? 'btn-disabled' : '';\r\n            \r\n            //Creating a new DOM-element for a task\r\n            const taskItem = document.createElement('div');\r\n            taskItem.dataset.taskId = task.id;\r\n            taskItem.className = `task-item task-${task.status}`;\r\n            taskItem.innerHTML = \r\n                `<h4 class=\"task-title\">${task.title}</h4>\r\n                <p class=\"task-description\">${task.descr}</p>\r\n                <div class=\"task-status\">\r\n                    <p class=\"task-priority\">${task.priority}</p>\r\n                    <a href=\"#\" class=\"task-manage-btn\">...</a>\r\n                    <ul class='task-menu'>\r\n                        <li class=\"task-menu-stat\">${taskStatusOption}</li>\r\n                        <li class=\"task-menu-edit ${menuEditAvailable}\">edit</li>\r\n                        <li class=\"task-menu-del\">detele</li>\r\n                    </ul>\r\n                </div>\r\n                `;\r\n            \r\n            //Add a new element to the page\r\n            tasksContainer.appendChild(taskItem);\r\n        \r\n    }\r\n    \r\n    //Add a Task\r\n    static addTask(title, descr, priority, status){\r\n        const tasks = Storage.getTasks();\r\n        const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;\r\n\r\n        const task = new Task (title, descr, priority, status, id);\r\n        \r\n        return task;\r\n    }\r\n    \r\n    //Save a Task\r\n    static saveTask(){\r\n        const   formAction = createForm.dataset.act,\r\n                title = newTaskTitle.value,\r\n                descr = newTaskDescr.value,\r\n                priority = newTaskPriority.value,\r\n                status = 'open';\r\n        let taskId;\r\n        if(formAction == 'create'){\r\n            const task = UI.addTask(title, descr, priority, status);\r\n            UI.showTasks(task);\r\n            Storage.addTask(task);\r\n        } else {\r\n            taskId = formAction[formAction.length - 1];\r\n            Storage.updateTask(taskId, title, descr, priority, status);\r\n            UI.filterTasks();\r\n        }\r\n        \r\n        UI.closeModalForm();\r\n    }\r\n    \r\n    //Remove a Task\r\n    static removeTask(task){\r\n        task.remove();\r\n    }\r\n    \r\n    //Edit a Task\r\n    static editTask(taskId){\r\n        const task = Storage.getTaskById(taskId).taskItem;\r\n        const title = task.title,\r\n              descr = task.descr,\r\n              priority = task.priority;\r\n        \r\n        newTaskTitle.value = title;\r\n        newTaskDescr.value = descr;\r\n        newTaskPriority.value = priority;\r\n        \r\n        createForm.dataset.act = `edit-Task-${taskId}`;\r\n    }\r\n    \r\n    //Refresh showing tasks\r\n    static tasksRefresh(){\r\n        tasksContainer.innerHTML = '';\r\n        Storage.redefineTaskIds();\r\n    }\r\n    \r\n    // Changing Task status view\r\n    static changeTaskStatus (menuStatusBtn, taskCard){\r\n        const menuEditBtn = menuStatusBtn.nextElementSibling;\r\n        \r\n        if(taskCard.classList.contains('task-open')){\r\n            menuStatusBtn.innerHTML = 'open';\r\n        } else {\r\n            menuStatusBtn.innerHTML = 'done';\r\n        }\r\n        taskCard.classList.toggle('task-open');\r\n        taskCard.classList.toggle('task-done');\r\n        menuEditBtn.classList.toggle('btn-disabled');\r\n        \r\n        UI.openTaskMenu(taskCard);\r\n    }\r\n    \r\n    //Show filtered tasks on the page\r\n    static filterTasks(){\r\n        UI.tasksRefresh();\r\n        UI.resetField(searchField,'');\r\n        const tasks = Storage.getTasks();\r\n        \r\n        // Filter tasks by status and priority\r\n        tasks.forEach((task) => {\r\n            let statusCheck = UI.statusFilter(task);\r\n            if(statusCheck === true){\r\n                let priorityCheck = UI.priorityFilter(task);\r\n                if(priorityCheck === true){\r\n                    UI.showTasks(task);\r\n                }\r\n            }\r\n        });\r\n        \r\n    }\r\n    \r\n    // Filter tasks by status\r\n    static statusFilter(task){\r\n        const statusValue = statusField.value;\r\n        \r\n        if(statusValue === 'all'){\r\n           return true;\r\n        } else if(task.status === statusValue){\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n        \r\n    }\r\n\r\n    // Filter tasks by priority\r\n    static priorityFilter(task){\r\n        const priorityValue = priorityField.value;\r\n        \r\n        if(priorityValue === 'all'){\r\n           return true;\r\n        } else if(task.priority === priorityValue){\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    //Searching task by title\r\n    static findTasks(){\r\n        UI.tasksRefresh();\r\n        UI.resetFilters();\r\n        const tasks = Storage.getTasks();\r\n        \r\n        const searchValue = searchField.value.toUpperCase();\r\n        tasks.forEach((task) => {\r\n            if(task.title.toUpperCase().indexOf(searchValue) > -1){\r\n                UI.showTasks(task);\r\n            }\r\n        });\r\n    }\r\n    \r\n    //Reset filters value\r\n    static resetFilters(){\r\n        const filters = [priorityField, statusField];\r\n        filters.forEach((filter) => {\r\n            UI.resetField(filter,'all');\r\n        });\r\n    }\r\n    \r\n    //Reset field value\r\n    static resetField (field, value){\r\n        field.value = value;\r\n    }\r\n    \r\n    //Open/Close Task Menu\r\n    static openTaskMenu(taskCard){\r\n            taskCard.querySelector('.task-menu').classList.toggle('visible');\r\n    }\r\n    \r\n    //Open Create Task Form\r\n    static openModalForm(){\r\n        modalWrap.style.visibility = 'visible';\r\n        modalWrap.style.opacity = '1';\r\n    }\r\n    \r\n    ////Close Create Task Form\r\n    static closeModalForm(){\r\n        modalWrap.style.opacity = '0';\r\n        \r\n        setTimeout(() => {\r\n            modalWrap.style.visibility = 'hidden';\r\n            newTaskTitle.value = '';\r\n            newTaskDescr.value = '';\r\n            newTaskPriority.value = 'high';\r\n        },300);\r\n        \r\n    }\r\n}\r\n\r\nmodule.exports = UI;\n\n//# sourceURL=webpack:///./src/js/ui.js?");

/***/ }),

/***/ "./src/sass/main.sass":
/*!****************************!*\
  !*** ./src/sass/main.sass ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/sass/main.sass?");

/***/ })

/******/ });