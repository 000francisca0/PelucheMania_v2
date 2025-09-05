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