const login = document.getElementById('login');
login.addEventListener('click', () => {
  const user = document.getElementById('user');
  const pass = document.getElementById('password');
  const data = {
    user: user.value,
    pass: pass.value,
  };
  console.log(data);
  fetch('http://localhost:7000/api/users/login', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 400) {
        alert(res.message);
      } else {
        alert('inicio de sesión exitoso');
        console.log(res);
        localStorage.setItem('token', res.result.token);
        location.href = 'http://localhost:7000/dashboard';
      }
    });
});
