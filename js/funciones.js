document.addEventListener("DOMContentLoaded", () => { 
//// BOTON OPCIONES HEADER
const opciones = document.querySelector(".button-options")
const opcionesList = document.querySelector(".options")

opciones.addEventListener(`click`, () => {
    opcionesList.classList.toggle(`active`)
})


//// HEADER SEARCH

const crearTarjeta = (titulo) => {
    const tarjeta = document.createElement("div")
    tarjeta.classList.add("tituloSerie")

    const image = document.createElement("img")
    image.classList.add("tituloImg")
    image.src = titulo.image.original
    image.alt = titulo.name

    const nameTarjeta = document.createElement("h2")
    nameTarjeta.classList.add("nameTitulo")
    nameTarjeta.textContent = titulo.name;

    ///7 const description = document.createElement("p")
    //// description.classList.add("descripcion")
    //// description.textContent = titulo.summary.replace(/<[^>]*>?/gm, '')

    const idTittle = document.createElement("p")
    idTittle.classList.add("idTittle")
    idTittle.textContent = titulo.id

    tarjeta.appendChild(image)
    tarjeta.appendChild(nameTarjeta)
    tarjeta.appendChild(idTittle)

    tarjeta.addEventListener(`click` , () => {
        descripcion.innerHTML = ``
        llamarApiDescripcion(titulo.id)
        mostarEpisodio(titulo.id);

    })
    return tarjeta
}

const buttonSearch = document.querySelector(".search-button")
const contenedorBusqueda = document.querySelector(".mostrar_busqueda")
const searchImput = document.querySelector(".search-input")

const buscarSeries = async (nombre = "Star Wars") => {
    try{
        const response = await axios.get(`https://api.tvmaze.com/search/shows`, {params: {q: nombre}})
        const titulos = response.data

        contenedorBusqueda.innerHTML = ``

        for(const titulo of titulos){
            const tituloTarjeta = crearTarjeta(titulo.show)
            contenedorBusqueda.appendChild(tituloTarjeta)
        }
    } catch (error) {
        console.error("Error", error)

    }
}

const searchTitulos = async (e) => {
    const buscarImput = document.querySelector(".search-input").value.trim()

    e.preventDefault()

        if (buscarImput){
            try{
                const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${buscarImput}`)
                contenedorBusqueda.innerHTML = ``
                const resultados = response.data;  

                if (resultados.length > 0){
                    for (const titulo of response.data) {
                        const tituloTarjeta = crearTarjeta(titulo.show)
                        contenedorBusqueda.appendChild(tituloTarjeta)
                        
                        
                    }
                } else{
                        contenedorBusqueda.innerHTML = ``;
                        const mensaje = document.createElement("p");
                        mensaje.textContent = "No se encontraron resultados.";
                        mensaje.classList.add("sin-resultados");
                        contenedorBusqueda.appendChild(mensaje);
                }

            
            } catch (error) {
                console.error("Error: ", error)
            }
    }
}



buttonSearch.addEventListener(`click`, searchTitulos)

searchImput.addEventListener(`keypress`, function (e) {
    if (e.key === `Enter`){
        e.preventDefault()
        console.log("Busqueda")
        searchTitulos(e)
    }
})

buscarSeries()

///// RECOMENDACIONES 

const crearTarjetaRecomendaciones = (titulo) => {
    const anime = document.createElement("div")
    anime.classList.add("anime")

    const image = document.createElement("img")
    image.classList.add("tituloImg")
    image.src = titulo.image.original
    image.alt = titulo.name

    const nameTarjeta = document.createElement("h2")
    nameTarjeta.classList.add("nameTitulo")
    nameTarjeta.textContent = titulo.name;

    anime.appendChild(image)
    anime.appendChild(nameTarjeta)

    return anime
}

const titulos_m = document.querySelector(".titulos_m")

async function llamarApi(recomendado) {
    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${recomendado}`);
        const data = await response.json();
        const tarjeta = crearTarjetaRecomendaciones(data);

        tarjeta.addEventListener('click', () => {
            llamarApiDescripcion(recomendado);
            mostarEpisodio(recomendado);
        });

        titulos_m.appendChild(tarjeta);

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

llamarApi(12790)
llamarApi(35288)
llamarApi(4202)
llamarApi(161)
llamarApi(465)



///// Tarjeta Descriptiva 

const descripcion = document.querySelector(".item__grid_5")

const tarjetaDescriptiva = (tarjetaDesc) => {
    const contenedor = document.createElement("div")
    contenedor.classList.add("contenedor__descripcion")

    const imagen = document.createElement("img")
    imagen.classList.add("img__descripcion")
    if (tarjetaDesc.image){
        if (tarjetaDesc.image.original){
            imagen.src = tarjetaDesc.image.original
        } else if (tarjetaDesc.image.medium){
            imagen.src = tarjetaDesc.image.medium
        } else {
            imagen.src = "/img/sinImagen.jpg "
        }
    } else {
        imagen.src = "/img/sinImagen.jpg "
    }
    imagen.alt = tarjetaDesc.name

    const nombre = document.createElement("h2")
    nombre.classList.add("nombre__descripcion")
    nombre.textContent = tarjetaDesc.name;

    const description = document.createElement("p")
    description.classList.add("descripcion")
    if (tarjetaDesc.summary) {
        description.textContent = tarjetaDesc.summary.replace(/<[^>]*>?/gm, '');
    } else {
        description.textContent = "No hay descripción disponible para este título.";
    }

    const generos = document.createElement("p")
    generos.classList.add("generos__descripcion")
    if (tarjetaDesc.genres && tarjetaDesc.genres.length > 0){
        generos.textContent = `Géneros: ${tarjetaDesc.genres.join(", ")}`
    } else {
        generos.textContent = "Generos: No especificados"
    }

    const valoracion = document.createElement("h2")
    valoracion.classList.add("valoracion__descripcion")

        if (tarjetaDesc.rating.average === null){
        valoracion.textContent = "Sin Raiting"
        } else {
        valoracion.textContent = `Raiting: ${tarjetaDesc.rating.average}`
        }

    const banner = document.createElement("img")
    banner.classList.add("banner__descripcion")
    banner.src = tarjetaDesc.image.original
    banner.alt = tarjetaDesc.name

    const contenedorDeTexto = document.createElement("div")
    contenedorDeTexto.classList.add("contenedor__text")


    descripcion.appendChild(contenedor)
    contenedor.appendChild(imagen)
    contenedorDeTexto.appendChild(nombre)
    contenedorDeTexto.appendChild(description)
    contenedorDeTexto.appendChild(generos)
    contenedorDeTexto.appendChild(valoracion)
    contenedor.appendChild(contenedorDeTexto)
    contenedor.appendChild(banner)

    return contenedor

}

async function llamarApiDescripcion (identificador) {
    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${identificador}`);
        const data = await response.json();

        descripcion.innerHTML = ""; 
        const tarjeta = tarjetaDescriptiva(data);
        descripcion.appendChild(tarjeta);

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

llamarApiDescripcion(67017)






///EPISODES 

const item__grid_6 = document.querySelector(".contenedor__caps")

const episodiosContain = (episodio) => {

    const contenedorEp = document.createElement("div")
    contenedorEp.classList.add("contenedor__episodes")

    const nombreEpisodio = document.createElement("h2")
    nombreEpisodio.classList.add("nombre__episodio")
    nombreEpisodio.textContent = episodio.name


    const numerEpisode = document.createElement("p")
    numerEpisode.classList.add("episodio__numero")
    numerEpisode.textContent = episodio.number

    const airDate = document.createElement("p")
    airDate.classList.add("air__date")
    airDate.textContent = episodio.airdate

    item__grid_6.appendChild(contenedorEp)
    contenedorEp.appendChild(nombreEpisodio)
    contenedorEp.appendChild(numerEpisode)
    contenedorEp.appendChild(airDate)

    return contenedorEp
}     

async function mostarEpisodio (chapter = 83739) {
    try{
        const response = await fetch(`https://api.tvmaze.com/shows/${chapter}/episodes`)
        const data = await response.json()
        item__grid_6.innerHTML = ""; 

        data.forEach(episodio => {
            episodiosContain(episodio)
        });

    } catch (error){
        console.error("Error: ", error)
    }
}

mostarEpisodio(67017)

})


