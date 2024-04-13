const gridContainer = document.querySelector('#grid-container');
const gridSetter = document.querySelector('#size-of-grid');

gridSetter.addEventListener('submit', (event) => {

    // Get grid value from HTML form
    const gridSize = document.querySelector('#grid').value;

    // Create rows
    for (let i = 0; i < gridSize; i++) {
        const newGridColumn = document.createElement('div');
        newGridColumn.classList.add("grid-row");

        // Create colums
        for (let j = 0; j < gridSize; j++) {
            const newGrid = document.createElement('div');
            newGrid.classList.add('grid-item');
            newGridColumn.appendChild(newGrid);
        }

        gridContainer.appendChild(newGridColumn);
    }

    // Prevent default event
    event.preventDefault()
})

gridContainer.addEventListener('click', (event) => {

    // Get location of clicked cell
    const clickedCell = event.target;

    // Change class
    clickedCell.classList.add('grid-item-clicked');
    clickedCell.classList.remove('grid-item');
})

