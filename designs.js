// Declaring grid variables.
const pixelShow = document.querySelector('#pixelCanvas');

// Select size input
const sizeGrid = document.querySelector('#sizePicker');
const gridWidth = document.querySelector("#inputWidth");
const gridHeight = document.querySelector("#inputHeight");

let draw = false; // Tracks whether or not mouse pointer is pressed.

// When size is submitted by the user, create the grid display and call makeGrid().
function makeGrid() {
    while (pixelShow.innerHTML != '') {
        pixelShow.removeChild(pixelShow.firstChild);
    }
    for (let x = 0; x < gridHeight.value; x++) {
        let gridRow = document.createElement('tr');
        pixelShow.appendChild(gridRow);
        for (let y = 0; y < gridWidth.value; y++) {
            let gridCols = document.createElement('td');
            gridRow.appendChild(gridCols);
            gridCols.addEventListener('mousedown', () => {
                const color = document.querySelector('#colorPicker').value;
                this.style.backgroundColor = color;
            });
        }
    }
}

sizeGrid.addEventListener('submit', function(evt) {
    evt.preventDefault();
    makeGrid();
});

//EventListener for mouse pointer pressed and set to start drawing, and to stop drawing when mouse pointer is released.
pixelShow.addEventListener('mousedown', function(e) {
    draw = true;
    pixelShow.addEventListener('mouseup', function() {
        draw = false;
    });
    pixelShow.addEventListener('mouseover', function(e) {
        // variable 'color' defined here locally rather than globally so Javascript checks whether color has changed with a new mouse press on cells.
        const color = document.querySelector('#colorPicker').value;
        // Fill cells with chosen color when mouse pointer is pressed and within the grid cells.
        if (draw) {
            //converts the result of tagName to lowercase, since it returns a capital string from the DOM tree.
            if (e.target.tagName.toLowerCase() === 'td') {
                e.target.style.backgroundColor = color;
            }
            // Provides for an onclick functionality square color fill
            pixelShow.addEventListener('mousedown', function(e) {
                if (e.target.tagName !== 'TD') return;
                const color = document.querySelector('#colorPicker').value;
                e.target.style.backgroundColor = color;
            });
        }
    });
});

// Finnaly, removes color from cell upon mouse double-click event/action
pixelShow.addEventListener('dblclick', e => {
    e.target.style.backgroundColor = null;
});