function loop() {
    console.log("Esta función se ejecutará cada 5 segundos.");
}

// Establece el intervalo de tiempo en milisegundos (5 segundos = 5000 milisegundos)
const intervalo = 5000;

// Llama a la función miFuncion() cada 5 segundos utilizando setInterval()
setInterval(miFuncion, intervalo);