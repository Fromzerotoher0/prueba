//cargar todas las sedes
fetch('http://localhost:7000/api/sede/read', {
  method: 'get',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((res) => {
    if (res.status == 400) {
      alert(res.message);
    } else {
      tabla(res.result);
    }
  });
function tabla(data) {
  let contenido = document.getElementById('contenido');
  contenido.innerHTML = '';
  for (let dato of data) {
    contenido.innerHTML += `
      <tr>
          <td>${dato.id_sede}</td>
          <td>${dato.nombre_sede}</td>
          <td>${dato.alumnos}</td>
          <td><button type="button" onclick="perfil(${dato.id_sede})" class="btn btn-primary">ver</button>
          <button type="button" onclick="eliminar(${dato.id_sede})" class="btn btn-danger">eliminar</button></td>
        </tr>
      `;
  }
}

function eliminar(id) {
  const data = {
    id: id,
  };
  fetch('http://localhost:7000/api/sede/remove', {
    method: 'delete',
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
        alert('sede eliminada');
        location.reload();
      }
    });
}

function perfil(id) {
  location.href = `http://localhost:7000/sede/${id}`;
}
