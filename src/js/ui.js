const Storage = require('./storage.js');
const Task = require('./task.js');

//Define variables
const createForm = document.querySelector('#create-form'),
      searchField = document.querySelector('#search'),
      priorityField = document.querySelector('#task-priority'),
      statusField = document.querySelector('#task-status'),
      newTaskTitle = document.querySelector('#create-form-title'),
      newTaskDescr = document.querySelector('#create-form-descr'),
      newTaskPriority = document.querySelector('#create-form-priority'),
      tasksContainer = document.querySelector('.tasks'),
      modalWrap = document.querySelector('.modal-wrap'),
      userName = document.querySelector('#app-user-name'),
      userNameField = document.querySelector('#app-user-name-input')

//UI Class
class UI{
    
    //Shows all tasks from LocalStorage and saved user name when app starts
    static appStart(){
        const storeUserName = Storage.getUserName();
        UI.filterTasks();
        userName.innerHTML = storeUserName;
    }
    
    //Show filtered tasks on the page
    static showTasks(task){
            
            //Create the first option for the task menu depending on task status
            const taskStatusOption = task.status === 'done' ? 'open' : 'done';
            const menuEditAvailable = task.status === 'done' ? 'btn-disabled' : '';
            
            //Creating a new DOM-element for a task
            const taskItem = document.createElement('div');
            taskItem.dataset.taskId = task.id;
            taskItem.className = `task-item task-${task.status}`;
            taskItem.innerHTML = 
                `<h4 class="task-title">${task.title}</h4>
                <p class="task-description">${task.descr}</p>
                <div class="task-status">
                    <p class="task-priority">${task.priority}</p>
                    <a href="#" class="task-manage-btn">...</a>
                    <ul class='task-menu'>
                        <li class="task-menu-stat">${taskStatusOption}</li>
                        <li class="task-menu-edit ${menuEditAvailable}">edit</li>
                        <li class="task-menu-del">detele</li>
                    </ul>
                </div>
                `;
            
            //Add a new element to the page
            tasksContainer.appendChild(taskItem);
        
    }
    
    //Add a Task
    static addTask(title, descr, priority, status){
        const tasks = Storage.getTasks();
        const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

        const task = new Task (title, descr, priority, status, id);
        
        return task;
    }
    
    //Save a Task
    static saveTask(){
        const   formAction = createForm.dataset.act,
                title = newTaskTitle.value,
                descr = newTaskDescr.value,
                priority = newTaskPriority.value,
                status = 'open';
        let taskId;
        if(formAction == 'create'){
            const task = UI.addTask(title, descr, priority, status);
            UI.showTasks(task);
            Storage.addTask(task);
        } else {
            taskId = formAction[formAction.length - 1];
            Storage.updateTask(taskId, title, descr, priority, status);
            UI.filterTasks();
        }
        
        UI.closeModalForm();
    }
    
    //Remove a Task
    static removeTask(task){
        task.remove();
    }
    
    //Edit a Task
    static editTask(taskId){
        const task = Storage.getTaskById(taskId).taskItem;
        const title = task.title,
              descr = task.descr,
              priority = task.priority;
        
        newTaskTitle.value = title;
        newTaskDescr.value = descr;
        newTaskPriority.value = priority;
        
        createForm.dataset.act = `edit-Task-${taskId}`;
    }
    
    //Refresh showing tasks
    static tasksRefresh(){
        tasksContainer.innerHTML = '';
        Storage.redefineTaskIds();
    }
    
    // Changing Task status view
    static changeTaskStatus (menuStatusBtn, taskCard){
        const menuEditBtn = menuStatusBtn.nextElementSibling;
        
        if(taskCard.classList.contains('task-open')){
            menuStatusBtn.innerHTML = 'open';
        } else {
            menuStatusBtn.innerHTML = 'done';
        }
        taskCard.classList.toggle('task-open');
        taskCard.classList.toggle('task-done');
        menuEditBtn.classList.toggle('btn-disabled');
        
        UI.openTaskMenu(taskCard);
    }
    
    //Show filtered tasks on the page
    static filterTasks(){
        UI.tasksRefresh();
        UI.resetField(searchField,'');
        const tasks = Storage.getTasks();
        
        // Filter tasks by status and priority
        tasks.forEach((task) => {
            let statusCheck = UI.statusFilter(task);
            if(statusCheck === true){
                let priorityCheck = UI.priorityFilter(task);
                if(priorityCheck === true){
                    UI.showTasks(task);
                }
            }
        });
        
    }
    
    // Filter tasks by status
    static statusFilter(task){
        const statusValue = statusField.value;
        
        if(statusValue === 'all'){
           return true;
        } else if(task.status === statusValue){
            return true;
        } else {
            return false;
        }
        
    }

    // Filter tasks by priority
    static priorityFilter(task){
        const priorityValue = priorityField.value;
        
        if(priorityValue === 'all'){
           return true;
        } else if(task.priority === priorityValue){
            return true;
        } else {
            return false;
        }
    }

    //Searching task by title
    static findTasks(){
        UI.tasksRefresh();
        UI.resetFilters();
        const tasks = Storage.getTasks();
        
        const searchValue = searchField.value.toUpperCase();
        tasks.forEach((task) => {
            if(task.title.toUpperCase().indexOf(searchValue) > -1){
                UI.showTasks(task);
            }
        });
    }
    
    //Reset filters value
    static resetFilters(){
        const filters = [priorityField, statusField];
        filters.forEach((filter) => {
            UI.resetField(filter,'all');
        });
    }
    
    //Reset field value
    static resetField (field, value){
        field.value = value;
    }
    
    //Open/Close Task Menu
    static openTaskMenu(taskCard){
            taskCard.querySelector('.task-menu').classList.toggle('visible');
    }
    
    //Open Create Task Form
    static openModalForm(){
        modalWrap.style.visibility = 'visible';
        modalWrap.style.opacity = '1';
    }
    
    ////Close Create Task Form
    static closeModalForm(){
        modalWrap.style.opacity = '0';
        
        setTimeout(() => {
            modalWrap.style.visibility = 'hidden';
            newTaskTitle.value = '';
            newTaskDescr.value = '';
            newTaskPriority.value = 'high';
        },300);
        
    }
    
    //Change the user name on the bottom of the page
    static changeUserName(){
        const btn = document.querySelector('#footer-edit-btn'),
              userNameValue = userName.innerHTML,
              fieldWidth = getComputedStyle(userName).width;

        btn.classList.toggle('footer-edit-btn-applying');

        if(btn.classList.contains('footer-edit-btn-applying')){
            userNameField.style.cssText = `width: ${fieldWidth}; display: inline-block;`;
            userNameField.value = userNameValue;
            userNameField.focus();
            userName.style.display = 'none';
            btn.innerHTML = 'Apply';
        } else {
            userNameField.style.display = 'none';
            userName.innerHTML = userNameField.value;
            userName.style.display = 'inline-block';
            btn.innerHTML = '<i class="fas fa-pencil-alt"></i> Edit';
            Storage.changeUserName(userNameField.value);
        }
    }
}

module.exports = UI;