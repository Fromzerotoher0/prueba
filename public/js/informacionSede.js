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
          console.log(res.result);
        }
      }
    });
}

cargarSede();
