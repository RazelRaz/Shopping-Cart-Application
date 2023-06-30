let body = document.querySelector('body');
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let product_area_products = document.querySelector('.product_area-products');
let cart_items = document.querySelector('.cart_items');
let subtotalEl = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

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
                <img src="${product.image}" alt="${product.name}">
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
        // alert('product already exists in the cart')
        changeNumberOfUnits('plus', id)
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

// if(numberOfUnits > item.inStock){
//     alert('No more items in stock')
//     console.log('No more items in stock');
// }

// Calculate and render subtotal
function renderSubtotal(){
    let totalPrice = 0, totalItems = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    })
    subtotalEl.innerHTML = `(${totalItems} Items) $${totalPrice.toFixed(2)}`;
    quantity.innerHTML = `${totalItems}`
}

// render Cart Items
function renderCartItems(){
    cart_items.innerHTML = '' //clear cart element
    cart.forEach((item) => {
        cart_items.innerHTML += `
            <div class="cart_item">
                <div class="item_info">
                    <img src="${item.image}" alt="${item.name}">
                    <h4>${item.name}</h4>
                </div>
                <div class="unit_price">
                    <small>$</small>${item.price}
                </div>
                <div class="units">
                    <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id} )">-</div>
                    <div class="number">${item.numberOfUnits}</div>
                    <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
                    <div class="recycleBin" onclick="removeItemFromCart(${item.id})">
                        <img src="images/recycle-bin.png">
                    </div>
                </div>
            </div>
        `
    })
}

//remove Item from cart
function removeItemFromCart(id){
    cart = cart.filter((item) => item.id !== id)
    updateCart()
}


//change number of units for an item
function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            if(action === 'minus' && numberOfUnits > 1){
                numberOfUnits--
            } else if (action === 'plus' && numberOfUnits < item.inStock){
                
                numberOfUnits++
            }
            
        }
        return {
            ...item,
            numberOfUnits,
            
        }

    })
    updateCart()
}