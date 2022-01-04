const register = document.getElementById('register');
register.addEventListener('click', () => {
  const user = document.getElementById('user');
  const pass = document.getElementById('pass');
  const data = {
    user: user.value,
    pass: pass.value,
  };
  console.log(data);
  fetch('http://localhost:7000/api/users/register', {
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
        alert('usuario creado');
        location.href = 'http://localhost:7000/';
      }
    });
});
