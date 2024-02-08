const arr = [
    {'type': 'other', 'text': 'Hello world'},
    {'type': 'self', 'text': 'world is small'},
    {'type': 'self', 'text': 'Hello universe'},
    {'type': 'other', 'text': 'shuddup'},
];

//0 is patient, 1 is doctor.

let self=0;
let other=0;
let email1;
let email2;
let dataDict;
let refreshChatLoop;
window.onload = () => {


    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Retrieve email1 and email2 from URL parameters and log them to the console
    let email1 = getUrlParameter('email1');
    let email2 = getUrlParameter('email2');
    let additionalString = getUrlParameter('additional');
    
    if(additionalString=="doctor") self = 1;
    else other = 1;
    console.log("Email 1: " + email1);
    console.log("Email 2: " + email2);
    console.log("Additional String: " + additionalString);
    setTimeout(() => {

        //Send first patient, then doctor
        if(email1!="" || email2!=""){
        addTextBox(email1, 1);
        addTextBox(email2, 0);
        }
    }, 500);




    dataDict = askData(email1, email2);
    // refreshChatLoop = setInterval(() => {
    //     let k = askData(email1, email2);
    //     if(dataDict!= k){
    //         dataDict = k;
    //         updateChatScreen();
    //     }
    // }, 1000)


    
    



    for(let i = 0; i < arr.length; i++) {
        let current = arr[i];
        if(current.type === 'self') {
            addTextBox(current.text, 1);
        }
        else if(current.type === 'other') {
            addTextBox(current.text, 0);

        }
    }
}









const updateChatScreen = () => {
    document.getElementById("textContainer").innerHTML = "";
    for(let i = 0; i < dataDict.length; i++) {
        let current = dataDict[i];
        if(current.type === 'self') {
            addTextBox(current.text, 1);
        }
        else if(current.type === 'other') {
            addTextBox(current.text, 0);

        }
    }
    // continue
    console.log("Testing")
}
const askData = (emailZero, emailOne) => {
    let dataToReturn;
    fetch('http://127.0.0.1:8000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({'emailZero':emailZero, 'emailOne': emailOne}),
                }
            )
            .then(res => res.json())
            .then(data => {
                console.log("\nData recieved (chat): "+ data);
                dataToReturn = data;
                }
            )
            .catch(err => {
                console.log(err);
            }
        );
    return dataToReturn
}


//remember to send only 0 or 1
const sendData = (emailZero, emailOne, type, text) => {
    
    fetch('http://127.0.0.1:8000/new-messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({'emailZero':emailZero, 'emailOne': emailOne, 'data': [{'type': type, 'text': text}]}),
                }
            )
            .then(res => res.json())
            .then(data => {
                console.log("\nData recieved (new-messages): "+ data);
    
                }
            )
            .catch(err => {
                console.log(err);
            }
        );

}








const submitText = (state) => {
    textArea = document.getElementById('textArea');
    text = textArea.value;
    if (text!=""){
    textArea.value = '';
    console.log(text);
    addTextBox(text, state);
    }
}

const addTextBox = (text, state) => {
    const container = document.createElement('div');
    const textVals = document.createTextNode(text);
    container.classList.add('textBubble');
    if(state) container.classList.add('self');
    else container.classList.add('other');
    
    container.appendChild(textVals);
    endDiv = document.getElementsByClassName('textBubble')[0];

    document.getElementById('textContainer').insertBefore(container, endDiv);

}