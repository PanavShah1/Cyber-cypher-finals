const CheckUser = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let err = document.getElementById('passwordConfirm');
    fetch('http://127.0.0.1:8000/new-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'name': "Samanth", 'email:':"samanthmartis@gmail.com", 'password': "1234"}),
    })
    .then(data => {
        console.log(`API data is: ${data}`);
    //     if( data.outcome == '1' ) {
    //         console.log("Recieved 1")


    // }
    // else{
    //     console.log("Recieved 2")
    // }
    }
    )
    .catch(err => {
        console.log(err);
    });
    if(parseInt(email).toString()===email && email.length==10){
        console.log('same');
    
    // console.log( parseInt(email));
        if (password===password2) {
        console.log(`emailile number is: ${email}\nPassword is: ${password}`)
        err.innerHTML = "";

        } else {
            
            err.innerHTML = "passwords must match<br><br>";
            console.log("error");
        }
    } else {
        err.innerHTML = "Invalid Entry<br><br>";
    }


    
    

}