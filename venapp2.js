function loadDateOfBooking(){
    let dateBooked;
    dateBooked = localStorage.getItem("dateBooked");
    // dateBooked = dateBooked ? JSON.parse(dateBooked) : dateBooked
    

    if(dateBooked)
    {
        // document.getElementById("dateEnteredvenpg").value = dateBooked;
        // var dateControl = document.querySelector('input[type="date"]');
        // var dateControl = document.getElementById("dateEntered");
        // dateControl.value = dateBooked;
        document.getElementById("dateEntered").value = dateBooked;
        document.getElementById("dateEntered2").value = dateBooked;
        // console.log(dateControl.value);
    }
}

function saveDateOfBooking(){
    let dateBooked;
    dateBooked = document.getElementById("dateEntered2").value
    localStorage.setItem("dateBooked", dateBooked);
}

function checkdate(){
    const dateInput = document.getElementById('dateEntered2');

    if (!dateInput.value) {
              alert("Choose a fuckin date!");
        console.log('Input type date is empty');
        
    } else {
        window.location('venpage1.html');
        console.log('Input type date is NOT empty');
        console.log(dateInput.value);
    }
}