
//code for orderdisplay.html page
const orderList = document.querySelector('.table-section');
const venuedisplay = document.getElementById("main-content");
var baseUrl = 'http://localhost:8080/api'
function displayOrderedItems()
{
    let postData1 = {};
    postData1["products"] = JSON.parse(localStorage.getItem('products'));
    let html;
    html = `
    <center><h1 class="order-header">Thenk you for Booking our services!</h1><br><br>
    <table id="table">
            <tr class="header-row">
                <th class="header-item items">NAME</th>
                <th class="header-item items">PRICE</th>
                <th class="header-item items">TYPE</th>
            </tr>
    `;

    postData1.products.forEach(element =>{

        html += `
            <tr class="table-rows">
                <td class="items">${element.name}</td>
                <td class="items">${element.price}</td>
                <td class="items">${element.type}</td>
            </tr>
            
            `;
    });

    html += `
    </table>
    </center>
    `;

    orderList.innerHTML = html;
}



// $(document).ready(function(){
        
//     $('#submenu li a').on('click', function(e){
//        // $('#submenu').removeClass('in');
//       $('#submenu').toggleClass();
//     });
    
//  });
function hi(){

    return `
    <ul class="menus">
    <li class="item" id="profile">
        <a href="#profile"><i class="fas fa-user"></i>Profile</a>
        <div class="sub-menus">
            <a href="#">Posts</a>
            <a href="#">Picture</a>
        </div>
    </li>
    <li class="item" id="messages">
        <a href="#messages"><i class="fas fa-envelope"></i>Messages</a>
        <div class="sub-menus">
            <a href="#">New</a>
            <a href="#">Sent</a>
            <a href="#">Spam</a>
        </div>
    </li>
    <li class="item" id="settings">
        <a href="#settings"><i class="fas fa-cog"></i>Settings</a>
        <div class="sub-menus">
            <a href="#">language</a>
            <a href="#">Password</a>
        </div>
    </li>
    <li class="item">
        <a href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
    </li>
</ul>
    `
}

function bye(){

    return `
    <ul class="menus">
    para para
</ul>
    `
}

function bleh(menuid){
    // document.getElementById('hi').style.display = "none";

    switch (menuid) {
        case 'hi':
            document.getElementById("main-content").innerHTML = hi();

            
            break;

            case 'bye':
                document.getElementById("main-content").innerHTML = bye();
                
                
                break;

            case 'dispv':
                let flag = "venue";
                loadUserBody(flag);
                break;

            case 'dispa':
                let flag1 = "artist";
                loadUserBody(flag1);
                break;

            case 'dispf':
                let flag2 = "food";
                loadUserBody(flag2);
                break;

            case 'userdisplay':
                let flag3 = "user"
                loadUserBody(flag3);
                break;

            case 'userlogout':
                logoutClick();
                
                break;
    
        default:
            break;
    }
}




//Actual code starts here for displaying order history..

///Actual Code starts here....

function loadUserBody(value){
    let user_id;
    user_id = localStorage.getItem("user_id");
    // dateBooked = dateBooked ? JSON.parse(dateBooked) : dateBooked

    if(user_id)
    {
    
        if(value == "user"){
            getUserDetails(user_id)
        }
        else
        {
            showOrderListByUserID(user_id, value);
        }

        
    }
    else{
        let html = '';

        html += `
            
        <div class="user-display">
            <h1>Hi User</h1>
            <br>

            <div class="label-tag">You have not Logged in yet! Please Login to check details.</div>

        </div>
        `;
    venuedisplay.innerHTML = html;
    }
}

function getUserDetails(user_id){
    let userBody = { "user_id": user_id}

    fetch(baseUrl+'/tutorials/profile', {
        method: 'POST',
        body: JSON.stringify(
            userBody),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
           return response.json()}
            )

        .then((json) => {
            console.log(json)
            showUserDetails(json)
            return json
        }
            )
        .catch((error) => {
            console.error(error)
          });

}


function showUserDetails(json){
    let html = '';


    let data = json

    //trimming for date
    var string = data[0].Dob;
    var length = 10;
    var date = string.substring(0, length);
        // console.log("data", data);
    // console.log("gender",data[0]["Name"]);
    // console.log("gender",data[0]["Gender"]);
    // console.log("gender",data[0].Gender);
        // data.forEach(actualvenidorders => {
            // product['type'] = 'artists';

            html += `
            
            <div class="user-display">
                <h1>Hi ${data[0].UserName}</h1>
                <br>

                <div class="label-tag">Name</div>
                <div class="input-tag">${data[0].Name}</div>

                <div class="label-tag">Phone</div>
                <div class="input-tag">${data[0].phnum}</div>

                <div class="label-tag">Mail</div>
                <div class="input-tag">${data[0].mail}</div>

                <div class="label-tag">Date of Birth</div>
                <div class="input-tag">${date}</div>

                <div class="label-tag">Gender</div>
                <div class="input-tag">${data[0].Gender}</div>

            </div>
            

            `;
            


    venuedisplay.innerHTML = html;

}




function showOrderListByUserID(user_id, val){
    let userBody = { "user_id": user_id}
    let chooseFunc = val;

    fetch(baseUrl+'/checkouts/order-history', {
        method: 'POST',
        body: JSON.stringify(
            userBody),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
           return response.json()}
            )

        .then((json) => {
            console.log(json)
            if(chooseFunc == "venue")
            {
                loadVenueOrdersDisplay(json)
            }
            else if(chooseFunc == "artist")
            {
                loadArtistOrdersDisplay(json)
            }
            else
            {
                loadFoodOrdersDisplay(json)
            }
            return json
        }
            )
        .catch((error) => {
            console.error(error)
          });

}

function loadVenueOrdersDisplay(json){
    let html = ' <div class="table-section">';

    let price = 0;

    html = `
   
    <center><h1 class="order-header">Venues!</h1><br><br>
    <table id="table">
            <tr class="header-row">
                <th class="header-item items">ORDER-ID</th>
                <th class="header-item items">DATE</th>
                <th class="header-item items">NAME</th>
                <th class="header-item items">PRICE</th>
            </tr>
    `;

    let data = json.actualvenidorders
        data.forEach(actualvenidorders => {
            // product['type'] = 'artists';


            if(actualvenidorders.dateBooked != null)
            {
                //trimming for date
                var string = actualvenidorders.dateBooked;
                var length = 10;
                var date = string.substring(0, length);
            }
            else
            {
                var date = actualvenidorders.dateBooked;
            }



            html += `
            <tr class="table-rows">
                <td class="items">${actualvenidorders.order_id}</td>
                <td class="items">${date}</td>
                <td class="items">${actualvenidorders.venueid[0].Vname}</td>
                <td class="items">${actualvenidorders.venueid[0].Vprice}</td>
            </tr>
            
            `;

            price += actualvenidorders.venueid[0].Vprice;
        });

    html += `
    </table>
        <br>
    <h1 class="order-price" style="font-size: 2em">Your total spending on Venues is  Rs.${price}</h1>
    </center>
    </div>
    `;


    venuedisplay.innerHTML = html;
}



function loadFoodOrdersDisplay(json){
    let html = ' <div class="table-section">';

    let price = 0;

    html = `
   
    <center><h1 class="order-header">Catering!</h1><br><br>
    <table id="table">
            <tr class="header-row">
                <th class="header-item items">ORDER-ID</th>
                <th class="header-item items">DATE</th>
                <th class="header-item items">NAME</th>
                <th class="header-item items">PRICE</th>
            </tr>
    `;

    let data = json.actualfoodidorders
        data.forEach(actualvenidorders => {
            // product['type'] = 'artists';

            if(actualvenidorders.dateBooked != null)
            {
                //trimming for date
                var string = actualvenidorders.dateBooked;
                var length = 10;
                var date = string.substring(0, length);
            }
            else
            {
                var date = actualvenidorders.dateBooked;
            }

            html += `
            <tr class="table-rows">
                <td class="items">${actualvenidorders.order_id}</td>
                <td class="items">${date}</td>
                <td class="items">${actualvenidorders.foodid[0].Name}</td>
                <td class="items">${actualvenidorders.foodid[0].Price}</td>
            </tr>
            
            `;

            // price += actualvenidorders.foodid[0].Vprice;
        });

    html += `
    </table>
        <br>
    
    </center>
    </div>
    `;

    //commented this line
    // <h1 class="order-price" style="font-size: 2em">Your total spending on Venues is  Rs.${price}</h1>

    venuedisplay.innerHTML = html;
}


function loadArtistOrdersDisplay(json){
    let html = ' <div class="table-section">';

    let price = 0;

    html = `
   
    <center><h1 class="order-header">Artists!</h1><br><br>
    <table id="table">
            <tr class="header-row">
                <th class="header-item items">ORDER-ID</th>
                <th class="header-item items">DATE</th>
                <th class="header-item items">NAME</th>
                <th class="header-item items">PRICE</th>
            </tr>
    `;

    let data = json.actualartistidorders
        data.forEach(actualvenidorders => {
            // product['type'] = 'artists';

            if(actualvenidorders.dateBooked != null)
            {
                //trimming for date
                var string = actualvenidorders.dateBooked;
                var length = 10;
                var date = string.substring(0, length);
            }
            else
            {
                var date = actualvenidorders.dateBooked;
            }

            html += `
            <tr class="table-rows">
                <td class="items">${actualvenidorders.order_id}</td>
                <td class="items">${date}</td>
                <td class="items">${actualvenidorders.artistid[0].Name}</td>
                <td class="items">${actualvenidorders.artistid[0].price}</td>
            </tr>
            
            `;

            price += actualvenidorders.artistid[0].price;
        });

    html += `
    </table>
        <br>
    <h1 class="order-price" style="font-size: 2em">Your total spending on Venues is  Rs.${price}</h1>
    </center>
    </div>
    `;


    venuedisplay.innerHTML = html;
}


function logoutClick(){
    this.user_id = null;
    localStorage.removeItem('user_id');
    window.location.reload();
}
