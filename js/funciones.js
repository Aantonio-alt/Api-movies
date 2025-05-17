const opciones = document.querySelector(".button-options")
const opcionesList = document.querySelector(".options")

opciones.addEventListener(`click`, () => {
    opcionesList.classList.toggle(`active`)
})

const crearTarjeta = (titulo) => {
    const tarjeta = document.createElement8("div")
    tarjeta.classList.add8("titulo__tarjeta")

    const infoDiv = document.createElement("div")
    infoDiv.classList.add("titulo__info")

    const nameTarjeta = document.createElement("h2")
    nameTarjeta.classList.add("nombre__tarjeta")
    nameTarjeta.textContent = titulo.name

    const generoDiv = document.createElement("div")
    generoDiv.classList.add("genero__tarjeta")

}