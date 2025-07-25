let totalinversion
let usuario = localStorage.getItem('usuarioOn')
let usuarioLoggeado = JSON.parse(usuario)

let usuariosJSON = localStorage.getItem("arrayDeUsuarios")
let usuarios = JSON.parse(usuariosJSON)

let OrdenesJSON = localStorage.getItem("arrayDeOrdenes")
let Ordenes = JSON.parse(OrdenesJSON)

let carterasJSON = localStorage.getItem('arrayDeCarteras')
let Carteras = JSON.parse(carterasJSON)

let carteraonJSON = localStorage.getItem("carteraOn")
let carteraOn = JSON.parse(carteraonJSON)

if (!usuarioLoggeado) {
    usuarioLoggeado = { nombre: "Leonardo", nombreUsuario: "36765496", contrasena: "starplatinum", liquidez: 265000, palabraSecreta: "Fantástico", DNI: "36765496" }

}
let Usuario = JSON.stringify(usuarioLoggeado)
localStorage.setItem("usuarioOn", Usuario)


if (Carteras) {

} else {

    Carteras = [
        [
            { Nombre: "Apple Inc", ticker: "AAPL", precio: 2500, cantidad: 60 },
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 25 },
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 31 },
            { Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 22 },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12 },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 70 },
            { Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 37 },
            { Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 42 },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60 }
        ],
        [
            { Nombre: "Apple Inc", ticker: "AAPL", precio: 2500, cantidad: 10 },
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 35 },
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 61 },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12 },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 70 },
            { Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 107 },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60 },
            { Nombre: "Pfizer Inc", ticker: "PFE", precio: 550, cantidad: 60 }
        ],
        [
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 25 },
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 34 },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 22 },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 170 },
            { Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 67 },
            { Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 42 },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 51 }
        ],
        [
            { Nombre: "Apple Inc", ticker: "AAPL", precio: 2500, cantidad: 20 },
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 5 },
            { Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 22 },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 2 },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 7 },
            { Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 7 },
            { Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 4 },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 9 }
        ],
        [
            { Nombre: "Apple Inc", ticker: "AAPL", precio: 2500, cantidad: 60 },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60 },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 27 },
            { Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 55 },
        ],
        [
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 45 },
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 21 },
            { Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 55 },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 21 },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 33 }
        ],
        [
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 125 },
            { Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 232 },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12 },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 700 },
            { Nombre: "Pfizer Inc", ticker: "PFE", precio: 550, cantidad: 60 }
        ],
        [
            { Nombre: "Apple Inc", ticker: "AAPL", precio: 2500, cantidad: 60 },
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 25 },
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 31 },
            { Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 22 },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12 },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 70 },
            { Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 37 },
            { Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 42 },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60 },
            { Nombre: "Palantir Technologies Inc", ticker: "PLTR", precio: 1550, cantidad: 60 },
            { Nombre: "Chevron Texaco Corp", ticker: "CVX", precio: 750, cantidad: 60 },
            { Nombre: "Diageo Plc", ticker: "DEO", precio: 770, cantidad: 60 },
            { Nombre: "Lojas Renner SA", ticker: "LREN3", precio: 580, cantidad: 60 },
            { Nombre: "Aegon NV", ticker: "AEG", precio: 5150, cantidad: 60 },
            { Nombre: "Fedex Corp", ticker: "FDX", precio: 1250, cantidad: 60 },
            { Nombre: "Target Corp", ticker: "TGT", precio: 1420, cantidad: 60 },
            { Nombre: "Caterpillar Inc", ticker: "CAT", precio: 3550, cantidad: 60 },
            { Nombre: "Pfizer Inc", ticker: "PFE", precio: 580, cantidad: 60 },
            { Nombre: "Bristol-Myers Squibb Co.", ticker: "BMY", precio: 2550, cantidad: 60 },
            { Nombre: "The Hershey Company", ticker: "HSY", precio: 1550, cantidad: 60 },
            { Nombre: "SHELL", "ticker": "SHEL", precio: 2750, cantidad: 60 },
            { Nombre: "General Dynamics", "ticker": "GD", precio: 3550, cantidad: 60 },
            { Nombre: "Business Machines Company", ticker: "IBM", precio: 2550, cantidad: 60 },
            { Nombre: "Roku Inc", "ticker": "ROKU", precio: 1550, cantidad: 60 }
        ]
    ]
}
console.log(Carteras);


const CarterasJSON = JSON.stringify(Carteras)
localStorage.setItem("arrayDeCarteras", CarterasJSON)


if (usuarios) {

} else {
    usuarios = [
        { nombre: "Leonardo", nombreUsuario: "36765496", contrasena: "starplatinum", liquidez: 265000, palabraSecreta: "Fantástico" },
        { nombre: "Diego", nombreUsuario: "diego", contrasena: "brando", liquidez: 295000, palabraSecreta: "Financiera" },
        { nombre: "Pablo", nombreUsuario: "pablin", contrasena: "guitarra", liquidez: 25000, palabraSecreta: "8Mile" },
        { nombre: "Alejandro", nombreUsuario: "ale", contrasena: "discordia", liquidez: 465000, palabraSecreta: "Desodorante" },
        { nombre: "Santiago", nombreUsuario: "santi", contrasena: "martin", liquidez: 65000, palabraSecreta: "Octógono" },
        { nombre: "Juan", nombreUsuario: "juan", contrasena: "pablo", liquidez: 5000, palabraSecreta: "Terraforma" },
        { nombre: "Gabriel", nombreUsuario: "gabi", contrasena: "sosa", liquidez: 635000, palabraSecreta: "Ascención" },
        { nombre: "Miguel", nombreUsuario: "miguelon", contrasena: "queen", liquidez: 6350000, palabraSecreta: "Aspirina" }
    ]
}

let usuariosJSONSet = JSON.stringify(usuarios)
localStorage.setItem("arrayDeUsuarios", usuariosJSONSet)


if (Ordenes) {

} else {

    Ordenes = [
        [
            { Nombre: "Coca cola company", ticker: "KO", precio: 1500, cantidad: 10, orden: "compra", id: "1", usuario: "36765496" },
            { Nombre: "Realty Income Corporation", ticker: "O", precio: 650, cantidad: 48, orden: "compra", id: "2", usuario: "36765496" },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1530, cantidad: 20, orden: "compra", id: "3", usuario: "36765496" },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60, orden: "venta", id: "4", usuario: "36765496" }
        ],
        [
            { Nombre: "Coca cola company", ticker: "KO", precio: 1400, cantidad: 40, orden: "compra", id: "5", usuario: "diego" },
            { Nombre: "Realty Income Corporation", ticker: "O", precio: 650, cantidad: 48, orden: "venta", id: "6", usuario: "diego" },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1530, cantidad: 20, orden: "compra", id: "7", usuario: "diego" },
            { Nombre: "Intel Corporation", ticker: "INTC", precio: 1400, cantidad: 4, orden: "compra", id: "8", usuario: "diego" },
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 61, orden: "venta", id: "9", usuario: "diego" },
        ],
        [
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 25, orden: "venta", id: "10", usuario: "pablin" },
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 34, orden: "venta", id: "11", usuario: "pablin" },
        ],
        [
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 70, orden: "compra", id: "12", usuario: "ale" },
        ],
        [
            { Nombre: "Apple Inc", ticker: "AAPL", precio: 2500, cantidad: 60, orden: "venta", id: "13", usuario: "santi" },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60, orden: "venta", id: "14", usuario: "santi" }
        ],
        [
            { Nombre: "Intel Corporation", ticker: "INTC", precio: 1400, cantidad: 3, orden: "compra", id: "15", usuario: "juan" }
        ],
        [
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 40, orden: "compra", id: "16", usuario: "gabi" },
            { Nombre: "Pfizer Inc", ticker: "PFE", precio: 550, cantidad: 40, orden: "venta", id: "17", usuario: "gabi" }
        ],
        [
            { Nombre: "Apple Inc", ticker: "AAPL", precio: 2500, cantidad: 60, orden: "venta", id: "18", usuario: "miguelon" },
            { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 25, orden: "venta", id: "19", usuario: "miguelon" },
            { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 31, orden: "venta", id: "20", usuario: "miguelon" },
            { Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 22, orden: "venta", id: "21", usuario: "miguelon" },
            { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12, orden: "venta", id: "22", usuario: "miguelon" },
            { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 70, orden: "venta", id: "23", usuario: "miguelon" },
            { Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 37, orden: "venta", id: "24", usuario: "miguelon" },
            { Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 42, orden: "venta", id: "25", usuario: "miguelon" },
            { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60, orden: "venta", id: "26", usuario: "miguelon" },
            { Nombre: "Palantir Technologies Inc", ticker: "PLTR", precio: 1550, cantidad: 60, orden: "venta", id: "27", usuario: "miguelon" },
            { Nombre: "Chevron Texaco Corp", ticker: "CVX", precio: 750, cantidad: 60, orden: "venta", id: "28", usuario: "miguelon" },
            { Nombre: "Diageo Plc", ticker: "DEO", precio: 770, cantidad: 60, orden: "venta", id: "29", usuario: "miguelon" },
            { Nombre: "Lojas Renner SA", ticker: "LREN3", precio: 580, cantidad: 60, orden: "venta", id: "30", usuario: "miguelon" },
            { Nombre: "Aegon NV", ticker: "AEG", precio: 5150, cantidad: 60, orden: "venta", id: "31", usuario: "miguelon" },
            { Nombre: "Fedex Corp", ticker: "FDX", precio: 1250, cantidad: 60, orden: "venta", id: "32", usuario: "miguelon" },
            { Nombre: "Target Corp", ticker: "TGT", precio: 1420, cantidad: 60, orden: "venta", id: "33", usuario: "miguelon" },
            { Nombre: "Caterpillar Inc", ticker: "CAT", precio: 3550, cantidad: 60, orden: "venta", id: "34", usuario: "miguelon" },
            { Nombre: "Pfizer Inc", ticker: "PFE", precio: 580, cantidad: 60, orden: "venta", id: "35", usuario: "miguelon" },
            { Nombre: "Bristol-Myers Squibb Co.", ticker: "BMY", precio: 2550, cantidad: 60, orden: "venta", id: "36", usuario: "miguelon" },
            { Nombre: "The Hershey Company", ticker: "HSY", precio: 1550, cantidad: 60, orden: "venta", id: "37", usuario: "miguelon" },
            { Nombre: "SHELL", "ticker": "SHEL", precio: 2750, cantidad: 60, orden: "venta", id: "38", usuario: "miguelon" },
            { Nombre: "General Dynamics", "ticker": "GD", precio: 3550, cantidad: 60, orden: "venta", id: "39", usuario: "miguelon" },
            { Nombre: "Business Machines Company", ticker: "IBM", precio: 2550, cantidad: 60, orden: "venta", id: "40", usuario: "miguelon" },
            { Nombre: "Roku Inc", "ticker": "ROKU", precio: 1550, cantidad: 60, orden: "venta", id: "41", usuario: "miguelon" }
        ] 
    ]

}
console.log(Ordenes);


let arrOrdenes = JSON.stringify(Ordenes)
localStorage.setItem('arrayDeOrdenes', arrOrdenes)


if (carteraOn) {

} else {
    carteraOn = [
        { Nombre: "Apple Inc", ticker: "AAPL", precio: 2500, cantidad: 60 },
        { Nombre: "Coca cola company", ticker: "KO", precio: 1550, cantidad: 25 },
        { Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 31 },
        { Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 22 },
        { Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12 },
        { Nombre: "Lockheed Martin", ticker: "LMT", precio: 2600, cantidad: 70 },
        { Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 37 },
        { Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 42 },
        { Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60 }
    ]
}
let cartera = JSON.stringify(carteraOn)
localStorage.setItem('carteraOn', cartera)


const OrdenesOn = Ordenes.flat().filter(e => e.usuario === usuarioLoggeado.nombreUsuario)
console.log(OrdenesOn);


function mostrarOrdenes(OrdenesOn) {

    const contenedorOrdenes = document.getElementById("divMisOrdenes")

    OrdenesOn.forEach(e => {
        const ordenes = document.createElement("section")
        ordenes.classList.add("sectionMisOrdenes")
        ordenes.style.borderBottom = "1px solid grey";

        ordenes.innerHTML = `
        <section>${e.Nombre}</section>
        <section>${e.ticker}</section>
        <section>$${e.precio}</section>
        <section>${e.cantidad}</section>
        <section class="ordenesUsuario">${e.orden}</section>
        
        `

        contenedorOrdenes.appendChild(ordenes);

        const tipoOrden = ordenes.querySelector(".ordenesUsuario");
        if (e.orden === "compra") {
            tipoOrden.style.color = "green";
        } else if (e.orden === "venta") {
            tipoOrden.style.color = "red";
        }
    });
}



const colorOrdenes = document.getElementsByClassName("ordenesUsuario")


if (OrdenesOn && OrdenesOn.length > 0) {
    mostrarOrdenes(OrdenesOn);
} else {
    const ordenesVacia = document.createElement("section");
    ordenesVacia.classList.add("noHayOrdenes");
    ordenesVacia.innerHTML = `<span>No existen órdenes que mostrar</span>`;
    contenedorOrdenes.appendChild(ordenesVacia);
}



function mostrarInversiones(carteraOn) {

    const contenedorInversiones = document.getElementById("divInversiones");

    carteraOn.forEach((e) => {
        const lineas = document.createElement("section");
        lineas.classList.add("sectionInversion")
        lineas.style.borderBottom = "1px solid grey";

        lineas.innerHTML = `
            <section>${e.Nombre}</section>
            <section>${e.ticker}</section>
            <section>$${e.precio}</section>
            <section>${e.cantidad}</section>
            <section>$${e.cantidad * e.precio}</section>
            <section class="inversionesVenderComprar"><a href="./pages/ordenes.html" class="inversionesComprar">Comprar</a><a href="./pages/ordenes.html" class="inversionesVender">Vender</a></section>
            `;

        contenedorInversiones.appendChild(lineas);
    });
}

const MiCartera = mostrarInversiones(carteraOn)
const totalInversion = carteraOn.reduce((acumulador, e) => {
    return acumulador + (e.cantidad * e.precio);
}, 0);

const totalInversiones = document.getElementById("spanTotalInvertido")
totalInversiones.innerText = "$" + totalInversion

