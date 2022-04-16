
// variables and constants
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;
var baseUrl = 'http://localhost:8080/api'

eventListeners();

// all event listeners
function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        // loadJSON();
        loadCart();
    });
    // // toggle navbar when toggle button is clicked
    // document.querySelector('.navbar-toggler').addEventListener('click', () => {
    //     document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
    // });

    // show/hide cart container
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    // add to cart
    productList.addEventListener('click', purchaseProduct);

    // delete from cart
    cartList.addEventListener('click', deleteProduct);
}

// update cart info
function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

// load product items content form Venue table
function loadVenue(){
    fetch(baseUrl + '/venues/get-new')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            product['type'] = 'venue';

            html += `
            <div class="card">
                <div class = "product-item">
                    <div class = "product-img">
                        <img class="" style="width:90%"     src = "${product.imagelink}" alt = "product image">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add To Cart
                        </button>
                    </div>

                    <div class = "product-content">
                        <h3 class = "product-name">${product.Vname}</h3>
                        <span class = "product-capacity">${product.capacity} cap</span>
                        <p><span style="background-color: #48c479; padding:0.5em; color:white;margin-left: 1.2em;border-radius: 0.5em;"> <span class="icon-star"></span>${product.vratings}<span></span></p>
                        <p class = "product-price">Rs ${product.Vprice}</p>

                        

                        
                        <p class="product-unique-id" style="display:none">${product.Vid}</p>
                        <p class="product-type" style="display:none">${product.type}</p>


                    </div>
                </div>
            </div>
            
            `;
        });
        productList.innerHTML = html;
    })
    .catch(error => {

        //<p style="display:hidden"> ${product.type}</p>
        // alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}


// load product items content form Artists table
function loadArtist(){
    fetch(baseUrl + '/artists/get-new')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            product['type'] = 'artists';

            html += `
            <div class="card">
                <div class = "product-item">
                    <div class = "product-img">
                        <img class="" style="width:90%"     src = "${product.imagelink}" alt = "product image">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add To Cart
                        </button>
                    </div>

                    <div class = "product-content">
                        <h3 class = "product-name">${product.Name}</h3>
                        <span class = "product-capacity">${product.speciality} spec</span>
                        <p class = "product-price">Rs ${product.price}</p>

                        
                        <p class="product-unique-id" style="display:none">${product.Artist_id}</p>
                        <p class="product-type" style="display:none">${product.type}</p>


                    </div>
                </div>
            </div>
            
            `;
        });
        productList.innerHTML = html;
    })
    .catch(error => {

        //<p style="display:hidden"> ${product.type}</p>
        // alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}



// load product items content form Artists table
function loadCatering(){
    fetch(baseUrl + '/restaurants/get-new')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            product['type'] = 'hotels';

            html += `
            <div class="card">
                <div class = "product-item">
                    <div class = "product-img">
                        <img class="" style="width:90%"     src = "${product.imagelink}" alt = "product image">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add To Cart
                        </button>
                    </div>

                    <div class = "product-content">
                        <h3 class = "product-name">${product.Name}</h3>
                        <span class = "product-capacity">${product.Capacity} cap</span>
                        <p class = "product-price">Rs ${product.Est_Cost}</p>
                        <p class = "product-cuisine">${product.Cuisine}</p>

                        
                        <p class="product-unique-id" style="display:none">${product.Hotel_id}</p>
                        <p class="product-type" style="display:none">${product.type}</p>


                    </div>
                </div>
            </div>
            
            `;
        });
        productList.innerHTML = html;
    })
    .catch(error => {

        //<p style="display:hidden"> ${product.type}</p>
        // alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}




// purchase product
function purchaseProduct(e){
    if(e.target.classList.contains('add-to-cart-btn')){
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

// get product info after add to cart button click
function getProductInfo(product){

    let uniqueId = product.querySelector('.product-unique-id').textContent;
    uniqueId = uniqueId.trim()
    let products = getProductFromStorage();
    let foundProduct = products.find(el=>{
        return el.uniqueId == uniqueId
    })
    if(foundProduct && foundProduct.hasOwnProperty('name')){
        alert('product already exists in cart')
        return false;
    }


    let productInfo = {
        id: cartItemID,
        type: product.querySelector('.product-type').textContent,
        imagelink: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        capacity: product.querySelector('.product-capacity').textContent,
        price: product.querySelector('.product-price').textContent,
        uniqueId:  uniqueId
    }
    cartItemID++;

    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

// add the selected product to the cart list
function addToCartList(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src = "${product.imagelink}" alt = "product image" style="width:80%">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-capacity">${product.capacity}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>

        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}

// save the product in the local storage
function saveProductInStorage(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// get all the products info if there is any in the local storage
function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // returns empty array if there isn't any product info
}

// load carts product
function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1; // if there is no any product in the local storage
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        // else get the id of the last product and increase it by 1
    }
    products.forEach(product => addToCartList(product));

    // calculate and update UI of cart info 
    updateCartInfo();
}

// calculate total price of the cart and other info
function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(2)); // removing dollar sign
        return acc += price;
    }, 0); // adding all the prices

    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}

// delete product from cart list and local storage
function deleteProduct(e){
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.remove(); // this removes from the DOM only
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); // this removes from the DOM only
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();
}
