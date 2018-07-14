// DATABASE
// JUNTA LOS DATOS Y CARGA LA IMAGEN EN EL STORAGE
function sendData() {
  var name        = $('#name').val();
  var description = $('#description').val();
  var cost        = $('#cost').val();
  var img         = $('#img-upload').attr('src');
  var img_name    = $('#img-upload').data('name');
  // firebase
  var uploadTask = storageRef.child(`images/${img_name}`).putString(img,'data_url');
  uploadTask.on('state_changed', function(snapshot){
    $('#formModal').modal('show');
    $('.modal-hide').hide();
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Progreso ' + progress + '%');
    $('.modal-body').html('Subiendo imagen ' + progress.toFixed(2) + '%');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED:
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING:
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      $('.modal-body').html('Espere un momento');
      var data = {
        name: name,
        description: description,
        cost: cost,
        downloadURL: downloadURL
      }
      sendDataToFirebase(data);
    });
  });
}

// ENVIA la información a Firebase
function sendDataToFirebase(data) {
  housingRef.push(data)
    .then(function(res) {
      cleanForm();
      $('.modal-body').html('Se guardo con exito');
      $('.modal-hide').show();
    }).catch(function(error) {
      $('.modal-body').html('Hubo un error');
      $('.modal-hide').show();
      cleanForm();
    });
}


// MUESTRA imagen
$("#image").change(function() {
  readURL(this);
});

function readURL(input) {
  console.log('aqui');
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#img-upload').attr('src', e.target.result);
      $('#img-upload').attr('data-name', input.files[0].name);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

// LIMPIA Form
function cleanForm() {
  $('#name').val('');
  $('#description').val('');
  $('#cost').val('');
  $('#img-upload').removeAttr('src');
  $("#image").val('')
}
