function valida_login() {
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("pw").value;
    
    if(!(/\w+([-+.']\w+)*@(\w{2,20})+([-.]\w+)*\.([a-z]{2,4})$/).test(email)) {
        
        alert("Se ha introducido una dirección " + email + " es errónea");
        return false;
    }
    
    else if(password.length == 0){
        
        alert("La password introducida no es válida");
        return false;
    }
    
};