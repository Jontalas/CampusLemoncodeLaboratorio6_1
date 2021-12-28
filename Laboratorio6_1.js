// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const productList = [
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
var showProducts = () => {
    var main = document.getElementById("main");
    for (var i in productList) {
        const product = productList[i];
        const productRow = createProductRow(main);
        const productRowLeft = createProductRowLeft(productRow);
        const productRowRight = createProductRowRight(productRow);
        const productOrder = createProductOrder(i,productRowLeft);
        const productDescription = createProductDescription(product,productRowRight);
        const productCount = createProductCount(product,productRowRight);
    }
}
var createProductRow = (container) => {
    const productRow = document.createElement("div");
    productRow.setAttribute("class", "element");
    container.appendChild(productRow);
    return productRow;
}
var createProductRowLeft = (container) => {
    const productRowLeft = document.createElement("div");
    productRowLeft.setAttribute("class", "element-left");
    productRowLeft.setAttribute("align", "left");
    container.appendChild(productRowLeft);
    return productRowLeft;
}
var createProductRowRight = (container) => {
    const productRowRight = document.createElement("div");
    productRowRight.setAttribute("class", "element-right");
    productRowRight.setAttribute("align", "right");
    container.appendChild(productRowRight);
    return productRowRight;
}
var createProductOrder = (i,container) => {
    const productOrder = document.createElement("label");
    productOrder.textContent = Number(i) + 1 + ".";
    container.appendChild(productOrder);
    return productOrder;
}
var createProductDescription = (product,container) => {
    const productDescription = document.createElement("label");
    productDescription.textContent = product.description + " - " + Number(product.price).toFixed(2) + "€/ud. ";
    container.appendChild(productDescription);
    return productDescription;
}
var createProductCount = (product,container) => {
    const productCount = document.createElement("input");
    productCount.setAttribute("class", "product-count");
    productCount.type = "number";
    productCount.value = 0;
    productCount.min = 0;
    productCount.max = product.stock
    productCount.addEventListener("change", event => HandleChangeCount(event,product));
    container.appendChild(productCount);
    return productCount;
}
var HandleChangeCount = (event,product) => {
    if (Number(event.target.value) < 0) {
        event.target.value = 0;
    };
    if (Number(event.target.value) > product.stock) {
        event.target.value = product.stock;
    };
    product.units = event.target.value;
    var enableCalculate = false;
    var countIterator = 0;
    while (countIterator < productList.length && !enableCalculate) {
        enableCalculate = productList[countIterator++].units > 0;
    };
    document.getElementById("calculateButton").disabled = !enableCalculate;
}
var calculate = () => {
    var subtotal = 0;
    var taxes = 0;
    for (i in productList) {
        productCalculation = productList[i].units * productList[i].price;
        subtotal += productCalculation;
        switch (productList[i].tax) {
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
showProducts();
