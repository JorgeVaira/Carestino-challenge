// Constantes
const BLACK = '#000000';
const ROJO = '#ff0000';
const VERDE = '#00ff00';
const AZUL = '#0000ff';
const AMARILLO = '#ffff00';
const NARANJA = '#ffa500';
const VIOLETA = '#800080';
const CELESTE = '#00ffff';
const FUCSIA = '#ff00ff';
const SALMON = '#ff7578';
const AZUL2 = '#876fff';
const AMARILLO2 = '#fcff6a';
const CELESTE2 = '#4affff';

// Elementos del DOM para controlar
const gridContainer = document.getElementById('grid-container');
const colorSelector = document.getElementById('color-selector');

// Para dibujar la cuadricula
const columns = 100;
let rowsNumber; // Cambiará de acuerdo al tamaño de la pantala
let currentColor = BLACK; // Va a tener el color que se elija. Por defecto será negro
let drawing = false; // Para ver si estamos dibujando o no

// Array que contendrá los colores necesarios
const coloresSelector = [FUCSIA, SALMON, AZUL2, AMARILLO2, CELESTE2];

// Funcion para generar la cuadricula
function generarCuadricula() {
	gridContainer.innerHTML = ''; // Limpia la cuadricula anterior
	colorSelector.innerHTML = ''; // Limpia los colores del selector anterior

	//Calculamos el ancho de la pantalla y el alto del contenedor
	const screenWidth = window.innerWidth;
	const containerScreenHeight = gridContainer.offsetHeight;
	//Calculamos el ancho de la celda y el número de filas
	const cellWidth = screenWidth / columns;
	rowsNumber = Math.floor(containerScreenHeight/cellWidth); //Necesitamos que sea un número entero
	// Dibujamos las columnas y filas en el grid container
	gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${rowsNumber}, 1fr)`;

	for(let i=0; i< (rowsNumber*columns); i++) {
		const cell = document.createElement('div'); // Creamos la celda
		cell.classList.add('cell');
		cell.addEventListener('mousedown', (e) => {
			if(e.button === 0) { //Clic izquierdo
				drawing = true;
				e.target.style.backgroundColor = currentColor;
			}
		});
		cell.addEventListener('mousemove', (e) => {
			if(!drawing || e.button !== 0) return; // Solo pinta si el clic izquierdo está cliqueado
			e.target.style.backgroundColor = currentColor;
		});
		cell.addEventListener('mouseup', (e) => {
			drawing = false;
		});
		cell.addEventListener('mouseleave', (e) => {
			if(!drawing || e.button !== 0) return;
			if(e.buttons === 1) {
				e.target.style.backgroundColor = currentColor;
			}
		});
		cell.addEventListener('contextmenu', (e) => {
			e.preventDefault(); // Evitamos que el context menu por defecto aparezca
			const x = e.clientX;
			const y = e.clientY;
			showColorSelector(x, y);
		});
		gridContainer.appendChild(cell);
	}

	// Generamos los elementos de color en el selector
	coloresSelector.forEach(color => {
		const colorOption = document.createElement('div'); // Creamos el div para el color
		colorOption.classList.add('color-option');
		colorOption.style.backgroundColor = color;
		colorOption.dataset.color = color;
		colorOption.addEventListener('click', (e) => {
			currentColor = e.target.dataset.color = color;
			colorSelector.style.display = 'none';
		});
		colorSelector.appendChild(colorOption);
	});
}

// Función que muestra el colorSelector
function showColorSelector(x, y) {
	colorSelector.style.left = `${x}px`;
    colorSelector.style.top = `${y}px`;
    colorSelector.style.display = 'block';

    // Removemos cualquier listener previo para evitar duplicados
    colorSelector.removeEventListener('mouseleave', hideSelector);

    // Evento para ocultar el selector cuando el ratón SALE de ÉL
    colorSelector.addEventListener('mouseleave', hideSelector);
}

function hideSelector() {
	colorSelector.style.display = 'none';
}

// Agregamos evento para que redibuje la cuadricular cuando se cambia el tamaño de la pantalla
window.addEventListener('resize', generarCuadricula);
//Generamos la cuadricula inicial
generarCuadricula();
