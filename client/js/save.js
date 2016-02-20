function saveHTML() {
  name = document.getElementById('name').value;
  inner = document.getElementsByClassName('template')[0].innerHTML;

  $.ajax({
    method: 'POST',
    url: '/save',
    data: {
            name: name,
            inner: inner
          }
  })
}
