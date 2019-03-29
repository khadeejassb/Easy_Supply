if (quantity == 1){
  priceValue = $('#priceHidden').val();
  quantity = 1;
} else {

  priceValue -= parseFloat($('#priceHidden').val());
  quantity -= 1;
}

});

$(document).on('click', '#minus', function(e){
  e.preventDefault();
  var priceValue = parseFloat($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  

  $('#quantity').val(quantity);
  $('#priceValue').val(priceValue.toFixed(2));
  $('#total').html(quantity);
});

