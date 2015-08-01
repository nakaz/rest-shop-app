var serverURL = 'http://localhost:8080';

$(function (){

  function productBox (element){
    return '<div class="name">'+element.name+'</div>' +
           '<div class="desc">'+element.description+'</div>' +
           '<div class="price">'+element.price+'</div>';
  }

  function orderBox (element){
    return '<div class="name">'+element.name+'</div>' +
           '<div class="quantity">'+element.quantity+'</div>' +
           '<div class="productName">'+element.Product.name+'</div>' +
           '<div class="productPrice">'+element.Product.price+'</div>';
  }

  // ajax for list counts
  $.ajax({
    url: serverURL+'/products'
  })
  .done(function(products){
    for (var i = 0; i < products.length; i++){
      $('#product_id').append($('<li>').val(i+1).html(products[i].name));
      $('#order-product_id').append($('<option>').val(i+1).html(products[i].name));
    }
  });

  $.ajax({
    url: serverURL+'/orders'
  })
  .done(function(orders){
    for (var i = 0; i < orders.length; i++){
      $('#order_id').append($('<option>').val(i+1).html(orders[i].name));
    }
  });

  //click functions

  $('.products').click(function(evt){
    $.ajax({
      url: serverURL + '/products'
    }).done(function (products){
      $('#container').html('');
      products.forEach(function (element, index){
        $('#container').append('<div class="box">' + productBox(element) + '</div>');
      });
    });
  });


  $('#product_id').on('click', 'li', function(evt){
    evt.preventDefault(); //i'll take care of the rest
    var id = $(evt.target).val();
    console.log(id);
    $.ajax({
      url: serverURL + '/products/' + id
    }).done(function(product){
      $('#container').html('');
      $('#container').append('<div class="box">' + productBox(product) + '</div>');
    });
  });

  $('.orders').click(function(evt){
    $.ajax({
      url: serverURL + '/orders'
    }).done(function (orders){
      $('#container').html('');
      orders.forEach(function (element, index){
        $('#container').append('<div class="box">' + orderBox(element) + '</div>');
      });
    });
  });

  $('#order_id').change(function(evt){
    evt.preventDefault(); //i'll take care of the rest
    var id = $('#order_id').val();
    $.ajax({
      url: serverURL + '/orders/' + id
    }).done(function(order){
      $('#container').html('');
      $('#container').append('<div class="box">' + orderBox(order) + '</div>');
    });
  });

  $('.openModal').click(function (evt){
    $('#myModal').foundation('reveal','open');
  });

  $('#newOrder').submit(function(evt){
    evt.preventDefault();
    var name = $('#name').val();
    var quantity = $('#quantity').val();
    var id = $('#order-product_id').val();
    var newOrder = {name: name, quantity: quantity, product_id: id};
    $.ajax({
      url: serverURL + '/orders',
      type: 'POST',
      data: JSON.stringify(newOrder),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: false,
      success: function (order){
        $('.reveal-modal').html('');
        $('.reveal-modal').append('<div class="box">' + orderBox(order) + '</div>');
        $('#order_id').append($('<option>').val(order.id).html(order.name));
      }
    });
  });

  $(document).foundation({
    dropdown: {
      // specify the class used for active dropdowns
      active_class: 'open'
    }
  });

});