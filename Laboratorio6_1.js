// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];
var showProductList = () => {
    var main = document.getElementById("main");
    for (var i in products) {
        const product = products[i];
        const productRow = document.createElement("div");
        productRow.setAttribute("class", "element");
        main.appendChild(productRow);
        const productRowLeft = document.createElement("div");
        productRowLeft.setAttribute("class", "element-left");
        productRowLeft.setAttribute("align", "left");
        productRow.appendChild(productRowLeft);
        const productRowRight = document.createElement("div");
        productRowRight.setAttribute("class", "element-right");
        productRowRight.setAttribute("align", "right");
        productRow.appendChild(productRowRight);
        const productOrder = document.createElement("label");
        productOrder.textContent = Number(i) + 1 + ".";
        productRowLeft.appendChild(productOrder);
        const productDescription = document.createElement("label");
        productDescription.setAttribute("for", "productCount" + i);
        productDescription.textContent = product.description + " - " + Number(product.price).toFixed(2) + "€/ud. ";
        productRowRight.appendChild(productDescription);
        const productCount = document.createElement("input");
        productCount.setAttribute("class", "product-count");
        productCount.id = "productCount" + i;
        productCount.type = "number";
        productCount.value = 0;
        productCount.addEventListener("change", event => HandleChangeCount(event));
        productRowRight.appendChild(productCount);
    }
}
var HandleChangeCount = event => {
    const i = Number(event.target.id.substring(12));
    if (Number(event.target.value) < 0) {
        event.target.value = 0;
    };
    if (Number(event.target.value) > products[i].stock) {
        event.target.value = products[i].stock;
    };
    products[i].units = Number(event.target.value);
    var enableCalculate = false;
    var countIterator = 0;
    while (countIterator < products.length && !enableCalculate) {
        enableCalculate = products[countIterator++].units > 0;
    };
    document.getElementById("calculateButton").disabled = !enableCalculate;
}
var calculate = () => {
    var subtotal = 0;
    var taxes = 0;
    for (i in products) {
        productCalculation = products[i].units * products[i].price;
        subtotal += productCalculation;
        switch (products[i].tax) {
            case REGULAR_TYPE:
                taxes += productCalculation * .21;
                break;
            case LOWER_TYPE:
                taxes += productCalculation * .04;
                break;
        }
    }
    var total = subtotal + taxes;
    document.getElementById("subtotal").innerHTML = "Subtotal: " + Number(subtotal).toFixed(2) + " €";
    document.getElementById("IVA").innerHTML = "IVA: " + Number(taxes).toFixed(2) + " €";
    document.getElementById("total").innerHTML = "Total: " + Number(total).toFixed(2) + " €";
}
// ------------- MAIN -------------
showProductList();
