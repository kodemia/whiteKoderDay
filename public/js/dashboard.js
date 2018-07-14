
// RECUPERAR los datos de la base
// once value

// housingRef.once('value', function(snapshot) {
//   $.each(snapshot.val(), function(key,value) {
//     // console.log(key,value);
//     buildHousing(key,value);
//   })
// });

// on child_added
housingRef.on('child_added', function(snapshot) {
  // console.log(snapshot.key, snapshot.val());
  buildHousing(snapshot.key, snapshot.val());
});

function buildHousing(key,value) {
  $('.hostings-wrapper').append(`
    <div id="${key}" class="col-sm-6 col-md-3">
      <div class="panel panel-default location-panel">
        <img src="${value.downloadURL}" alt="">
        <h2>${value.name}</h2>
        <h3>${value.description}</h3>
        <h4>${value.cost}</h4>
      </div>
    </div>
  `);
}


// Filter

$("#search").on('keyup', function (e) {
    if (e.keyCode == 13) {
      $('.hostings-wrapper').empty();
      var search = $("#search").val().toLocaleLowerCase();
      housingRef.once('value', function(snapshot) {
        $.each(snapshot.val(), function(key,value) {
          var name = value.name.toLocaleLowerCase();
          if (name.indexOf(search) != -1 ) {
            buildHousing(key,value);
          }
        })
      });
    }
});
