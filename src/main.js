import { productos } from './datos.js';

const contenedorCatalogo = document.getElementById('catalogo');
const listaPedido = document.getElementById('lista-pedido');
const totalElemento = document.getElementById('total');
const btnVaciar = document.getElementById('btn-vaciar');

// Arreglo para almacenar los productos del pedido
const pedido = [];

// Función para renderizar los productos en el catálogo
function mostrarProductos(lista) {
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

// Función para renderizar la lista del pedido y actualizar el total
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

  // Calcula el total sumando el precio de cada producto usando reduce
  const total = pedido.reduce((suma, p) => suma + p.precio, 0);
  totalElemento.textContent = `$${total}.00`;
}

// Delegación de eventos: Escucha los clics dentro del contenedor del catálogo
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

// Evento para vaciar el pedido
btnVaciar.addEventListener('click', () => {
  pedido.length = 0;
  mostrarPedido();
});

// Cargar catálogo inicial
mostrarProductos(productos);