// products = [
//     {
//         name: "Berry Leash",
//         img: 'http://ec2-13-233-244-214.ap-south-1.compute.amazonaws.com/buffet2.jpg',
//         price: 4.99,
//         onsale: 0.0,
//         tags: "Leash",
//         description: "A fresh taste on a collar,"
//     },
//     {
//         name: "Tommy Leash",
//         img: 'http://ec2-13-233-244-214.ap-south-1.compute.amazonaws.com/buffet2.jpg',
//         price: 14.99,
//         onsale: 0.0,
//         tags: "Leash",
//         description: "A fresh taste on a collar,"
//     },
//     {
//         name: "Tommy Leash",
//         img: 'http://ec2-13-233-244-214.ap-south-1.compute.amazonaws.com/buffet2.jpg',
//         price: 14.99,
//         onsale: 0.0,
//         tags: "Leash",
//         description: "A fresh taste on a collar,"
//     },
//     {
//         name: "Tommy Leash",
//         img: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/zbrpxvywfsrrb7os11jf',
//         price: 14.99,
//         onsale: 0.0,
//         tags: "Leash",
//         description: "A fresh taste on a collar,"
//     },
//     {
//         name: "Tommy Leash",
//         img: 'http://ec2-13-233-244-214.ap-south-1.compute.amazonaws.com/buffet2.jpg',
//         price: 14.99,
//         onsale: 0.0,
//         tags: "Leash",
//         description: "A fresh taste on a collar,"
//     },
//     {
//         name: "Tommy Leash",
//         img: 'http://ec2-13-233-244-214.ap-south-1.compute.amazonaws.com/buffet2.jpg',
//         price: 14.99,
//         onsale: 0.0,
//         tags: "Leash",
//         description: "A fresh taste on a collar,"
//     }
// ]

// products.forEach(product => {
//     var div = document.querySelector('#products')

//     div.innerHTML = div.innerHTML + `

//         <a href="#" target="_blank"></a>
//         <div class="column">
//             <div class="card">
//                 <img src="${product.img}" style="width:80%">
//                 <h2>${product.name}</h2>
//                 <p>${product.price}</p>
//             </div>
//         </div>
//   `
// })


var baseUrl = 'http://localhost:8080/api'

function getVenue(e) {
    e.preventDefault()

    fetch(baseUrl + '/venues/get-new')
        .then((response) => { return response.json(); })
        .then(data => {
            // let products = data;
            return data.forEach(data => {
                data['daysNumber'] = 0;
                var div = document.querySelector('#products')
            
                div.innerHTML = div.innerHTML + `
            
                    <a href="#" target="_blank"></a>
                    <div class="column">
                        <div class="card">
                            <img src="${data.imagelink}" alt="no picture-picture of buffet" style="width:80%">
                            <h2>${data.Vname}</h2>
                            <p>${data.Vprice}</p>
                            <p>${data.capacity} capacity     <span style="background-color: #48c479; padding:0.5em; color:white;
                            margin-left: 1.2em;
                            border-radius: 0.5em;
                        "> <span class="icon-star"></span>${data.vratings}<span></p>
                            <a href="homepage1.html"><button class="allbutton" type="submit" id="btn" >Book</button></a>
                        </div>
                    </div>
              `
            });
        })
        .catch(error => { console.log(error); })
}