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

eval("class Task {\n    #taskName;\n    constructor(name) {\n        this.#taskName = name;\n    }\n    getTaskName() {\n        return this.#taskName;\n    }\n    setTaskName(value) {\n        this.#taskName = value;\n    }\n}\n\n\nclass Group {\n    #tasksList = [];\n    #taskQuantity = this.#tasksList.length;\n    constructor(groupName) {\n        this.groupName = groupName;\n    }\n    getTasksQuantity() {\n        return this.#taskQuantity;\n    }\n    getTasksList() {\n        return this.#tasksList;\n    }\n    addTaskToList(task) {\n        this.#tasksList.push(task);\n    }\n}\n\n\nclass Render {\n    renderTask(task) { \n    }\n    renderContainer(parent, type, name, value) {\n        const container = document.createElement(type);\n        container.setAttribute(name, value);\n        document.querySelector(parent).appendChild(container);\n    }\n    renderInput(parent, idName) {\n        const container = document.createElement('input');\n        container.setAttribute('id', idName)\n        container.setAttribute('placeholder', 'What to do?');\n        container.setAttribute('autofocus', '');\n        container.setAttribute('autocomplete', 'off');\n        container.setAttribute('type', 'text');\n        container.setAttribute('name', 'task-name');\n        document.querySelector(parent).appendChild(container);\n    }\n    renderButton(parent, textOnButton, idName) {\n        const container = document.createElement('button');\n        container.setAttribute('id', idName);\n        container.textContent = textOnButton;\n        document.querySelector(parent).appendChild(container);\n    }\n    renderHeader(parent, headerType, headerText, idName) {\n        const container = document.createElement(headerType);\n        container.setAttribute('id', idName);\n        container.textContent = headerText;\n        document.querySelector(parent).appendChild(container);\n    }\n}\n\n\n// Create storage\nconst storageHandler = (() => {\n    let storage = [];\n    const getStorage = () => {\n        return storage;\n    }\n    const addToStorage = (group) => {\n        storage.push(group)\n    }\n    return { getStorage, addToStorage }\n})();\n\n\n// Default controls and group render\nconst domReadyHandler = (() => {\n    // Render default controls\n    const container = new Render();\n    document.addEventListener('DOMContentLoaded', () => {\n        container.renderContainer('body', 'div', 'id', 'new-task-container');\n        container.renderContainer('body', 'div', 'id', 'task-list-container');\n        container.renderInput('#new-task-container', 'task-input');\n        container.renderButton('#new-task-container', 'Add task', 'add-task')\n    })\n    // Render default group\n    const areaGroupName = 'Default';\n    const defaultGroup = new Group(areaGroupName);\n    storageHandler.addToStorage(defaultGroup);\n    container.renderHeader('body', 'h1', areaGroupName, areaGroupName);\n})();\n\n//# sourceURL=webpack://new_todo/./src/index.js?");

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