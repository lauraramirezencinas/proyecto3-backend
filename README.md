# PROYECTO3
SUGAR-PLACE
# Developers: 
Laura Ramirez
# Link to App: 
https://sugar-place.herokuapp.com/

* use in mode mobile device at browser, iphone X prefered


## Description

Un Marketplace donde las pastelerias registrandose puedan poner sus productos. El ususario anónimo pueda hacer una busqueda y ver los detalles del producto como el precio, ingredientes y toda la informacion de la panaderia (ubicacion, horarios) y hacer un pedido para ir a recogerlo. 
 
## User Stories

- **homepage** - Como usario anonimo, quiero poder hacer la busqueda el producto, y visualizar en todos los lugares que podria comprarlos
- **sign up** - Como usuario, quiero darme de alta en la página web para poder poner todos mis prodcutos 
- **login** - Como usuario, quiero poder iniciar sesión en la página web para poder volver a mi cuenta y actuizar mis productos
- **logout** - Como usuario, quiero poder cerrar sesión en la página web
- **products list** - Como usuario, quiero ver todos los lugares donde puedo comprar mi producto
- **product details** - Como usuario, quiero ver todos los detalles del producto e información de la panaderia
- **404** - Como ususario quiero ver una página de error bonita 
- **500** - Como ususario quiero ver una página de error bonita 

## Backlog
-**Creación de pedido Anomino**
-**Camabiar estado de pedido**
-**Filtrar por estado de pedido**
-**Alerta nuevo pedido**
-**Comentarios**
-**Email usuario**


## ROUTES:

- **/api/auth/signup => Sign up**
- **/api/auth/login => Log In**
- **/api/auth/logout => Logoutloggedin**
- **/api/auth/loggedin => Loggedin**
- **/api/usuario/:id => ver, editar y eliminar usuario**
- **/api/producto/profile => ver prodcutos de un usuario (logeado)**
- **/api/producto/all => ver todos los productos**
- **/api/producto/ => crear un producto**
- **/api/producto/:id => ver, editar y eliminar un producto**
- **/api/pedido/ => crear un pedido**
- **/api/pedido/:id => ver y editar un pedido**
- **/api/pedido/all => ver todos los pedidos de un usuario**




## Models

```
Usuario 
- nombre: String
- apellido: String
- contraseña: String
- email: String
- contraseña: String
- dirección: String
- imagen: String
- isBaker: boolean
- nombreNegocio: String
- description: String
- horarios: string
- dirección


```
```
Producto 
- bakerId: String
- nombre: String
- description: String
- imagen: String
- precio: num
- ingredientes: 


```
```
Pedido
- userId: String
- precioTotal: String
- items: [nombre,cantidad,precio]
- fecha:String
- nombre: String
- email: String
- telefono: nummber
- recogida: String
- status: enum

```
``` 

## Links

Jira: 
https://lauraramirez.atlassian.net/secure/RapidBoard.jspa?rapidView=2&projectKey=PROYEC&selectedIssue=PROYEC-38


### Git

The url to your repository and to your deployed project

Repo backend : 
https://github.com/lauraramirezencinas/proyecto3-backend.git
Repo frontend : 
https://github.com/lauraramirezencinas/sugar-place-frontend

App:
https://sugar-place.herokuapp.com/


### Slides

The url to your presentation slides

https://docs.google.com/presentation/d/1UYGCT4-OjqdOTPl-vPynqBTnhqqMz7pl1E8uT1NeqxM/edit?usp=sharing

