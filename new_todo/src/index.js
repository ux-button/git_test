class Task {
    #taskName;
    constructor(name) {
        this.#taskName = name;
    }
    getTaskName() {
        return this.#taskName;
    }
    setTaskName(value) {
        this.#taskName = value;
    }
}


class Group {
    #tasksList = [];
    #taskQuantity = this.#tasksList.length;
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


class Render {
    renderTask(task) { 
    }
    renderContainer(parent, type, name, value) {
        const container = document.createElement(type);
        container.setAttribute(name, value);
        document.querySelector(parent).appendChild(container);
    }
    renderInput(parent, idName) {
        const container = document.createElement('input');
        container.setAttribute('id', idName)
        container.setAttribute('placeholder', 'What to do?');
        container.setAttribute('autofocus', '');
        container.setAttribute('autocomplete', 'off');
        container.setAttribute('type', 'text');
        container.setAttribute('name', 'task-name');
        document.querySelector(parent).appendChild(container);
    }
    renderButton(parent, textOnButton, idName) {
        const container = document.createElement('button');
        container.setAttribute('id', idName);
        container.textContent = textOnButton;
        document.querySelector(parent).appendChild(container);
    }
    renderHeader(parent, headerType, headerText, idName) {
        const container = document.createElement(headerType);
        container.setAttribute('id', idName);
        container.textContent = headerText;
        document.querySelector(parent).appendChild(container);
    }
}


// Create storage
const storageHandler = (() => {
    let storage = [];
    const getStorage = () => {
        return storage;
    }
    const addToStorage = (group) => {
        storage.push(group)
    }
    return { getStorage, addToStorage }
})();


// Default controls and group render
const domReadyHandler = (() => {
    // Render default controls
    const container = new Render();
    document.addEventListener('DOMContentLoaded', () => {
        container.renderContainer('body', 'div', 'id', 'new-task-container');
        container.renderContainer('body', 'div', 'id', 'task-list-container');
        container.renderInput('#new-task-container', 'task-input');
        container.renderButton('#new-task-container', 'Add task', 'add-task')
    })
    // Render default group
    const areaGroupName = 'Default';
    const defaultGroup = new Group(areaGroupName);
    storageHandler.addToStorage(defaultGroup);
    container.renderHeader('body', 'h1', areaGroupName, areaGroupName);
})();