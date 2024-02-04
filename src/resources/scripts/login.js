const CheckUser = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let err = document.getElementById('passwordConfirm');
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