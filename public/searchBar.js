const productsList = document.getElementById("productsList")
const searchBar = document.getElementById("searchBar");
let products = [];

/////////// BUSCADOR DE PRODUCTOS /////////////

//-------- Hay que adaptarlo a React --------

searchBar.addEventListener('keyup', (event) => {
    // Evento Keyup, que se active cuando escribes en el buscador. 
    const searchString = event.target.value.toLowerCase();
    console.log(searchString);
    // searchString, obtenemos el valor de la búsqueda del usuario y la pasamos a minúsculas para que no sea necesario que escriba la primera letra en mayus.
    const filteredProducts = products.filter(products => {
        return products.brand.toLowerCase().includes(searchString) || products.name.toLowerCase().includes(searchString)
        //.includes(searchString) para que los productos que se busquen sólo sean aquellos que contienen lo introducido en el buscador. 
    });

    displayProducts(filteredProducts);

})

//// PETICIÓN PRODUCTOS ////

const loadProducts = async (req, res) => {
    try{
        const response = await fetch('http://localhost:8888/searchProducts');
        products = await res.jason();
        displayProducts(products);
    } catch (error){
        return `Ops, hemos encontrado un ${error}`
    }
}

//// PINTAR PRODUCTOS EN PANTALLA ////

const displayProducts = (products) => {
    const htmlString = products
    htmlString.map((products) => {
        return ` <li class="products">
                <h2>${products.brand}</h2>
                <h3>${products.name}</h3>
                <h4>${products.stamp}</h4`
    }).join('');

    productsList.innerHTML = htmlString;
}
