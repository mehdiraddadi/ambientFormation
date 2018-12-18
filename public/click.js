var orderProduct = function(id){
   fetch(`/order/${id}`).then(function(response) { 
    document.cookie = 'odrderId='+id;
    response.text().then(function(text){
      alert(text == 'Internal Server Error')
      if(text == 'Internal Server Error') {
        location.path = '/login'
      }
    })
    /* response.text().then(alert)
    .catch(function(error) { 
      console.log(error); 
      }); */
    }).catch(function(){
      location.path = '/login'
    });
}