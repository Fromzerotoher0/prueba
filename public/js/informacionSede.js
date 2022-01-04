function cargarSede() {
  let url = document.URL;
  let id = url.substring(url.lastIndexOf('/') + 1);
  const data = {
    id: id,
  };
  fetch('http://localhost:7000/api/sede/readById', {
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
          alert('sede inexistente');
          location.href = 'http://localhost:7000/dashboard';
        } else {
          const card = document.getElementById('alumno-card');
          card.innerHTML = '';
          const div = document.createElement('div');
          div.className = '';
          card.innerHTML = `
            <div class="card m-2">
            <div class="row">
            <h2>informacion de la sede</h2>
            <div class="col-md-8">
            <label for="Nombre" class="form-label">Nombre</label>
            <input id="nombre" name="nombre" type="text" class="form-control" value="${res.result[0].nombre_sede}">
            <input id="id" name="id" type="hidden" value="${res.result[0].id_sede}">
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

cargarSede();

function update() {
  const id = document.getElementById('id');
  const nombre = document.getElementById('nombre');
  const data = {
    id: id.value,
    nombre: nombre.value,
  };
  fetch('http://localhost:7000/api/sede/edit', {
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
        console.log(res.message);
        alert(res.message);
      } else {
        alert('sede actualizado');
        location.reload();
      }
    });
}

function regresar(){
  location.href = `http://localhost:7000/sede`;
}