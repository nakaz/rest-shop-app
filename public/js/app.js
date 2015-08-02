var serverURL = 'http://localhost:8080';

$(function (){

  function productBox (element){
    return '<div class="name">'+element.name+'</div>' +
           '<div class="desc">'+element.description+'</div>' +
           '<div class="price">$'+element.price+'</div>';
  }

  function orderBox (element){
    var quantity = Number(element.quantity);
    var product = Number(element.Product.price);
    var total = quantity * product;
    return '<div class="name">'+element.name+'</div>' +
           '<div class="productName">'+element.Product.name+'</div>' +
           '<div class="quantity">'+element.quantity+' x ( $'+element.Product.price+' )</div>' +
           '<div class="price">Total: $'+total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'</div>';
  }

  function receipt (element){
    var quantity = Number(element.quantity);
    var product = Number(element.Product.price);
    var total = quantity * product;
    return '<h1>Thank you for your purchase!</h1>' +
           orderBox(element) +
           '<div class="totalprice">Total: $'+total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'</div>';
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
      $('#order_id').append($('<li>').val(i+1).html(orders[i].name));
    }
  });

  //click functions

  $('.products').click(function(evt){
    $.ajax({
      url: serverURL + '/products'
    }).done(function (products){
      $('#grid').html('');
      products.forEach(function (element, index){
        $('#grid').append('<li class="box">' + productBox(element) + '</li>');
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
      $('#grid').html('');
      $('#grid').append('<div class="box">' + productBox(product) + '</div>');
    });
  });

  $('.orders').click(function(evt){
    $.ajax({
      url: serverURL + '/orders'
    }).done(function (orders){
      $('#grid').html('');
      orders.forEach(function (element, index){
        $('#grid').append('<li class="box">' + orderBox(element) + '</li>');
      });
    });
  });

  $('#order_id').on('click', 'li', function(evt){
    evt.preventDefault(); //i'll take care of the rest
    var id = $(evt.target).val();
    $.ajax({
      url: serverURL + '/orders/' + id
    }).done(function(order){
      $('#grid').html('');
      $('#grid').append('<div class="box">' + orderBox(order) + '</div>');
    });
  });

  $('.openModal').click(function (evt){
    $('#myModal').foundation('reveal','open');
  });

  var quantity = null;
  var product = null;

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
        $('.reveal-modal').append('<div class="box">' + receipt(order) + '</div>');
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