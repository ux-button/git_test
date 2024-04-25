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
    addTaskToList(task) {
        this.#tasksList.push(task);
    }
}


const createContainer = (() => {
    const div = (parent, type, name, value) => {
        const container = document.createElement(type);
        container.setAttribute(name, value);
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
    return {div, input, button, header}
})()


// Create storage
const storageHandler = (() => {
    let storage = [];
    const getStorage = () => {
        return storage;
    }
    const addToStorage = (group) => {
        storage.push(group)
    }
    const loadCurrentGroup = () => {
        const allGroups = getStorage();
        const [ currentGroup ]  = allGroups.filter((group) => group.current === true)
        return currentGroup;
    }
    return { getStorage, addToStorage, loadCurrentGroup }
})();


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


// Create new task
const addTask = () => {
    const currentGroup = storageHandler.loadCurrentGroup();
    const [ title, description ] = Array.from(document.querySelectorAll('input'));
    const newTask = new Task(title.value, description.value)
    currentGroup.addTaskToList(newTask);
    console.log(currentGroup)
}