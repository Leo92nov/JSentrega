const divTitulos = document.getElementById("divTitulos");
let variacion = ""
const URLTitulos = "../db/dataCedears.json"

async function obtenerCedears() {
    try {
        const response = await fetch(URLTitulos);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();
        renderCedears(data);
    } catch (error) {
        console.error("Hubo un error al obtener los CEDEARs:", error);
        divTitulos.innerHTML = "<p>Error al cargar los datos.</p>";
    }
}
obtenerCedears()
function renderCedears(Cedears) {
    Cedears.forEach(cedear => {
        const variacionPorcentual = (((cedear.precio * 100) / cedear.ultimoPrecio) - 100).toFixed(2);
        const variacionNominal = (cedear.precio - cedear.ultimoPrecio);
        const clase = variacionNominal < 0 ? "mala" : "buena";

        const linea = document.createElement("section");
        linea.classList.add("sectionTitulos");

        linea.innerHTML = `
            <section>${cedear.ticker}</section>
            <section>${cedear.Nombre}</section>
            <section>${(cedear.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</section>
            <section>${(cedear.ultimoPrecio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</section>
            <section class="${clase}">${variacionPorcentual}%</section>
            <section class="${clase}">${(variacionNominal).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</section>
        `;

        divTitulos.appendChild(linea);
        linea.addEventListener("click", () => {
            const CompraClick = {
                Nombre: cedear.Nombre,
                ticker: cedear.ticker
            };
            const cedearAComprar = JSON.stringify(CompraClick)
            localStorage.setItem("cedearAUsar", cedearAComprar)
            window.location.replace("./ordenes.html")
        })

    });
}
