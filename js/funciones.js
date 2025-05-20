//// BOTON OPCIONES HEADER
const opciones = document.querySelector(".button-options")
const opcionesList = document.querySelector(".options")

opciones.addEventListener(`click`, () => {
    opcionesList.classList.toggle(`active`)
})


//// HEADER SEARCH

const buttonSearch = document.querySelector(".search-button")
const contenedorBusqueda = document.querySelector(".mostrar_busqueda")
const searchImput = document.querySelector(".search-input")

const buscarSeries = async (nombre = "batman") => {
    try{
        const response = await axios.get(`https://api.tvmaze.com/search/shows`, {params: {q: nombre}})
        const titulos = response.data.slice(0,4)

        contenedorBusqueda.innerHTML = ``

        for(const titulo of titulos){
            const tituloTarjeta = crearTarjeta(titulo.show)
            contenedorBusqueda.appendChild(tituloTarjeta)
        }
    } catch (error) {
        console.error("Error", error)

    }
}

document.addEventListener("DOMContentLoaded", () => buscarSeries())

const searchTitulos = async (e) => {
    const buscarImput = document.querySelector(".search-input").value.trim()

    e.preventDefault()

        if (buscarImput){
            try{
                const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${buscarImput}`)
                contenedorBusqueda.innerHTML = ``

            for (const titulo of response.data) {
                const nombre = titulo.show.name.toLowerCase()
                if (nombre.includes(buscarImput.toLowerCase())) {
                    const tituloTarjeta = crearTarjeta(titulo.show)
                    contenedorBusqueda.appendChild(tituloTarjeta)
                }
            }

            if (contenedorBusqueda.children.length === 0) {
                const mensaje = document.createElement("p")
                mensaje.textContent = "No se encontraron resultados."
                mensaje.classList.add("sin-resultados")
                contenedorBusqueda.appendChild(mensaje)
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

    const description = document.createElement("p")
    description.classList.add("descripcion")
    description.textContent = titulo.summary.replace(/<[^>]*>?/gm, '')

    tarjeta.appendChild(image)
    tarjeta.appendChild(nameTarjeta)
    tarjeta.appendChild(description)

    return tarjeta
}


///// RECOMENDACIONES 

const crearTarjetaRecomendaciones = (titulo) => {
    const tarjeta = document.querySelector(".animes__titulos")
    tarjeta.classList.add("animes__titulos")

    const anime = document.querySelector(".anime")

    const image = document.createElement("img")
    image.classList.add("tituloImg")
    image.src = titulo.image.original
    image.alt = titulo.name

    const nameTarjeta = document.createElement("h2")
    nameTarjeta.classList.add("nameTitulo")
    nameTarjeta.textContent = titulo.name;


    tarjeta.appendChild(anime)
    anime.appendChild(image)
    anime.appendChild(nameTarjeta)

    return tarjeta
}
const titulos_m = document.querySelector(".titulos_m")
const animeRec = document.querySelector(".anime")

function llamarApi(recomendado) {
    fetch(`https://api.tvmaze.com/search/shows?q=${recomendado}`)
        .then((response) => response.json())
        .then((data) => {
            for (const item of data) { // Limita a 4 resultados opcionalmente
                const tarjeta = crearTarjetaRecomendaciones(item.show)
                titulos_m.appendChild(tarjeta)
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error)
        })
}

llamarApi("girls und panzer")
llamarApi("monogatari Series")