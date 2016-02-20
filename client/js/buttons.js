//save html on node server
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

//downloads zip of server
function download() {
  window.location.href = '/download'
}

function logout() {
  window.location.href = '/logout'
}
