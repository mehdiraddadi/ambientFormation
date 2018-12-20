var orderProduct = function(id){
   fetch(`/order/${id}`, {credentials: 'include'}).then(function(response) { 
    document.cookie = 'odrderId='+id;
    response.text().then(function(text){
      if(response.status == 403) {
        window.location.href = '/login'
      }else{
        alert('order added :)')
        setTimeout(function(){
          window.location.href = '/'
        }, 500)     
      }
    })
    }).catch(function(){
      window.location.href = '/login'
    });
}