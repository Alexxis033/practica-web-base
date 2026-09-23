import { productos } from './datos.js';

const contenedorCatalogo = document.getElementById('catalogo');

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
        <button data-id="${p.id}" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition btn-agregar">
          Agregar
        </button>
      </div>
    </div>
  `).join('');

  contenedorCatalogo.innerHTML = tarjetasHTML;
}

// Cargar los productos al iniciar la página
mostrarProductos(productos);