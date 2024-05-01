import './style.css'


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
    removeTaskFromGroup(taskId) {
        this.#tasksList.splice(taskId, (taskId + 1))
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
    const loadGroup = (groupId) => {
        const allGroups = loadAllGroups();
        return allGroups[groupId];
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
    const header = (parent, headerType, headerText) => {
        const container = document.createElement(headerType);
        container.textContent = headerText;
        document.querySelector(parent).appendChild(container);
    }
    const task = (taskObject, taskId) => {
        const container = document.querySelector('#task-list-container');

        // Item container
        const taskContainer = document.createElement('div');
        taskContainer.setAttribute('id', `task-${taskId}`);
        taskContainer.classList.add('task-item')

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', `item-${taskId}`);
        checkbox.classList.add('task-item-checkbox')
        checkbox.textContent = 'Delete';
        checkbox.addEventListener('click', groupView.removeTaskContainer)
        taskContainer.appendChild(checkbox);

        // Title
        const taskTitle = document.createElement('div');
        taskTitle.classList.add('task-item-title')
        taskTitle.textContent = taskObject.title;
        taskContainer.appendChild(taskTitle)

        // Description
        const taskDescription = document.createElement('div');
        taskDescription.classList.add('task-item-description')
        taskDescription.textContent = taskObject.description;
        taskContainer.appendChild(taskDescription);

        // Render item
        container.appendChild(taskContainer);
    }
    const group = (groupObject, groupId) => {
        const container = document.querySelector('#group-select-container');

        // Item container
        const groupContainer = document.createElement('div');
        groupContainer.setAttribute('id', `group-${groupId}`);
        groupContainer.classList.add('group-item');

        // Title
        const groupTitle = document.createElement('div');
        groupTitle.textContent = groupObject.groupName;
        groupTitle.setAttribute('id', `groupitem-${groupId}`);
        groupTitle.addEventListener('click', viewSwap.toTasksView);
        groupContainer.appendChild(groupTitle);
        // Render item
        //groupContainer.addEventListener('click', viewSwap.toTasksView);
        container.appendChild(groupContainer);
    }
    return {div, input, button, header, task, group }
})()


const groupView = (() => {
    const createView = (group) => {
        createContainer.div('body', 'div', 'id', 'group-container');
        createContainer.div('#group-container', 'div', 'id', 'header-container');
        createContainer.div('#header-container', 'div', 'id', 'back-button', '<');
        createContainer.header('#header-container', 'h1', group.groupName);
        createContainer.div('#group-container', 'div', 'id', 'new-task-container');
        createContainer.div('#group-container', 'div', 'id', 'task-list-container');
        createContainer.input('#new-task-container', 'title-input', 'Title');
        createContainer.input('#new-task-container', 'description-input', 'Description');
        createContainer.button('#new-task-container', 'Add task', 'add-task');

        // Create tasks list
        const tasks = group.getTasksList();
        for (let task in tasks) {
            createContainer.task(tasks[task], task)
        }
        document.querySelector('#add-task').addEventListener('click', addTaskContainer);
        document.querySelector('#back-button').addEventListener('click', viewSwap.toGroupView)
    }
    const removeView = () => {
        document.querySelector('#group-container').remove();
    }
    const addTaskContainer = () => {
        const currentGroup = storageHandler.loadCurrentGroup();
        const [ title, description ] = Array.from(document.querySelectorAll('input'));

        // Add new task
        const newTask = new Task(title.value, description.value)
        currentGroup.addTaskToGroup(newTask);

        // Reload list view
        removeView();
        createView(currentGroup);
    }
    const removeTaskContainer = (event) => {

        // Get item id
        const checkboxId = event.target.id;
        const [ , itemId ] = checkboxId.split('-')

        // Load item from group
        const currentGroup = storageHandler.loadCurrentGroup();
        currentGroup.removeTaskFromGroup(itemId);

        // Reload list view
        removeView();
        createView(currentGroup);
    }
    return { createView, removeView, addTaskContainer, removeTaskContainer }
})();


const groupSelectView = (() => {
    const createView = () => {
        createContainer.div('body', 'div', 'id', 'group-view-container');
        createContainer.div('#group-view-container', 'div', 'id', 'new-group-container');
        createContainer.input('#new-group-container', 'group-input', 'New group name');
        createContainer.button('#new-group-container', 'Add group', 'add-group');
        createContainer.div('#group-view-container', 'div', 'id', 'group-select-container');
        document.querySelector('#add-group').addEventListener('click', addGroupContainer);
        const groups = storageHandler.loadAllGroups();
        for (let group in groups) {
            createContainer.group(groups[group], group);
        }
    }
    const addGroupContainer = () => {
        const name = document.querySelector('input');
        const newGroup = new Group(name.value);
        storageHandler.addToStorage(newGroup);
        removeView();
        createView();
    }
    const removeView = () => {
        document.querySelector('#group-view-container').remove();
    }
    return { createView, addGroupContainer, removeView }
})();


const viewSwap = (() => {
    const toGroupView = () => {

        // Load current group
        const currentGroup = storageHandler.loadCurrentGroup();
        currentGroup.current = false;

        // Remove view
        groupView.removeView();
        groupSelectView.createView();
    }
    const toTasksView = (event) => {
        const itemId = event.target.id;
        const [ , groupId ] = itemId.split('-');
        const group = storageHandler.loadGroup(groupId);
        group.current = true;
        groupSelectView.removeView();
        groupView.createView(group);
    }
    return { toGroupView, toTasksView }
})();


const setDefaultView = (() => {

    // Create and save default group
    const defaultGroup = new Group('Default');
    defaultGroup.current = true;
    storageHandler.addToStorage(defaultGroup);
    
    // Render default controls
    const loadedGroup = storageHandler.loadCurrentGroup();
    document.addEventListener('DOMContentLoaded', groupView.createView(loadedGroup));
})();