Inicio();
function Inicio() {
    Eventos();
    ArmarMenuOpciones();
    Bienvenida();
}
function Eventos() {
    ROUTER.addEventListener('ionRouteDidChange', Navegar)
    document.querySelector("#btnRegistrar").addEventListener('click', TomarDatosRegistro);
    document.querySelector("#btnLogin").addEventListener('click', TomarDatosLogin);
    document.querySelector("#slcFruta").addEventListener('ionChange', SetearFruta);   
}

function SetearFruta(evt){

console.log(evt)
}

function ArmarMenuOpciones(){
    document.querySelector("#menuOpciones").innerHTML = ``;
    let hayToken = localStorage.getItem('apikey');
    console.log(hayToken);
    if(hayToken){
        document.querySelector("#menuOpciones").innerHTML = `
        <ion-item href="/" onclick="CerrarMenu()">Home</ion-item>
        <ion-item href="/" onclick="Logout()">Logout</ion-item>`;  
    } else {
        document.querySelector("#menuOpciones").innerHTML = `
        <ion-item href="/" onclick="CerrarMenu()">Home</ion-item>     
        <ion-item href="/login" onclick="CerrarMenu()">Login</ion-item>
        <ion-item href="/registro" onclick="CerrarMenu()">Registro</ion-item>`;
    }
}

function Bienvenida(){
    let hayToken = localStorage.getItem('apikey');
    if(hayToken){
        document.querySelector("#msgBienvenida").innerHTML = "BIENVENIDO !";
    } else {
        document.querySelector("#msgBienvenida").innerHTML = "Ingese o registrese en nuestra aplicacion !";
    }
}

function Logout(){
    /* localStorage.removeItem('apikey'); CON ESTO SOLO BORRAMOS LA API KEY en vez de borrar todo el local storage*/ 
    localStorage.clear();
    CerrarMenu();
    Bienvenida();
    ArmarMenuOpciones();
}

function Navegar(evt){
    OcultarTodo();
    const ruta = evt.detail.to;
    if(ruta == "/"){
        HOME.style.display = "block";
    } else if(ruta == "/login"){
        LOGIN.style.display = "block";
        document.querySelector("#pLoginRes").innerHTML = "";
    } else if(ruta == "/registro"){
        REGISTRO.style.display = "block";
    }
}

function OcultarTodo(){
    HOME.style.display = "none";
    LOGIN.style.display = "none";
    REGISTRO.style.display = "none";
}
 
function CerrarMenu(){
    MENU.close();
}
 
function TomarDatosRegistro() {

    let n = document.querySelector("#txtRegistroNombre").value;
    let a = document.querySelector("#txtRegistroApellido").value;
    let d = document.querySelector("#txtRegistroDir").value;
    let e = document.querySelector("#txtRegistroEmail").value;
    let p = document.querySelector("#txtRegistroPass").value;


    let usu = new Usuario(n, a, d, e, p)
    console.log(usu);
     
    fetch(`${URLBASE}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usu) // usu se convierte en Json.
    }).then(function (response) {  // then tiene una funcion que recibe la response 
        return response.json();

    }).then(function (data) {

        console.log(data)
        let msg = data.error;
        if (msg == "") {
            document.querySelector("#pRegistroRes").innerHTML = "Alta Correcta";
        } else {
            document.querySelector("#pRegistroRes").innerHTML = data.error;
        }

    }).catch(function (error) {
        document.querySelector("#pRegistroRes").innerHTML = "Error";
    })
    

}

function TomarDatosLogin() {
    let e = document.querySelector("#txtLoginEmail").value;
    let p = document.querySelector("#txtLoginPass").value;

    let l = new LoginDTO(e, p);

    Login(l); // Le pasamos el nuevo objeto LoginDTO
    
}

function Login(datos) {
    document.querySelector("#pLoginRes").innerHTML = "";
    fetch(`${URLBASE}/usuarios/session`, { // vemos el url correspondiente en la documentacion.
        method: "POST",
        headers: { // los headers tambien en la documentacion
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos) // usu se convierte en Json.
    }).then(function (response) {  // then tiene una funcion que recibe la response 

        console.log(response)
        return response.json();

    }).then(function (data) {

        if (data.error == "") {
            localStorage.setItem("apikey", data.data.token)// atributo data del objeto data, que tiene
            // un atributo token
            document.querySelector("#pLoginRes").innerHTML = "Login exitoso";
            NAV.push('page-home');  // ESTO SE COMPORTA IGUAL QUE APRETAR UN LINK TIPO HREF, UNA ETIQUETA TIPO LINK
            ArmarMenuOpciones();
            Bienvenida();
        } else {
            document.querySelector("#pLoginRes").innerHTML = data.error;
        }

    }).catch(function (error) {
        console.log(error)
    })
    

    function showLoading ()  {
        const loading =  loadingController.create()({
            message: "Dismissing after 3 second...",
            duration: 3000
        });

        loading.present(); 
    }

    const alert = document.querySelector('ion-alert');
    function presentAlert(){

            alert.header = 'Alert';
            alert.subHeader = 'Important Message';
            alert.message = 'This is an alert';
            alert.buttons =  ['OK'];

            document.body.appendChild(alert);
            alert.present();

    }


}
