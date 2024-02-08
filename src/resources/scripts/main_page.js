let email1 = sessionStorage.getItem('email_self');


const askData = () => {
    return fetch('http://127.0.0.1:8000/chat', {
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

}

const clickChat = (emailDoc) => {

        let email2 = emailDoc;
        let additionalString = document.getElementById("additionalInput").value;
        let url = "chat.html?email1=" + encodeURIComponent(email1) + "&email2=" + encodeURIComponent(email2) + "&additional=" + encodeURIComponent(additionalString);
        window.open(url, "_blank");
        

}

const createDoctor = () => {
    let htmlval = '<div class="doctor-label"><img src="../resources/images/faces/face1.png" alt=""><div class="info"><p>Name : Doctor_name</p><p>Speciality : Doctor_speciality</p><p>Contact : Doctor_email</p><div class="chat"><p>Chat</p> <img src="../resources/images/send.png" alt=""></div></div></div>'

    const container = document.createElement('div');
    container.classList.add("doctors");
    container.innerHTML = htmlval;
    // document.
    document.getElementById('docContainer').insertAdjacentElement('afterbegin', container);

}