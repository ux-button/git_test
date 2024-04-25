class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

class Group {
    #tasksList = [];
    #taskQuantity = this.#tasksList.length;
    current = false;
    constructor(groupName) {
        this.groupName = groupName;
    }
    getTasksQuantity() {
        return this.#taskQuantity;
    }
    getTasksList() {
        return this.#tasksList;
    }
    getTaskFromGroup(taskName) {
        const [ task ] = this.#tasksList.filter((task) => task === taskName)
        return task;
    }
    addTaskToGroup(task) {
        this.#tasksList.push(task);
    }
}

const storageHandler = (() => {
    let storage = [];
    const addToStorage = (group) => {
        storage.push(group)
    }
    const loadAllGroups = () => {
        return storage;
    }
    const loadGroup = (name) => {
        const allGroups = loadAllGroups();
        const [ foundGroup ] = allGroups.filter((group) => group.current === name)
        return foundGroup;
    }
    const loadCurrentGroup = () => {
        const allGroups = loadAllGroups();
        const [ currentGroup ] = allGroups.filter((group) => group.current === true)
        return currentGroup;
    }
    return { addToStorage, loadAllGroups, loadGroup, loadCurrentGroup }
})();


const createContainer = (() => {
    const div = (parent, type, name, value, text='') => {
        const container = document.createElement(type);
        container.setAttribute(name, value);
        container.textContent = text;
        document.querySelector(parent).appendChild(container);
    }
    const input = (parent, idName, placeholder) => {
        const container = document.createElement('input');
        container.setAttribute('id', idName)
        container.setAttribute('placeholder', placeholder);
        container.setAttribute('autofocus', '');
        container.setAttribute('autocomplete', 'off');
        container.setAttribute('type', 'text');
        container.setAttribute('name', 'task-name');
        document.querySelector(parent).appendChild(container);
    }
    const button = (parent, textOnButton, idName) => {
        const container = document.createElement('button');
        container.setAttribute('id', idName);
        container.textContent = textOnButton;
        document.querySelector(parent).appendChild(container);
    }
    const header = (parent, headerType, headerText, idName) => {
        const container = document.createElement(headerType);
        container.setAttribute('id', idName);
        container.textContent = headerText;
        document.querySelector(parent).appendChild(container);
    }
    const task = (taskObject) => {
        const container = document.querySelector('#task-list-container');
        const taskContainer = document.createElement('div');
        const taskTitle = document.createElement('div');
        taskTitle.textContent = taskObject.title;
        taskContainer.appendChild(taskTitle)
        const taskDescription = document.createElement('div');
        taskDescription.textContent = taskObject.description;
        taskContainer.appendChild(taskDescription)
        container.appendChild(taskContainer);
    }
    return {div, input, button, header, task}
})()


// Render default controls and group render
const domReadyHandler = (() => {
    // Render default controls
    document.addEventListener('DOMContentLoaded', () => {
        createContainer.div('body', 'div', 'id', 'new-task-container');
        createContainer.div('body', 'div', 'id', 'task-list-container');
        createContainer.input('#new-task-container', 'title-input', 'Title');
        createContainer.input('#new-task-container', 'description-input', 'Description');
        createContainer.button('#new-task-container', 'Add task', 'add-task')
        document.querySelector('#add-task').addEventListener('click', addTask);
    })
    // Save default group
    const defaultGroup = new Group('Default');
    defaultGroup.current = true;
    storageHandler.addToStorage(defaultGroup);
    // Load group
    const currentGroup = storageHandler.loadCurrentGroup();
    // Render header
    createContainer.header('body', 'h1', currentGroup.groupName, `group-${currentGroup.groupName}`);
})();


const renderTasksList = (groupObject) => {
    const tasks = groupObject.getTasksList();
    for (let task of tasks) {
        createContainer.task(task)
    }
}

// Create new task
const addTask = () => {
    // Load current group
    const currentGroup = storageHandler.loadCurrentGroup();
    const [ title, description ] = Array.from(document.querySelectorAll('input'));
    // Add new task
    const newTask = new Task(title.value, description.value)
    currentGroup.addTaskToGroup(newTask);
    renderTasksList(currentGroup)
    //createContainer.task(newTask);
}