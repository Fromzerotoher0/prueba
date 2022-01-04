//cargar sedes al select
function myOnLoad() {
  cargar_sedes();
}

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
}

function addOptions(domElement, array) {
  var select = document.getElementsByName(domElement)[0];

  for (value in array) {
    var option = document.createElement('option');
    option.text = array[value];
    select.add(option);
  }
}

function registrar() {
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const date = document.getElementById('date');
  const gender = document.getElementById('gender');
  const sede = document.getElementById('sedes');
  let photo = document.getElementById('image').files[0];
  let formData = new FormData();
  formData.append('directorio', 'users');
  formData.append('nombre', nombre.value);
  formData.append('apellido', apellido.value);
  formData.append('sexo', gender.value);
  formData.append('fechaNacimiento', date.value);
  formData.append('sede', sede.value);
  formData.append('image', photo);

  fetch('http://localhost:7000/api/alumnos/create', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 400) {
        alert(res.message);
      } else {
        console.log(res);
        alert('alumno registrado');
        location.href = 'http://localhost:7000/sede';
      }
    });
}
