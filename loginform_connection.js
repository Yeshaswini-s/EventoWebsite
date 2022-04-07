var formElements = document.getElementById("signupForm").elements;
var formElements2 = document.getElementById("loginForm").elements;
var baseUrl = 'http://ec2-13-233-244-214.ap-south-1.compute.amazonaws.com:8080/api/tutorials'


function insertData() {
    var postData = {};
    for (var i = 0; i < formElements.length; i++)
        if (formElements[i].type != "submit")//we dont want to include the submit-buttom
            postData[formElements[i].name] = formElements[i].value;

    //test
        // postData = {
        //     "UserName": "hi123",
        //     "Name": "hiten",
        //     "Pswd": "hi123",
        //     "phnum": "7348993738",
        //     "mail": "hiten123@gmail.co",
        //     "Address_Id": "erftghjk",
        //     "Dob": "1988-10-21"
        // }

        // postData['UserName'] = postData['UserName'] + (new Date()).getTime()
    //test end

    fetch(baseUrl+'/create-new', {
        method: 'POST',
        body: JSON.stringify(
            postData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        response.json()}
        )

    .then((json) => {
        console.log(json)
    }
        )
    .catch((error) => {
        console.error(error)
      });
    // window.alert('SignUp Successfull');

    // window.location.reload();
}


function checkData(e) {
    e.preventDefault()
    var postData1 = {};
    for (var i = 0; i < formElements2.length; i++)
        if (formElements2[i].type != "submit" || formElements2[i].name != "signedin" )//we dont want to include the submit-buttom
            postData1[formElements2[i].name] = formElements2[i].value;

    fetch(baseUrl+'/login', {
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

            console.log(json['validPassword']);
            if(json['validPassword']){
                alert('valid')
            }
            else{
                alert('invalid user')

            }
            return json
        }
            )
        .catch((error) => {
            console.error(error)
          });
    // window.alert('SignUp Successfull');

    // window.location.reload();
}


