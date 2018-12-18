var orderProduct = function(id){
   fetch(`/order/${id}`).then(function(response) { 
    document.cookie = 'odrderId='+id;
    response.text().then(function(text){
      if(response.status == 403) {
        window.location.href = '/login'
      }else{
        window.location.href = '/'
        alert('ok')
        
      }
    })
    /* response.text().then(alert)
    .catch(function(error) { 
      console.log(error); 
      }); */
    }).catch(function(){
      window.location.href = '/login'
    });
}