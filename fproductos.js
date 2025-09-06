// Variable global para el carrito, se inicializa al cargar la página.
let carrito = JSON.parse(localStorage.getItem('carritoPelucheMania')) || [];

// Esta función se ejecuta cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página de productos, cargamos los productos.
    if (document.getElementById('productos')) {
        cargarYMostrarProductos();
    }
    // Si estamos en la página del carrito, mostramos el carrito.
    if (document.getElementById('carrito')) {
        mostrarCarrito();
    }
});

// Función para cargar el JSON y mostrar los productos
function cargarYMostrarProductos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data.productos);
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para mostrar los productos en la página de productos
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');

        productoElement.innerHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" />
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>$${producto.precio.toLocaleString()}</strong></p>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorProductos.appendChild(productoElement);
    });

    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const productoId = evento.target.getAttribute('data-id');
            const productoSeleccionado = productos.find(p => p.id === productoId);
            if (productoSeleccionado) {
                agregarAlCarrito(productoSeleccionado);
            }
        });
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    alert(`${producto.nombre} agregado al carrito!`);
    localStorage.setItem('carritoPelucheMania', JSON.stringify(carrito));
    
    // Si estás en la página del carrito, actualiza la vista
    if (document.getElementById('carrito')) {
        mostrarCarrito();
    }
}

// Función para mostrar los productos en la página del carrito
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    if (!contenedorCarrito) return;

    const carritoGuardado = JSON.parse(localStorage.getItem('carritoPelucheMania')) || [];
    contenedorCarrito.innerHTML = '';
    let total = 0;

    if (carritoGuardado.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    carritoGuardado.forEach(producto => {
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('item-carrito');
        itemCarrito.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <img src="${producto.imagen}" alt="${producto.nombre}" width="50" style="margin-right: 10px;" />
                <p>${producto.nombre} - Cantidad: ${producto.cantidad} - $${producto.precio.toLocaleString()}</p>
            </div>
        `;
        contenedorCarrito.appendChild(itemCarrito);
        total += producto.precio * producto.cantidad;
    });

    const totalElement = document.createElement('h3');
    totalElement.textContent = `Total: $${total.toLocaleString()}`;
    contenedorCarrito.appendChild(totalElement);
}