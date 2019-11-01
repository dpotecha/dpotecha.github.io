//Storage Class
class Storage{
    
    //Get tasks from LocalStorage
    static getTasks(){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
    
    //Add task to the LocalStorage
    static addTask(task){
        const tasks = Storage.getTasks();
        tasks.push(task);
        Storage.refreshStorage(tasks);
    }
    
    //Remove task from the LocalStorage
    static removeTask(id){
        const tasks = Storage.getTasks();
        const taskIndex = Storage.getTaskById(id).taskIndex;
        
        tasks.splice(taskIndex, 1);
        Storage.refreshStorage(tasks);
    }
    
    // Update Task Data after editing
    static updateTask(id, title, descr, priority, status){
        const tasks = Storage.getTasks();
        const task = Storage.getTaskById(id).taskItem;
        const taskIndex = Storage.getTaskById(id).taskIndex;
        
        task.title = title;
        task.descr = descr;
        task.priority = priority;
        task.status = status;
        tasks[taskIndex] = task;
        Storage.refreshStorage(tasks);
    }
    
    //Change Task status in the storage
    static changeTaskStatus(id){
        const tasks = Storage.getTasks();
        const task = Storage.getTaskById(id).taskItem;
        const taskIndex = Storage.getTaskById(id).taskIndex;
        const taskStatus = task.status == 'open' ? 'done' : 'open';
        
        task.status = taskStatus;
        tasks[taskIndex] = task;
        Storage.refreshStorage(tasks);
    }
    
    //Get Task by id
    static getTaskById (id){
        const tasks = Storage.getTasks();
        let taskData;
        tasks.forEach((task, index) => {
            if(task.id == id){
                taskData = {taskItem: task, taskIndex: index};
            }
        });
        return taskData;
    }
    
    //Redefine Task Ids to keep them in order
    static redefineTaskIds(){
        const tasks = Storage.getTasks();
        
        tasks.forEach((task,index) => {
                task.id = index +1;
        });
        
        Storage.refreshStorage(tasks);
    }
    
    //Update task data in the LocalStorage
    static refreshStorage(tasks){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    //Get username from localStorage if it exists, otherwise return default name value
    static getUserName (){
        let userName;
        if(localStorage.getItem('name') != null){
            userName = JSON.parse(localStorage.getItem('name'));
        } else {
            userName = 'Denis Potecha'
        }
        return userName;
    }
    
    // Update username in localStorage after its changing
    static changeUserName (userName){
        localStorage.setItem('name', JSON.stringify(userName));
    }
}

module.exports = Storage;