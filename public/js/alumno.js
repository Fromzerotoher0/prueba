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
        console.log(res.result);
      }
    });
}

cargarAlumno();
