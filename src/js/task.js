// Task item Class
class Task {
    constructor(title, descr, priority, status, id){
        this.title = title;
        this.descr = descr;
        this.priority = priority;
        this.status = status;
        this.id = id;
    }
}

module.exports = Task;