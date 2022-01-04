function cargarAlumno() {
  let url = document.URL;
  let id = url.substring(url.lastIndexOf('/') + 1);
  const data = {
    id: id,
  };
  fetch('http://localhost:7000/api/alumnos/readById', {
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
        if (res.result.length == 0) {
          alert('usuario inexistente');
          location.href = 'http://localhost:7000/dashboard';
        } else {
          const card = document.getElementById('alumno-card');
          card.innerHTML = '';
          const div = document.createElement('div');
          div.className = '';
          card.innerHTML = `
            <div class="card m-2">
            <div class="row">
            <div class="col-md-6">
            <h1>Perfil de alumno</h1>
            <img src="${res.result[0].foto}" class="img-fluid">
            </div>
            <div class="col-md-8">
            <label for="Nombre" class="form-label">Nombre</label>
            <input id="nombre" name="nombre" type="text" class="form-control" value="${res.result[0].nombre}">
            <label for="apellido" class="form-label mt-2">Apellido</label>
            <input id="apellido" name="apellido" type="text" class="form-control" value="${res.result[0].apellido}">
            <input id="id" name="id" type="hidden" value="${res.result[0].id}">
            <button type="button" onclick="update()" id="update" class="btn btn-primary mt-4">Actualizar datos</button>
            <button type="button" onclick="regresar()" id="update" class="btn btn-danger mt-4">Regresar</button>
            </div>
            </div>
            </div>
          
          `;
          console.log(res.result);
        }
      }
    });
}

cargarAlumno();

function update() {
  const id = document.getElementById('id');
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');

  const data = {
    id: id.value,
    nombre: nombre.value,
    apellido: apellido.value,
  };
  fetch('http://localhost:7000/api/alumnos/edit', {
    method: 'put',
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
        alert('alumno actualizado');
        location.reload();
      }
    });
  console.log(id.value + ' ' + nombre.value + ' ' + apellido.value);
}
function regresar(){
  location.href = `http://localhost:7000/alumnos`;
}