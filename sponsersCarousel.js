const slideImages = document.querySelector('.slide-track');

var baseUrl = 'http://ec2-13-233-244-214.ap-south-1.compute.amazonaws.com:8080/api'


function loadSponsor(){
	console.log("hello");
    fetch(baseUrl + '/sponsors/get-new')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {

            html += `
			<div class="slide">
			<a href="${product.webpagelink}"><img class="carousel-image"  src="${product.imagelink}" alt="picture of logo of ${product.Name}"></a>
            </div>
				
            
            `;
        });
        slideImages.innerHTML = html;
    })
    .catch(error => {

        //<p style="display:hidden"> ${product.type}</p>
        // alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}