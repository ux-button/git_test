const formSelector = document.querySelector('form');
const containerToDoList = document.querySelector('#list-of-items')

formSelector.addEventListener('submit', function(event) {
    const itemToDoList = document.createElement('div');
    const textFromInput = document.getElementById('task-text').value;
    itemToDoList.innerHTML = '<input type="checkbox"><span>' + textFromInput.toString() + '</span>';
    containerToDoList.appendChild(itemToDoList);
    event.preventDefault();
})