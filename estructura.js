class Usuario{
    constructor(nombre, apellido, direccion, email, pass){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.email = email;
        this.password = pass; // api pide no menor a 8 caract.
    }
}

class LoginDTO{ // DTO data transfer object.
    constructor(e, p){
        this.email = e;
        this.password = p;
    }
}

const URLBASE = "https://ort-tallermoviles.herokuapp.com/api"

const MENU = document.querySelector("#menu");
const ROUTER = document.querySelector("#ruteo");
const HOME = document.querySelector("#pantalla-home");
const LOGIN = document.querySelector("#pantalla-login");
const REGISTRO = document.querySelector("#pantalla-registro");
const NAV = document.querySelector("ion-nav") // Lo llamamos por la etiqueta ion-nav y no por el id ya que ion-nav solo hay una en el html
