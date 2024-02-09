let dataDict = [];
let refreshChatLoop;
let length = 4;
let email1 ="p_email";
let email2 = "d_email";
let isDoc = 0;
let additionalString
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Retrieve email1 and email2 from URL parameters and log them to the console
email1 = getUrlParameter('email1');
email2 = getUrlParameter('email2');
additionalString = getUrlParameter('additional');
if (additionalString == "doctor"){
    isDoc = 1;
}
// Function to set up initial data and start chat loop
const doSetup = () => {
    // Your existing code for setting up email1, email2, and additionalString...

    // Check if email1 or email2 is set
    if (email1 !== "" || email2 !== "") {
        // Add text boxes for email1 and email2
        addTextBox(email1, 1);
        addTextBox(email2, 0);

        // Retrieve initial data and start chat loop
        askData(email1, email2)
            .then(data => {
                dataDict = data;
                updateChatScreen();
                startChatLoop();
            })
            .catch(err => {
                console.error('Error retrieving initial data:', err);
            });
    }

};

// Function to retrieve data from server and update chat screen
const askData = (emailZero, emailOne) => {
    return fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'emailZero': emailZero, 'emailOne': emailOne}),
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

// Function to start the chat loop
const startChatLoop = () => {
    refreshChatLoop = setInterval(() => {
        askData(email1, email2)
            .then(newData => {
                //console.log("Stringified value is: "+JSON.stringify(newData))
                if(dataDict==JSON.stringify(newData)){
                
                    dataDict = JSON.stringify(newData);
                    updateChatScreen();
                }
                    
                
            })
            .catch(err => {
                console.error('Error refreshing chat:', err);
            });
    }, 1000);
};

// Function to update the chat screen with the latest data
const updateChatScreen = () => {
    console.log("\nData from within update, dataDict " + dataDict);
    document.getElementById("textContainer").innerHTML = "";
    for (let i = 0; i < dataDict.length; i++) {
        let current = dataDict[i];
        console.log("\nRN: " + current.text);
        if (current.type == 1) {
            addTextBox(current.text, 1);
        } else {
            addTextBox(current.text, 0);
        }
    }
};


// Function to send data to the server
const sendData = (emailZero, emailOne, type, text) => {
    fetch('http://127.0.0.1:8000/new-messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'emailZero': emailZero, 'emailOne': emailOne, 'data': [{'type': type, 'text': text}]}),
    })
    .then(res => res.json())
    .then(data => {
       // console.log("\nData received (new-messages): " + data);
    })
    .catch(err => {
        console.error('Send data error:', err);
    });
};

// Function to handle text submission
const submitText = (state) => {
    console.log("state is: " + state);
    textArea = document.getElementById('textArea');
    text = textArea.value;
    if (text !== "") {
        textArea.value = '';
        console.log(text);
        addTextBox(text, state);
        console.log("state after if is: "+ state);
        sendData(email1, email2, state, text);
        console.log("Sent data");
    }
};

// Function to add a text box to the chat screen
const addTextBox = (text, state) => {
    const container = document.createElement('div');
    const textVals = document.createTextNode(text);
    container.classList.add('textBubble');
    if (state) {
        container.classList.add('self');
    } else {
        container.classList.add('other');
    }
    container.appendChild(textVals);
    endDiv = document.getElementsByClassName('textBubble')[0];
    document.getElementById('textContainer').insertBefore(container, endDiv);
};

// Call doSetup function after a delay
setTimeout(() => {
    console.log("Starting setup");
    doSetup();
}, 1000);
