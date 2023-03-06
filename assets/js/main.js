const contenedor = document.querySelector('.contenedor');
const entrada = contenedor.querySelector('.entrada');
const entradaInfo = entrada.querySelector('.entrada__info');
const entradaCaja = entrada.querySelector('.entrada__caja');
const entradaBoton = entrada.querySelector('.entrada__boton');
const climaIcon = contenedor.querySelector('.clima .clima__img');
const flechaAtras = contenedor.querySelector('.cabecera .cabecera__icon');

let api;
const apikey = 'b19ece1a39bdea27a1918280e016db45';

entradaCaja.addEventListener("keyup", e => {
  if (e.key == "Enter" && entradaCaja.value != "") {
    requestAppi(entradaCaja.value);
  }
});

entradaBoton.addEventListener("click", ()=> {
  if (navigator, Geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

  }else{
    alert("Tu navegador no soporta la api de geolocalización")
  }
})

function onSuccess(position){
  const {latitude, longitude} = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`
  fetchData()
}
function onError(){
  entradaInfo.innerText = "Denegaste la localización";
  entradaInfo.classList.add("error");
}

function requestAppi(ciudad) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apikey}`;
  fetchData()
}

function fetchData() {
  entradaInfo.innerText = "Obteniendo detalles del clima...";
  entradaInfo.classList.add("pending");
  fetch(api).then(response => response.json().then (result => weatherDetails(result)));
}

function weatherDetails(info) {
  entradaInfo.classList.replace("pending","error");
  if (info.cod == "404") {
    entradaInfo.innerText = `${entradaCaja.value} Ciudad invalido`;
  } else{
    const ciudad = info.name;
    const pais = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;

    if (id == 800) {
      climaIcon.src = "assets/img/cloud.svg"
    } else if (id >= 200 && id <= 232) {
      climaIcon.src = "assets/img/storm.svg"
    } else if (id >= 600 && id <= 622) {
      climaIcon.src = "assets/img/snow.svg"
    } else if (id >= 701 && id <= 781) {
      climaIcon.src = "assets/img/haze.svg"
    } else if (id >= 801 && id <= 804) {
      climaIcon.src = "assets/img/cloud.svg"
    } else if (id >= 300 && id <= 321 || (id >= 500 && id <= 531)) {
      climaIcon.src = "assets/img/rain.svg"
    }

    contenedor.querySelector(".clima__temp__numb").innerHTML = Math.floor(temp);
    contenedor.querySelector(".tiempo").innerHTML = description;
    contenedor.querySelector(".ubicacion .ubicacion__detalles").innerHTML = `${ciudad}, ${pais}`;
    contenedor.querySelector(".detalle__temp__numb2").innerHTML = Math.floor(feels_like);
    contenedor.querySelector(".humedad .detalle__info").innerHTML = `${humidity}%`;


    entradaInfo.classList.remove("pending","error");
    contenedor.classList.add("active");
  }
}
flechaAtras.addEventListener("click", () =>{
  contenedor.classList.remove("active");
  entradaCaja.value = "";
})