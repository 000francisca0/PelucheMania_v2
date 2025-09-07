function contactData() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const errors = [];

  // Regex para los correos validos.
  const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  // Validar nombre
  if (!name || name.length > 100) {
    errors.push('Nombre es requerido y debe tener máximo 100 caracteres.');
  }

  // Validar email
  if (email.length > 100 || !emailRegex.test(email)) {
    errors.push('Correo inválido. Solo se permiten dominios @duoc.cl, @profesor.duoc.cl o @gmail.com y máximo 100 caracteres.');
  }

  //Validar mensaje
  if (!subject || subject.length > 500) {
    errors.push('Comentario es requerido y debe tener máximo 500 caracteres.');
  }

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }

  // Popular modal si no se activo ningun if
  document.getElementById('modalName').textContent = name;
  document.getElementById('modalEmail').textContent = email;
  document.getElementById('modalMessage').textContent = message;
}


function inicioSesion() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const emailHelp = document.getElementById('emailHelp');
  const passwordHelp = document.getElementById('passwordHelp')

  const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


  emailHelp.textContent = '';
  passwordHelp.textContent = '';

  let esValido = true;

  // Validar email
  if (email.length > 100) {
    emailHelp.textContent('Correo inválido. Máximo 100 caracteres.');
    esValido = false;
  }
  if (!emailRegex.test(email)) {
    emailHelp.textContent = 'El correo debe ser de @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    esValido = false;
  }

  //Validar contraseña
  if (password.length < 4 || password.length > 10){
    passwordHelp.textContent = 'La contraseña  debe tener entre 4 y 10 caracteres'
    esValido = false;
  }
  
  return esValido
  }
document.addEventListener('DOMContentLoaded', function() {
  // Obtiene el formulario por su ID
  const form = document.getElementById('loginForm');

  // Añade un event listener para el evento 'submit' (envío del formulario)
  form.addEventListener('submit', function(event) {
    // Llama a la función de validación
    if (!inicioSesion()) {
      // Si la validación falla (devuelve false), previene el envío del formulario.
      event.preventDefault();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página de productos, mostramos los productos.
    if (document.getElementById('productos')) {
        mostrarProductos(productos);
    }
    // Si estamos en la página del carrito, mostramos el carrito.
    if (document.getElementById('carrito')) {
        mostrarCarrito();
    }
});

// Validacion de email foter
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      const emailInput = document.getElementById('newsletterEmail');
      const emailHelp = document.getElementById('newsletterEmailHelp');
      const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

      emailHelp.textContent = ''; // Limpiar mensaje de error
      let esValido = true;

      if (emailInput.value.length > 100) {
        emailHelp.textContent = 'Correo inválido. Máximo 100 caracteres.';
        esValido = false;
      }

      if (!emailRegex.test(emailInput.value)) {
        emailHelp.textContent = 'El correo debe ser de @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        esValido = false;
      }
      
      if (!esValido) {
        event.preventDefault();
      } else {
        alert('¡Suscripción exitosa!');
      }
    });
  }
});

//Validacion de página registro 
document.addEventListener('DOMContentLoaded', function() {
  const registroForm = document.getElementById('registroForm');

  if (registroForm) {
    registroForm.addEventListener('submit', function(event) {
      // Prevén el envío por defecto del formulario
      event.preventDefault();

      let esValido = true;

      // 1. Validar el email
      const emailInput = document.getElementById('registroEmail');
      const emailHelp = document.getElementById('registroEmailHelp');
      const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

      emailHelp.textContent = '';
      if (emailInput.value.length > 100 || !emailRegex.test(emailInput.value)) {
        emailHelp.textContent = 'El correo no es válido. Debe ser de @duoc.cl, @profesor.duoc.cl, @gmail.com. Máximo 100 carácteres';
        esValido = false;
      }

      // 2. Validar el nombre completo
      const nombreInput = document.getElementById('registroNombre');
      const nombreHelp = document.getElementById('registroNombreHelp');

      nombreHelp.textContent = '';
      if (nombreInput.value.length < 2 || nombreInput.value.length > 100) {
        nombreHelp.textContent = 'El nombre debe tener entre 2 y 100 caracteres.';
        esValido = false;
      }

      // 3. Validar la contraseña
      const passwordInput = document.getElementById('registroPassword');
      const passwordHelp = document.getElementById('registroPasswordHelp');

      passwordHelp.textContent = '';
      if (passwordInput.value.length < 4 || passwordInput.value.length > 10) {
        passwordHelp.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
        esValido = false;
      }
      
      // Si todo es válido, puedes enviar el formulario o mostrar un mensaje
      if (esValido) {
        alert('Formulario de registro enviado con éxito!');
        // Aquí podrías agregar la lógica para enviar los datos a un servidor
      }
    });
  }
});



// Función para mostrar los productos en la página de productos
function mostrarProductos(productos) {  
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');

        productoElement.innerHTML = `
            <div class="producto">
                <a href="detalle.html?id=${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" />
                </a>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>$${producto.precio.toLocaleString()}</strong></p>
                <button class="agregar-carrito" onclick="añadirCarrito(${producto.id})">Agregar al carrito</button></div>
        `;
        contenedorProductos.appendChild(productoElement);
    });
}

function añadirCarrito(productId) {
    const product = productos.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingIndex = cart.findIndex(p => p.id === productId);

    if (existingIndex !== -1) {
        cart[existingIndex].cantidad += 1;
    } else {
        cart.push({ ...product, cantidad: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.nombre} agregado al carrito!`);
}

function mostrarCarrito() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const contenedor = document.getElementById('carrito');
    contenedor.innerHTML = '';
    if (cart.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }
    cart.forEach(producto => {
        contenedor.innerHTML += `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100px;">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>$${producto.precio.toLocaleString()}</strong></p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </div>
        `;
    });
}

function eliminarDelCarrito(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(p => p.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    mostrarCarrito();
}

function mostrarDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const producto = productos.find(p => p.id === productId);

    const contenedor = document.getElementById('detalle-producto');
    if (producto && contenedor) {
        contenedor.innerHTML = `
            <div class="detalle">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width:300px;">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p><strong>$${producto.precio.toLocaleString()}</strong></p>
                <button onclick="addToCart(${producto.id})">Agregar al carrito</button>
            </div>
        `;
    } else if (contenedor) {
        contenedor.innerHTML = '<p>Producto no encontrado.</p>';
    }
}