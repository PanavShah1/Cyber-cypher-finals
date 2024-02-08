const LoginUser = () => {
    let email = document.getElementById('Loginemail').value;
    let password = document.getElementById('Loginpassword').value;
    let errbox = document.getElementById('allgood');
    
        // console.log('same');
    
                    console.log('email', email, 'password', password);
                    fetch('http://127.0.0.1:8000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'email': email, 'password': password}),
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        
                        if(data==1){
                            console.log("Logging in")
                            
                        }
                        else if(data==0){
                            console.log("Incorrect password");
                        }
                        else console.log("Invalid credentials");
                        errbox.innerHTML = "Invalid credentials";




                        })
                    .catch(err => {
                        console.log(err);
                    });
                    
                
                
                
}



const CreateUser = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let err = document.getElementById('passwordConfirm');
    console.log(name, email);
    
    
        if (password===password2) {
            if (password2.length>=6){
                    console.log(`email is: ${email}\nPassword is: ${password}`)
                    err.innerHTML = "";

                    let dataVal = -1;
                    fetch('http://127.0.0.1:8000/new-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({'name':name, 'email': email, 'password': password}),
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        
                        if(data==1){
                            console.log("User exists")
                            // window.open('login.html', '_self');
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



    
    

}
const LoginUse = () => {
    console.log("becoming rightClass");
    let mainBar = document.getElementById('movingBar');

    mainBar.innerHTML = '<h1 style="color: black;">Hi, welcome to <br>our website</h1><p>Register to use the website</p><p class="shifter" onclick="SignUpUse()" id="login-shifter"><a>REGISTER</a></p>';

    mainBar.classList.remove('leftClass');
    mainBar.classList.add('rightClass');

    // let elementsToFade = document.getElementById('loginDiv');
    // elementsToFade.classList.remove('active');
    // elementsToFade.classList.add('inactive');
    // let elementsToUnFade = document.getElementById('signupDiv');
    // elementsToUnFade.classList.remove('inactive');
    // elementsToUnFade.classList.add('active');

    

}
const SignUpUse = () => {
    console.log("becoming rightClass");
    let mainBar = document.getElementById('movingBar');

    mainBar.innerHTML = '<h1 style="color: black;">Welcome back</h1><p>Login to the website</p><p class="shifter" onclick="LoginUse()" id="Register-shifter"><a>LOGIN</a></p>';

    mainBar.classList.remove('rightClass');
    mainBar.classList.add('leftClass');

    // let elementsToFade = document.getElementById('signupDiv');
    // elementsToFade.classList.remove('active');
    // elementsToFade.classList.add('inactive');
    // let elementsToUnFade = document.getElementById('loginDiv');
    // elementsToUnFade.classList.remove('inactive');
    // elementsToUnFade.classList.add('active');



    
    // var button = document.createElement('p');
    // button.classList.add('classname');
    // button.innerHTML = "<p class='shifter' onclick='SignUpUse()'><a>Have an account? Login!</a></p>";
    // mainBar.appendChild(button);

}



    
    
