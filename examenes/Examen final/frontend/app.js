const backendUrl = 'http://localhost:3000';

// Registro
document.getElementById('btnRegister').addEventListener('click', async () => {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  const res = await fetch(`${backendUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  alert(data.success ? 'Usuario registrado' : data.message);
});

// Login
document.getElementById('btnLogin').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${backendUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.success) alert('Login exitoso');
  else alert(data.message);
});
