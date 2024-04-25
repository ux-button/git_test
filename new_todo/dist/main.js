/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("class Task {\n    constructor(title, description) {\n        this.title = title;\n        this.description = description;\n    }\n}\n\nclass Group {\n    #tasksList = [];\n    #taskQuantity = this.#tasksList.length;\n    current = false;\n    constructor(groupName) {\n        this.groupName = groupName;\n    }\n    getTasksQuantity() {\n        return this.#taskQuantity;\n    }\n    getTasksList() {\n        return this.#tasksList;\n    }\n    getTaskFromGroup(taskName) {\n        const [ task ] = this.#tasksList.filter((task) => task === taskName)\n        return task;\n    }\n    addTaskToGroup(task) {\n        this.#tasksList.push(task);\n    }\n}\n\nconst storageHandler = (() => {\n    let storage = [];\n    const addToStorage = (group) => {\n        storage.push(group)\n    }\n    const loadAllGroups = () => {\n        return storage;\n    }\n    const loadGroup = (name) => {\n        const allGroups = loadAllGroups();\n        const [ foundGroup ] = allGroups.filter((group) => group.current === name)\n        return foundGroup;\n    }\n    const loadCurrentGroup = () => {\n        const allGroups = loadAllGroups();\n        const [ currentGroup ] = allGroups.filter((group) => group.current === true)\n        return currentGroup;\n    }\n    return { addToStorage, loadAllGroups, loadGroup, loadCurrentGroup }\n})();\n\n\nconst createContainer = (() => {\n    const div = (parent, type, name, value, text='') => {\n        const container = document.createElement(type);\n        container.setAttribute(name, value);\n        container.textContent = text;\n        document.querySelector(parent).appendChild(container);\n    }\n    const input = (parent, idName, placeholder) => {\n        const container = document.createElement('input');\n        container.setAttribute('id', idName)\n        container.setAttribute('placeholder', placeholder);\n        container.setAttribute('autofocus', '');\n        container.setAttribute('autocomplete', 'off');\n        container.setAttribute('type', 'text');\n        container.setAttribute('name', 'task-name');\n        document.querySelector(parent).appendChild(container);\n    }\n    const button = (parent, textOnButton, idName) => {\n        const container = document.createElement('button');\n        container.setAttribute('id', idName);\n        container.textContent = textOnButton;\n        document.querySelector(parent).appendChild(container);\n    }\n    const header = (parent, headerType, headerText, idName) => {\n        const container = document.createElement(headerType);\n        container.setAttribute('id', idName);\n        container.textContent = headerText;\n        document.querySelector(parent).appendChild(container);\n    }\n    const task = (taskObject) => {\n        const container = document.querySelector('#task-list-container');\n        const taskContainer = document.createElement('div');\n        const taskTitle = document.createElement('div');\n        taskTitle.textContent = taskObject.title;\n        taskContainer.appendChild(taskTitle)\n        const taskDescription = document.createElement('div');\n        taskDescription.textContent = taskObject.description;\n        taskContainer.appendChild(taskDescription)\n        container.appendChild(taskContainer);\n    }\n    return {div, input, button, header, task}\n})()\n\n\n// Render default controls and group render\nconst domReadyHandler = (() => {\n    // Render default controls\n    document.addEventListener('DOMContentLoaded', () => {\n        createContainer.div('body', 'div', 'id', 'new-task-container');\n        createContainer.div('body', 'div', 'id', 'task-list-container');\n        createContainer.input('#new-task-container', 'title-input', 'Title');\n        createContainer.input('#new-task-container', 'description-input', 'Description');\n        createContainer.button('#new-task-container', 'Add task', 'add-task')\n        document.querySelector('#add-task').addEventListener('click', addTask);\n    })\n    // Save default group\n    const defaultGroup = new Group('Default');\n    defaultGroup.current = true;\n    storageHandler.addToStorage(defaultGroup);\n    // Load group\n    const currentGroup = storageHandler.loadCurrentGroup();\n    // Render header\n    createContainer.header('body', 'h1', currentGroup.groupName, `group-${currentGroup.groupName}`);\n})();\n\n\nconst renderTasksList = (groupObject) => {\n    const tasks = groupObject.getTasksList();\n    for (let task of tasks) {\n        createContainer.task(task)\n    }\n}\n\n// Create new task\nconst addTask = () => {\n    // Load current group\n    const currentGroup = storageHandler.loadCurrentGroup();\n    const [ title, description ] = Array.from(document.querySelectorAll('input'));\n    // Add new task\n    const newTask = new Task(title.value, description.value)\n    currentGroup.addTaskToGroup(newTask);\n    renderTasksList(currentGroup)\n    //createContainer.task(newTask);\n}\n\n//# sourceURL=webpack://new_todo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;