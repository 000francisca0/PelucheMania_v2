// Usamos fetch() para cargar el archivo productos.json
fetch('productos.json')
  .then(response => response.json())  // Convertimos la respuesta en un objeto JSON
  .then(data => {
    mostrarProductos(data.productos);  // Llamamos a la función que muestra los productos
  })
  .catch(error => console.error('Error al cargar los productos:', error));

// Función para mostrar los productos
function mostrarProductos(productos) {
  const contenedorProductos = document.getElementById('productos');  // Referencia al contenedor de productos en el HTML

  // Iteramos sobre cada producto y lo agregamos al contenedor
  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('producto');  // Añadimos la clase 'producto' para cada producto

    // Creamos el contenido HTML para cada producto
    productoElement.innerHTML = `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" />
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>$${producto.precio.toLocaleString()}</strong></p>
        <button class="agregar-carrito">Agregar al carrito</button>
      </div>
    `;

    // Añadimos el producto al contenedor
    contenedorProductos.appendChild(productoElement);
  });
}
