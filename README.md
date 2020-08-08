# PROYECTO3
# Developers: 
Laura Ramirez
# Link to App: 


* use in mode mobile device at browser, iphone X prefered


## Description

Una plataforma donde las pastelerias registrandose puedan poner sus productos. El ususario anónimo pueda hacer una busqueda y ver los detalles del producto como el precio, ingredientes y toda la informacion de la panaderia (ubicacion, horarios)
 
## User Stories

- **homepage** - Como usario anonimo, quiero poder hacer la busqueda el producto, y visualizar en todos los lugares que podria comprarlos
- **sign up** - Como usuario, quiero darme de alta en la página web para poder poner todos mis prodcutos 
- **login** - Como usuario, quiero poder iniciar sesión en la página web para poder volver a mi cuenta y actuizar mis productos
- **logout** - Como usuario, quiero poder cerrar sesión en la página web
- **products list** - Como usuario, quiero ver todos los lugares donde puedo comprar mi producto
- **product details** - Como usuario, quiero ver todos los detalles del producto e información de la panaderia
- **404** - Como ususario quiero ver uan página de error bonita 
- **500** - Como ususario quiero ver uan página de error bonita 

## Backlog



## ROUTES:




## Models

```
Usuario 
- email: String
- contraseña: String
- dirección: String
- imagen: String
- isBaker: boolean
- nombreNegocio: String
- description: String
- latitud:Number
- longitud: Number
- horarios: string
- FB:String
- Instagram:String


```
```
Producto 
- bakerId: String
- nombre: String
- description: String
- imagen: String
- precio: enum
- ingredientes: 


```
```
Producto Review
- userId: String
- productId: String
- fecha:String
- comentario: String
- rating: Number 
```
``` 

## Links


### Git

The url to your repository and to your deployed project

[Repository Link] (https://github.com/lauraramirezencinas/proyecto3-backend.git)

[Deploy Link] ('')


### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

