
// variables and constants
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const productList2 = document.querySelector('.hotel-list');
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
    if(productList)
    productList.addEventListener('click', purchaseProduct);
    
    if(productList2)
    productList2.addEventListener('click', purchaseProduct);

    

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
                        <span class = "product-capacity">${product.capacity} people</span>
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
                        <span class = "product-capacity">${product.speciality} </span>
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
                        <button type = "button" class = "quick-view">
                            <i class = "fas fa-shopping-cart"></i> Quick View
                        </button>
                    </div>

                    <div class = "product-content">
                        <h3 class = "product-name">${product.Name}</h3>
                        <p class = "product-price">Rs ${product.Est_Cost}</p>
                        <p class = "product-cuisine">${product.Cuisine}</p>

                        
                        <p class="product-unique-id" style="display:none">${product.Hotel_id}</p>
                        <p class="product-type" style="display:none">${product.type}</p>


                    </div>
                </div>
            </div>
            
            `;
        });
        productList2.innerHTML = html;
        productList2.addEventListener('click', showFoods);

    })
    .catch(error => {

        //<p style="display:hidden"> ${product.type}</p>
        // alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}

//end of food list display
//to show food items

function showFoods(e){
    if(e.target.classList.contains('quick-view')){
        let product = e.target.parentElement.parentElement;
        let uniqueId = product.querySelector('.product-unique-id').textContent;
        uniqueId = uniqueId.trim()

        showFoodsList(uniqueId);
    }
}

function showFoodsList(uniqueId){
    let foodBody = { "Hotel_Id": uniqueId}

    let hotelExists = localStorage.getItem("hotelSelected");
    hotelExists = hotelExists ? JSON.parse(hotelExists) : hotelExists
    if(hotelExists)
    {
        if(hotelExists != uniqueId)
        {
            let confirmAction = confirm('product from another hotel exists in cart! Do you want to clear the cart')
            if (confirmAction) {
                alert("Successfully cleared the cart");
                let productsReceived = getProductFromStorage();
                let filteredArr = productsReceived.filter(el => {
                    return el.HotelId != hotelExists
                    localStorage.setItem("hotelSelected", uniqueId);
                })

                localStorage.setItem('products', JSON.stringify(filteredArr))
                localStorage.setItem('hotelSelected',null)
                window.location.reload()

            } else {
                alert("Action canceled");
                return false;
            }
        }
    }
    

    fetch(baseUrl+'/foods/get-foods', {
        method: 'POST',
        body: JSON.stringify(
            foodBody),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
           return response.json()}
            )

        .then((json) => {
            console.log(json)
            loadFoodHtml(json)
            return json
        }
            )
        .catch((error) => {
            console.error(error)
          });

}

function loadFoodHtml(json){
    let html = '';
    let data = json
        data.forEach(product => {
            product['type'] = 'foods';
            product['subtype'] = 'foods';

            html += `
            <div class="card">
                <div class = "product-item">
                    <div class = "product-img">
                        <img class="" style="width:90%"     src = "${product.imagelink}" alt = "product image">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add to cart
                        </button>
                    </div>

                    <div class = "product-content">
                        <h3 class = "product-name">${product.Name}</h3>
                        <span class = "product-capacity">${product.Type_SMDB} </span>
                        <p class = "product-price">Rs ${product.Price}</p>
                        <p class = "product-hoteldesc"> ${product.Hotel_Name}</p>
                        <p class = "product-hoteldesc"> ${product.Cuisine}</p>

                        <p class="product-hotel-id" style="display:none">${product.Hotel_Id}</p>
                        <p class="product-unique-id" style="display:none">${product.Food_id}</p>
                        <p class="product-type" style="display:none">${product.type}</p>
                        <p class="product-subtype" style="display:none">${product.subtype}</p>


                    </div>
                </div>
            </div>
            
            `;
        });
        productList2.innerHTML = html;
}

//end of food list display


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

    let foundHotel = products.find(el=>{
        return el.type == "hotels" 
    })
    if(foundHotel && foundHotel.hasOwnProperty('type')){
        alert('product from another hotel exists in cart')
        return false;
    }


    let productInfo = {
        id: cartItemID,
        type: product.querySelector('.product-type').textContent,
        // subtype: product.querySelector('.product-subtype').textContent,
        imagelink: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        capacity: product.querySelector('.product-capacity').textContent,
        price: product.querySelector('.product-price').textContent,
        uniqueId:  uniqueId

    }


    if(productInfo.type == "foods")
    {
        productInfo['HotelId'] = product.querySelector('.product-hotel-id').textContent
    }

    // if(productInfo.type == "foods")
    // {
    //     productInfo['HotelId'] = localStorage.getItem("hotelSelected");
    // }



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
        <img src = "${product.imagelink}" alt = "product image" style="width:80%; height:7em">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-capacity">${product.capacity}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>

        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;

    if(product.type == "foods")
    {
        localStorage.setItem("hotelSelected", product.HotelId);
    }
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









//search option for artists

function showArtistsListByName(Name){
    let artistBody = { "Name": Name}

    // if(artistBody['Name'] == null)
    // {
    //     alert('Please enter a artist name to search first! It cant be empty!!')
    //     return false;
    // }

    fetch(baseUrl+'/artists/get-new-byname', {
        method: 'POST',
        body: JSON.stringify(
            artistBody),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
           return response.json()}
            )

        .then((json) => {
            console.log(json)
            loadArtistHtmlSearch(json)
            return json
        }
            )
        .catch((error) => {
            console.error(error)
          });

}

function loadArtistHtmlSearch(json){
    let html = '';
    let data = json
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
}




//search option for Venues

function showVenueListByName(Name){
    let venueBody = { "Name": Name}

    // if(venueBody['Name'] == null)
    // {
    //     alert('Please enter a venue name to search first! It cant be empty!!')
    //     return false;
    // }

    fetch(baseUrl+'/venues/get-by-venuename', {
        method: 'POST',
        body: JSON.stringify(
            venueBody),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
           return response.json()}
            )

        .then((json) => {
            console.log(json)
            loadVenueHtmlSearch(json)
            return json
        }
            )
        .catch((error) => {
            console.error(error)
          });

}

function loadVenueHtmlSearch(json){
    let html = '';
    let data = json
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
}





//payments page create
// function createOrders(e) {
//     e.preventDefault()
//     let postData1 = {}

//     postData1["jdoc"] = localStorage.getItem("products")
//     postData1["user_id"] = localStorage.getItem("user_id")


//     fetch(baseUrl+'/orders/create-new', {
//         method: 'POST',
//         body: JSON.stringify(
//             postData1),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//         .then((response) => {
//            return response.json()}
//             )

//         .then((json) => {
//             console.log(json)
//             return json
//         }
//             )
//         .catch((error) => {
//             console.error(error)
//           });
//     // window.alert('SignUp Successfull');

//     // window.location.reload();
// }









//payments page loading
// function loadPayments(){
//     fetch(baseUrl + '/orders/get-new')
//     .then(response => response.json())
//     .then(data =>{
//         let html = '';
//         data.forEach(product => {
//             product['type'] = 'hotels';

//             html += `
//             <div class="card">
//                 <div class = "product-item">
//                     <div class = "product-img">
//                         <img class="" style="width:90%"     src = "${product.imagelink}" alt = "product image">
//                         <button type = "button" class = "quick-view">
//                             <i class = "fas fa-shopping-cart"></i> Quick View
//                         </button>
//                     </div>

//                     <div class = "product-content">
//                         <h3 class = "product-name">${product.Name}</h3>
//                         <span class = "product-capacity">${product.Capacity} cap</span>
//                         <p class = "product-price">Rs ${product.Est_Cost}</p>
//                         <p class = "product-cuisine">${product.Cuisine}</p>

                        
//                         <p class="product-unique-id" style="display:none">${product.Hotel_id}</p>
//                         <p class="product-type" style="display:none">${product.type}</p>


//                     </div>
//                 </div>
//             </div>
            
//             `;
//         });
//         productList2.innerHTML = html;
//         productList2.addEventListener('click', showFoods);

//     })
//     .catch(error => {

//         //<p style="display:hidden"> ${product.type}</p>
//         // alert(`User live server or local server`);
//         //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
//     })
// }





//going to the checkout page and inserting orders in the DB
function createOrders(e) {
    e.preventDefault()
    let postData1 = {}
    let user;
    let quantityPeeps;

    
    postData1["products"] = JSON.parse(localStorage.getItem('products'))
    postData1["user_id"] = localStorage.getItem("user_id")
    postData1["numberOfPeeps"] = localStorage.getItem("numberOfPeeps")

    quantityPeeps = postData1["numberOfPeeps"]
    quantityPeeps = quantityPeeps ? JSON.parse(quantityPeeps) : quantityPeeps
    if(quantityPeeps)
    {
        user = postData1["user_id"]
        user = user ? JSON.parse(user) : user
        if(user)
        {
            console.log("inside if");
            postData1["hotelSelected"] = localStorage.getItem("hotelSelected")
            let arr2 = [];

            postData1.products.forEach(element =>{
                    //    console.log(element.type[0])
                    arr2.push(element.type[0]);
                    
            });

            let unq = new Set(arr2);
            unq = Array.from(unq);
            unq = unq.join("");

            postData1["Order_typ"] = unq;
            console.log(postData1["Order_typ"]);
            postData1["noofpeeps"] = localStorage.getItem("numberOfPeeps");


            fetch(baseUrl+'/checkouts/create-new', {
                method: 'POST',
                body: JSON.stringify(
                    postData1),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                return response.json()}
                    )

                .then((json) => {
                    console.log(json)
                    return json
                }
                    )
                .catch((error) => {
                    console.error(error)
                });

                alert("Your Order was Booked successfully!!!");

        }
        else
        {
            alert("You are not Logged in! Please login first to Checkout!");
        }

    }
    else
    {
        alert("Enter the number of people you are booking for to proceed!");
    }
    // window.alert('SignUp Successfull');

    // window.location.reload();
}



function saveQuantity(){
    let numberOfPeeps;
    numberOfPeeps = document.getElementById("foodQuantity").value
    localStorage.setItem("numberOfPeeps", numberOfPeeps);
}

function loadQuantity(){
    let numberOfPeeps;
    numberOfPeeps = localStorage.getItem("numberOfPeeps");
    numberOfPeeps = numberOfPeeps ? JSON.parse(numberOfPeeps) : numberOfPeeps
    if(numberOfPeeps)
    {
        document.getElementById("foodQuantity").value = numberOfPeeps;
    }
}