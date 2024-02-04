const CheckUser = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let err = document.getElementById('passwordConfirm');
    
    if(parseInt(email).toString()===email && email.length==10){
        console.log('same');
    
    // console.log( parseInt(email));
        if (password===password2) {
            if (password2.length>=6){
                    console.log(`emailile number is: ${email}\nPassword is: ${password}`)
                    err.innerHTML = "";

                    let dataVal = -1;
                    fetch('http://127.0.0.1:8000/new_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'username': 1, 'password': 1}),
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        
                        if(data==1){
                            console.log("User exists")
                        }
                        else if(data==0){
                            console.log("User created");
                        }
                        else console.log("Uncaught Error");




                        })
                    .catch(err => {
                        console.log(err);
                    });
                }
                else err.innerHTML = "Password too short<br><br>";



        } else {
            
            err.innerHTML = "Passwords must match<br><br>";
            console.log("error");
        }
    } else {
        err.innerHTML = "Invalid Entry<br><br>";
    }


    
    

}