let email1 = sessionStorage.getItem('email_self');
console.log("\nemail1 (user email) : "+email1+"\n\n");

let dataDict = [];

let additionalString















const askData = () => {
    return fetch('http://127.0.0.1:8000/get-doctors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'emailZero': 'hello', 'emailOne': 'World'}),
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let k = res.json()
        console.log("Data recieved is: "+k);
        return k;
        
    })
    .catch(err => {
        console.error('Fetch error:', err);
        throw err; // Rethrow the error for handling in higher scope
    });
};

const updateList = () => {
    askData()
            .then(newData => {
                //console.log("Stringified value is: "+JSON.stringify(newData))

                
                    dataDict = JSON.parse(JSON.stringify(newData.data));
                    console.log("Stringified value is: "+dataDict);
                    console.log("datadict value: "+ dataDict);
                       

        
                    setTimeout(() => {
                        console.log("\n\nStarting generation...\n");
                        console.log("datadict value: "+ dataDict);
                        console.log("dataDict length: "+ dataDict.length);
                        for(let i = 0; i < dataDict.length; i++) {
                            let current = dataDict[i];
                            console.log("RN: "+ current);
                            createDoctor(current.name, current.email, current.speciality);

                        }


                    }, 500)
                
                    
                
            })
            .catch(err => {
                console.error('Error refreshing chat:', err);
            });

}


// const startChatLoop = () => {
//     refreshChatLoop = setInterval(() => {
//         askData(email1, email2)
//             .then(newData => {
//                 //console.log("Stringified value is: "+JSON.stringify(newData))
//                 if(dataDict==JSON.stringify(newData)){
                
//                     dataDict = JSON.stringify(newData);
//                     updateChatScreen();
//                 }
                    
                
//             })
//             .catch(err => {
//                 console.error('Error refreshing chat:', err);
//             });
//     }, 1000);
// };





const clickChat = (emailDoc) => {

        let email2 = emailDoc;
        additionalString = 'patient';
        let url = "chat.html?email1=" + encodeURIComponent(email1) + "&email2=" + encodeURIComponent(email2) + "&additional=" + encodeURIComponent(additionalString);
        window.open(url, "_blank");
        

}

const createDoctor = (name, email, speciality) => {
    let n = Math.floor(Math.random()*6+1)
    let htmlval = `<div class="doctor-label"><img src="../resources/images/faces/face${n}.png" alt=""><div class="info"><p>Name : ${name}</p><p>Speciality : ${speciality}</p><p>Contact : ${email}</p><div class="chat"><p>Chat</p> <img src="../resources/images/send.png" alt=""></div></div></div>`

    const container = document.createElement('div');
    container.addEventListener('click', ()=>{
        clickChat(email);
    });
    container.classList.add("doctor-label");
    container.innerHTML = htmlval;
    // document.
    document.getElementById('docContainer').insertAdjacentElement('afterbegin', container);

}
window.onload = () =>{
    console.log("Starting");
    updateList();
}