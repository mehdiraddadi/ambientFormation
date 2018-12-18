var orderProduct = function(id){
   fetch(`/order/${id}`).then(function(response) { 
    document.cookie = 'odrderId='+id;
    response.text().then(alert)()


    /* response.text().then(alert)
    .catch(function(error) { 
      console.log(error); 
      }); */
    });
}