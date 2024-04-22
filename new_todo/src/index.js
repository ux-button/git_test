class Task {
    constructor(taskName) {
        this.taskName = taskName;
    }

    get taskName() {
        return this._taskName;
    }

    set taskName(value) {
        this._taskName = value;
    }
}

class TasksGroup {
    constructor(name) {
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}

class TaskStorage {
    constructor() {
        this.storage = [];
    }

    get storage() {
        return this._storage;
    }

    set storage(value) {
        this._storage = value;
    }

    addTaskToStorage(task) {
        this.storage.push(task);
    }
}
const oneStorage = new TaskStorage();

const firstTask = new Task('Go play some games!');
const secondTask = new Task('What next');

oneStorage.addTaskToStorage(secondTask)

console.log(oneStorage)
oneStorage.storage.map((x) => console.log(x._taskName))