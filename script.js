// let body = document.querySelector('body');
// let openShopping = document.querySelector('.shopping');
// let closeShopping = document.querySelector('.closeShopping');

// openShopping.addEventListener('click', ()=>{
//     body.classList.add('active');
// })
// closeShopping.addEventListener('click', ()=>{
//     body.classList.remove('active');
// })

let body = document.querySelector('body');
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let product_area_products = document.querySelector('.product_area-products');

// sidebar cart open and close
openShopping.addEventListener('click', () => {
    body.classList.add('active')
})

closeShopping.addEventListener('click', () => {
    body.classList.remove('active')
})

// Render Products
function renderProducts(){
    products.forEach((product) => {
        product_area_products.innerHTML += `
            <div class="product_area-product">
                <img src="${product.image}" alt="${product.image}">
                <div class="product_area-product-content">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add To Cart</button>
                </div>
            </div>
        `
    })
}
renderProducts();

// cart array
let cart = [];


// Add to Cart
function addToCart(id) {
    //check if the product already exists in the cart
    if(cart.some((item) => item.id === id)) {
        alert('product already exists in the cart')
    } else {
        const item = products.find((product) => product.id === id)
        cart.push({
            ...item,
            numberOfUnits: 1
        });
        console.log(cart);
    }

    updateCart();
}

// Update Cart
function updateCart(){
    renderCartItems();
    renderSubtotal();
    
}