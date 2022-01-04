const token = localStorage.getItem('token');
console.log(token);
function jwtDecode(t) {
  let to = {};
  to.raw = t;
  to.header = JSON.parse(window.atob(t.split('.')[0]));
  to.payload = JSON.parse(window.atob(t.split('.')[1]));
  return to;
}
const user = document.getElementById('user');
user.value = jwtDecode(token).payload.usuario;
console.log(jwtDecode(token));
