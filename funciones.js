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


function registerUser() {
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  document.getElementById('modalEmail').textContent = email;
  document.getElementById('modalSubject').textContent = subject;
  document.getElementById('modalMessage').textContent = message;
  }