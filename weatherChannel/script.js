const inputCiudad = document.querySelector(".encabezado input");
const boton = document.querySelector(".encabezado button");

function cargarCiudad() {
    let ciudad = inputCiudad.value.trim(); // .trim() elimina espacios vacíos

    if (ciudad === "") {
        alert("Por favor, escribí el nombre de una ciudad.");
        return;
    }

    let apiKey = "fdd533266e28101881f610f2b8f1ebe1";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&appid=" + apiKey;

    fetch(url)
        .then(response => {
        
            if (!response.ok) {
                throw new Error("Ciudad no encontrada");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            // Hacer visible el contenedor del clima 
            document.querySelector(".container").style.visibility = "visible";

            // Mostrar el nombre de la ciudad
            document.querySelector("#ciudad").textContent = data.name;

            // Temperatura en Celsius
            let temperaturaCelsius = Math.round(data.main.temp - 273.15);
            document.querySelector("#temperatura").textContent = temperaturaCelsius;
            document.querySelector("#grados").innerHTML = "°C";

            // Ícono del clima
            let iconoCodigo = data.weather[0].icon;
            let iconoUrl = `https://openweathermap.org/img/wn/${iconoCodigo}@2x.png`;
            document.querySelector("#wicon").setAttribute("src", iconoUrl);

            // Descripción del clima
            document.querySelector("#descripcion").textContent = data.weather[0].description;

            inputCiudad.value = "";
        })
        .catch(error => {
            console.error("Hubo un error:", error);
            alert("No se encontró la ciudad ingresada. Verificá que esté bien escrita.");
            inputCiudad.value = "";
        });
}

boton.addEventListener("click", cargarCiudad);