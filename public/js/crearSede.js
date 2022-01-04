function crear() {
  const nombre = document.getElementById('sede');
  const data = {
    nombre: nombre.value,
  };
  fetch('http://localhost:7000/api/sede/create', {
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
        console.log(res);
        alert(res.message);
      } else {
        console.log(res);
        alert('sede registrada');
        location.href = 'http://localhost:7000/sede';
      }
    });
}
