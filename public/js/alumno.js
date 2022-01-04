function a() {
  let url = document.URL;
  let id = url.substring(url.lastIndexOf('/') + 1);
  console.log(id); // 234234234
}

a();
