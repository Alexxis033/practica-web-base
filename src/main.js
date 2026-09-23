import { productos } from './datos.js';

const contenedorCatalogo = document.getElementById('catalogo');
const contenedorFiltros = document.getElementById('filtros');
const listaPedido = document.getElementById('lista-pedido');
const totalElemento = document.getElementById('total');
const btnVaciar = document.getElementById('btn-vaciar');

const pedido = [];
let categoriaActiva = 'Todos';

// Función para renderizar tarjetas del catálogo
function mostrarProductos(lista) {
  if (lista.length === 0) {
    contenedorCatalogo.innerHTML = `<p class="col-span-full text-gray-500 italic">No hay productos en esta categoría.</p>`;
    return;
  }

  const tarjetasHTML = lista.map(p => `
    <div class="bg-white rounded-lg shadow p-5 flex flex-col justify-between">
      <div>
        <span class="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">${p.categoria}</span>
        <h3 class="text-xl font-bold text-gray-800 mt-2">${p.nombre}</h3>
        <p class="text-gray-500 mt-2 text-sm">${p.descripcion}</p>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-lg font-bold text-blue-600">$${p.precio}.00</span>
        <button data-id="${p.id}" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Agregar
        </button>
      </div>
    </div>
  `).join('');

  contenedorCatalogo.innerHTML = tarjetasHTML;
}

// Función para generar los botones de categorías dinámicamente
function crearFiltros() {
  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];

  contenedorFiltros.innerHTML = categorias.map(cat => {
    const esActivo = cat === categoriaActiva;
    const clases = esActivo
      ? 'bg-blue-600 text-white font-semibold shadow'
      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300';

    return `
      <button data-categoria="${cat}" class="px-4 py-2 rounded-full text-sm transition ${clases}">
        ${cat}
      </button>
    `;
  }).join('');
}

// Escuchar clics en el contenedor de botones de filtro
contenedorFiltros.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-categoria]');
  if (!boton) return;

  categoriaActiva = boton.dataset.categoria;
  crearFiltros(); // Redibuja los botones para resaltar el botón activo

  if (categoriaActiva === 'Todos') {
    mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(p => p.categoria === categoriaActiva);
    mostrarProductos(productosFiltrados);
  }
});

// Función para renderizar el pedido y calcular el total
function mostrarPedido() {
  if (pedido.length === 0) {
    listaPedido.innerHTML = `<li class="text-gray-400 py-2 text-sm italic">El pedido está vacío.</li>`;
  } else {
    listaPedido.innerHTML = pedido.map(p => `
      <li class="py-2 flex justify-between items-center text-sm">
        <span class="font-medium text-gray-700">${p.nombre}</span>
        <span class="text-gray-600 font-semibold">$${p.precio}.00</span>
      </li>
    `).join('');
  }

  const total = pedido.reduce((suma, p) => suma + p.precio, 0);
  totalElemento.textContent = `$${total}.00`;
}

// Delegación de eventos para botones "Agregar"
contenedorCatalogo.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-id]');
  if (!boton) return;

  const id = Number(boton.dataset.id);
  const productoEncontrado = productos.find(p => p.id === id);

  if (productoEncontrado) {
    pedido.push(productoEncontrado);
    mostrarPedido();
  }
});

// Vaciar pedido
btnVaciar.addEventListener('click', () => {
  pedido.length = 0;
  mostrarPedido();
});

// Inicialización
crearFiltros();
mostrarProductos(productos);