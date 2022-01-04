//Codigo a Ejecutar al Cargar la Pagina
function myOnLoad() {
  cargar_sedes();
}

// funcion para Cargar Provincias al campo <select>
function cargar_sedes() {
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
        let json = res.result;
        let sedes = [];
        for (let i = 0; i < json.length; i++) {
          sedes.push(json[i].nombre_sede);
        }
        console.log(sedes);
        addOptions('sedes', sedes);
      }
    });

  //cargar todos los alumnos
  fetch('http://localhost:7000/api/alumnos/read', {
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
        console.log(res.result);
        tabla(res.result);
      }
    });
}

function tabla(data) {
  let contenido = document.getElementById('contenido');
  contenido.innerHTML = '';
  for (let dato of data) {
    contenido.innerHTML += `
    <tr>
        <td>${dato.id}</td>
        <td>${dato.nombre}</td>
        <td>${dato.apellido}</td>
        <td>${dato.sexo}</td>
        <td>${dato.fechaNacimiento}</td>
        <td>${dato.nombre_sede}</td>
        <td><img style="height:100px;width:150px" src=${dato.foto}></td>
        <td><button type="button" class="btn btn-primary">ver</button>
        <button type="button" onclick="eliminar(${dato.id})" class="btn btn-danger">eliminar</button></td>
      </tr>
    `;
  }
}

// Rutina para agregar opciones a un <select>
function addOptions(domElement, array) {
  var select = document.getElementsByName(domElement)[0];

  for (value in array) {
    var option = document.createElement('option');
    option.text = array[value];
    select.add(option);
  }
}

function filter() {
  let myselect = document.getElementById('selected');
  const data = {
    sede: myselect.options[myselect.selectedIndex].value,
  };
  fetch('http://localhost:7000/api/alumnos/readBySede', {
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
        console.log(res.result);
        tabla(res.result);
      }
    });
}

//eliminar un alumno
function eliminar(id) {
  const data = {
    id: id,
  };
  fetch('http://localhost:7000/api/alumnos/remove', {
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
        alert('alumno eliminado');
        location.reload();
      }
    });
}
