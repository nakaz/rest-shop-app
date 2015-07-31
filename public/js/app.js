var serverURL = 'http://localhost:8080';

$(function (){
  $('.products').click(function(evt){
    $.ajax({
      url: serverURL + '/products'
    }).done(function (products){

      products.forEach(function (element, index){
        $('#info').append('<div class="box"></div>')
                  .append('<div class="name">'+element.name+'</div>')
                  .append('<div class="desc">'+element.description+'</div>')
                  .append('<div class="price">'+element.price+'</div>');
      });
      console.log(products);
    });
  });

  $('.orders').click(function(evt){
    $.ajax({
      url: serverURL + '/orders'
    }).done(function (orders){
      console.log(orders);
    });
  });
});