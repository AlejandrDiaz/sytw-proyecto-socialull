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

function validar_clave() {
    var caract_invalido = " ";
    var caract_longitud = 6;
    var cla1 = document.registro.password.value;
    var cla2 = document.registro.password2.value;
    if (cla1 == '' || cla2 == '') {
        alert('Debes introducir tu contraseña en los dos campos.');
        return false;
    }
    if (document.registro.password.value.length < caract_longitud) {
        alert('Tu contraseña debe constar de ' + caract_longitud + ' caracteres.');
        return false;
    }
    if (document.registro.password.value.indexOf(caract_invalido) > -1) {
        alert("Las contraseñas no pueden contener espacios");
        return false;
    }
    else {
        if (cla1 != cla2) {
            alert ("Las contraseñas introducidas no son iguales");
            return false;
        }
        else {
            return true;
        }
    }
};


var form = document.querySelector('form');
form.addEventListener( 'invalid',function(event){
    event.preventDefault();
},true);

  var button = form.querySelector('button');
  button.addEventListener('click', function(){

    // Seleccionamos todos los errores existentes
    var invalid = form.querySelectorAll(':invalid');

    // Reiteramos sobre ellos
    for(var i = 0; i < invalid.length;i++){

      // Creamos un div para cada error
      var error = document.createElement('div');
      // Accedemos al elemento padre del input 
      var label = invalid[i].parentNode;
      //Añadimos una clase CSS
      error.className = 'error';
      // A cada div le agregamos el texto del error
      error.textContent = invalid[i].validationMessage;
      // Añadimos el nuevo elemento al DOM
      label.insertBefore(error,invalid[i].nextSibling);
    };

    // Código para eliminar antiguos mensajes.
  });
  
  window.setTimeout(function(){

  var allErrors =document.querySelectorAll('.error');
  for(var i = 0;i < allErrors.length;i++){
    allErrors[i].remove(); 
  }
},5000);