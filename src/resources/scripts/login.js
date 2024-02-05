const LoginUser = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let errbox = document.getElementById('allgood');
    
        // console.log('same');
    

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



    
    
