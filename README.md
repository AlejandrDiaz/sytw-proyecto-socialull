# SocialULL

## Descripción
SocialULL pretende ser una red social enfocada a los estudiantes de la Universidad de La Laguna, con la que conocer y acercarse más a los demás estudiantes de la ULL.

## Usar la app
```bash
    git clone https://github.com/AlejandrDiaz/sytw-proyecto-socialull.git socialull
    cd socialull
    mkdir data
    npm install
    ./mongo &
    node serve.js
```
## App Desplegada en el IaaS

[SocialULL](http://10.6.128.109:8080/login)

## Guía de uso
Para acceder a la plataforma primero habrá que loguearse, o crear una nueva cuenta en caso de no tener una, rellenando los campos Nombre, Apellidos, Edad, Email y Contraseña, la cual requiere confirmación, más de 6 caracteres y que no contenga espacios en blanco.

<img src="https://i.gyazo.com/29b6a61a754a040c7029ae6f5e6a42e6.png" width="50%"> <img src="https://i.gyazo.com/a3b60bcdc20d086c2f1d13e124471898.png" width="50%">

Una vez logueados, accederemos a la pestaña principal en la que aparecen los post creados por uno mismo o por los amigos que uno siga. Los post pueden contener texto y/o una imagen, un video o un gif. Para crear un nuevo post basta con pulsar en la navbar el elemento post que abrirá un modal con el formulario para crearlo. Además una vez creados, se pueden eliminar los post, pero solo los propios.

<img src="https://i.gyazo.com/88f255e06d062c4df0cdb37181368804.png" width="50%"> 
<img src="https://i.gyazo.com/af64db5feee6e79926b54ea6ee4ea1e8.png" width="50%">

Desde inicio podremos acceder a la vista de amigos en la que aparecerá la lista de usuarios que uno haya seguido, pudiendo dejar de seguirlos.

También desde la barra de búsqueda de la navbar podremos buscar nuevos amigos por el nombre o apellidos, que nos redireccionará a una nueva vista que nos muestra los resultados de la búsqueda, pudiendo añadirlos a amigos.

<img src="https://i.gyazo.com/a6475fbd7f93f7dd8367c9fd82891620.png" width="50%">

Para acceder a nuestro perfil podremos hacerlo desde la navbar pulsando sobre nuestro nombre y apellidos que aparecen a la derecha, pulsando sobre la lista de navegración que pone Perfil o por último pulsando sobre el nombre del usuario del post, que también nos serviría para ir al perfil de algún amigo que sigamos.

<img src="https://i.gyazo.com/2a21378d8ae65b42aeb5f8d1508fb04d.png" width="50%">

En la página de perfil se mostrará nuestro avatar e información personal que se rellenó al registrarse, pudiendo editar estos campos y añadir además el Género, Estado Civil, Grado y Biografía. Además se mostrarán todos los post que hayamos creados, pero no el de nuestros amigos.


## Metodología de Trabajo

Para desarrollar la aplicación web se ha trabajado en Cloud9, un entorno de desarrollo que nos permite trabajar en conjunto de forma simultánea editando el código y además nos ofrece una infraestructura para hostear nuestros servicios (mongodb, nodejs). Hemos subido el proyecto a GitHub que es un controlador de versiones de manera que podíamos ir creando issues o pequeñas tareas e ir asignándolas, para así ir trabajando todos de forma comunicativa. El trabajo se ha organizado de manera que todos trabajabamos en todo, mientras uno trabajaba en el FrontEnd otro integrante del equipo trabajaba en el BackEnd y viceversa. Se ha utilizado una metodología ágil de trabajo similar al Extreme Programming(XP) adaptándonos cada integrante a las necesidades del proyecto.

## Tecnologías usadas
* `bcrypt-nodejs`
* `body-parser`
* `connect-flash`
* `cookie`
* `cookie-parser`
* `cookie-session`
* `debug`
* `ejs`
* `express`
* `express-session`
* `fs`
* `mongoose`
* `morgan`
* `multer`
* `passport`
* `passport-local`
* `passport-local-mongoose`
* `path`

## Autores

- [Alejandro Díaz Cueca](https://github.com/AlejandrDiaz)

- [Pablo Sebastián Caballero](https://github.com/alu0100812428)

- [Raúl Martín Morales](https://github.com/alu0100769579)
