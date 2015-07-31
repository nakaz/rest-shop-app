var serverURL = 'http://localhost:8080';

$(function (){

  function productBox (element){
    return '<div class="name">'+element.name+'</div>' +
           '<div class="desc">'+element.description+'</div>' +
           '<div class="price">'+element.price+'</div>';
  }

  function orderBox (order){
    return '<div class="name">'+element.name+'</div>' +
           '<div class="quantity">'+element.quantity+'</div>' +
           '<div class="product_id">'+element.product_id+'</div>';
  }


  $('.products').click(function(evt){
    $.ajax({
      url: serverURL + '/products'
    }).done(function (products){
      $('#info').html('');
      products.forEach(function (element, index){
        $('#info').append('<div class="box">' + productBox(element) + '</div>');
      });
    });
  });

  $.ajax({
    url: serverURL+'/products'
  })
  .done(function(products){
    for (var i = 0; i < products.length; i++){
      $('#product_numbah').append($('<option>').val(i+1).html(products[i].name));
      // $('#product_numbah').append($('<option id="productid_val">').val(i+1).html(i+1));
    }
  });

  $('#product').submit(function(evt){
    evt.preventDefault(); //i'll take care of the rest
    // var id = $('#product_num').val();
    var id = $('#product_numbah').val();
    console.log(id);
    $.ajax({
      url: serverURL + '/products/' + id
    }).done(function(product){
      $('#info').html('');
      $('#info').append('<div class="box">' + productBox(product) + '</div>');
    });
  });

  $('.orders').click(function(evt){
    $.ajax({
      url: serverURL + '/orders'
    }).done(function (orders){
      $('#info').html('');
      orders.forEach(function (element, index){
        $('#info').append('<div class="box">' + orderBox(element) + '</div>');
      });
    });
  });

  $('#order').submit(function(evt){
    evt.preventDefault(); //i'll take care of the rest
    var id = $('#order_num').val();
    $.ajax({
      url: serverURL + '/orders/' + id
    }).done(function(order){
      $('#info').html('');
      $('#info').append('<div class="box">' + orderBox(order) + '</div>');
    });
  });

  $('#newOrder').submit(function(evt){
    evt.preventDefault();
    var name = $('#name').val();
    var quantity = $('#quantity').val();
    var id = $('#product_id').val();
    var newOrder = {name: name, quantity: quantity, product_id: id};
    $.ajax({
      url: serverURL + '/orders',
      type: 'POST',
      data: JSON.stringify(newOrder),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: false,
      success: function (order){
        $('#info').html('');
        $('#info').append('<div class="box">' + orderBox(order) + '</div>');
      }
    });
  });

});