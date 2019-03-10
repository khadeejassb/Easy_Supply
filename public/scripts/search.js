$('#store-search').on('input', function() {
  var search = $(this).serialize();
  if(search === "search=") {
    search = "all"
  }
  $.get('/stores?' + search, function(data) {
    $('#store-grid').html('');
    data.forEach(function(store) {
      $('#store-grid').append(`
        <div class="col-md-3 col-sm-6">
          <div class="thumbnail">
            <img src="${ store.image }">
            <div class="caption">
              <h4>${ store.name }</h4>
            </div>
            <p>
              <a href="/stores/${ store._id }" class="btn btn-primary">More Info</a>
            </p>
          </div>
        </div>
      `);
    });
  });
});

$('#store-search').submit(function(event) {
  event.preventDefault();
});