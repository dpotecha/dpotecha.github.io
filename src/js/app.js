require('../sass/main.sass');
const UI = require('./ui.js');
const Storage = require('./storage.js');

// Event show Tasks filtered by 'all', 'all' after document loading
UI.filterTasks();

//Event Create a new Task
document.querySelector('#create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    UI.saveTask();
});

//Event Manage a Task menu
document.querySelector('.tasks').addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.target;
    let taskCard = btn.parentElement.parentElement.parentElement;
    const taskId = taskCard.dataset.taskId;
    
    //Change a Task status
    if(btn.classList.contains('task-menu-stat')){
        UI.changeTaskStatus(btn, taskCard);
        Storage.changeTaskStatus(taskId);
    } else
        
        //Edit a Task
        if(btn.classList.contains('task-menu-edit') && !btn.classList.contains('btn-disabled')){
            UI.editTask(taskId);
            UI.openModalForm();
            UI.openTaskMenu(taskCard);
    } else 
        
        //Delete a Task
        if(btn.classList.contains('task-menu-del')){
            UI.removeTask(taskCard);
            Storage.removeTask(taskId);
    } else 
        
        //Open/Close Task menu
        if(btn.classList.contains('task-manage-btn')){
            taskCard = btn.parentElement.parentElement;
            UI.openTaskMenu(taskCard);
    }
});

//Event Filter tasks by status and priority
document.querySelector('#task-priority').addEventListener('change', () => {
    UI.filterTasks();
});
document.querySelector('#task-status').addEventListener('change', () => {
    UI.filterTasks();
});

//Event Search task by title
document.querySelector('#search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    UI.findTasks();
});

//Event Create a new task
  //Open Task Create Form
document.querySelector('#create-btn').addEventListener('click', () => {
    document.querySelector('#create-form').dataset.act = 'create';
    UI.openModalForm();
});

  //Close Task Create Form
document.querySelector('#cancel-btn').addEventListener('click', () => {
    UI.closeModalForm();
});