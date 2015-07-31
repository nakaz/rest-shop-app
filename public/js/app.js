var serverURL = 'http://localhost:8080';

$(function (){
  $('.products').click(function(evt){
    $.ajax({
      url: serverURL + '/products'
    }).done(function (products){
      $('#info').html('');
      products.forEach(function (element, index){
        $('#info').append('<div class="box"></div>')
                  .append('<div class="name">'+element.name+'</div>')
                  .append('<div class="desc">'+element.description+'</div>')
                  .append('<div class="price">'+element.price+'</div>');
      });
    });
  });

  $('#product').submit(function(evt){
    evt.preventDefault(); //i'll take care of the rest
    var id = $('#product_num').val();
    $.ajax({
      url: serverURL + '/products/' + id
    }).done(function(product){
      $('#info').html('');
      $('#info').append('<div class="box"></div>')
                  .append('<div class="name">'+product.name+'</div>')
                  .append('<div class="desc">'+product.description+'</div>')
                  .append('<div class="price">'+product.price+'</div>');
    });
  });

  $('.orders').click(function(evt){
    $.ajax({
      url: serverURL + '/orders'
    }).done(function (orders){
      $('#info').html('');
      orders.forEach(function (element, index){
        $('#info').append('<div class="box"></div>')
                  .append('<div class="name">'+element.name+'</div>')
                  .append('<div class="quantity">'+element.quantity+'</div>')
                  .append('<div class="product_id">'+element.product_id+'</div>');
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
      $('#info').append('<div class="box"></div>')
                  .append('<div class="name">'+order.name+'</div>')
                  .append('<div class="desc">'+order.quantity+'</div>')
                  .append('<div class="price">'+order.product_id+'</div>');
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
        $('#info').append('<div class="box"></div>')
                    .append('<div class="name">'+order.name+'</div>')
                    .append('<div class="desc">'+order.quantity+'</div>')
                    .append('<div class="price">'+order.product_id+'</div>');
      }
    });
  });

});