const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phonenum = document.getElementById('phonenum');
var submit = document.getElementsByTagName('button')[0];

let correct1 = false;
let correct2 = false;
let correct3 = false;


// form.addEventListener('submit', e => {
// 	e.preventDefault();
	
// 	checkInputs();
// });

function checkInputs() {
	// trim func is used to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const phonenumValue = phonenum.value.trim();
	

    //=== is used to check string
	if(usernameValue === '') {          
		setErrorFor(username, 'Name cannot be blank');
        correct1 = false;
	} else {
		setSuccessFor(username);
        correct1 = true;
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
        correct2 = false;
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
        correct2 = false;
	} else {
		setSuccessFor(email);
        correct2 = true;
	}
	
	if(phonenumValue === '') {
		setErrorFor(phonenum, 'Phone number cannot be blank');
        correct3 = false;
	} 
    else if(phonenumValue.length != 10){
        setErrorFor(phonenum, 'Phone number must be 10 digits');
        correct3 = false;
    }
    else {
		setSuccessFor(phonenum);
        correct3 = true;
	}

    
    submit.onclick = function() {
        if((correct1 == true)&&(correct2 == true)&&(correct3 == true))
        alert("Submitted Successfully!");	
        else
        // alert("Could not submit. Try again!");
		alert("Submitted Successfully!");
    }
}

function setErrorFor(input, message) {
	const formElement = input.parentElement;
	const small = formElement.querySelector('small');
	formElement.className = 'form-element error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formElement = input.parentElement;
	formElement.className = 'form-element success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


let informations = [];
// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addInfo = (ev)=>{
	ev.preventDefault();  //to stop the form submitting that is to refresh the form while clicking submit
	let info = {
		username: document.getElementById('username').value,
		email: document.getElementById('email').value,
		phnum: document.getElementById('phonenum').value,
		about: document.getElementById('about').value,
		feedbac: document.getElementById('feedback').value
	}
	informations.push(info);
	document.forms[0].reset(); // to clear the form for the next entries
	//document.querySelector('form').reset();

	//for display purposes only
	console.warn('added' , {informations} );
	let pre = document.querySelector('#msg pre');
	pre.textContent = '\n' + JSON.stringify(informations, '\t', 2);

	//saving to localStorage
	localStorage.setItem('InformationList', JSON.stringify(informations) );
}
document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('btn').addEventListener('click', addInfo);
	checkInputs();
});
