//waiting of page to rolad for get DOM elements 
window.onload = () => {
    //selection element in Dom 
    const msgText = document.getElementById("send-text");
    const btnSend = document.getElementById("send-btn");
    const DialogDiv = document.getElementById("dialog");
    
  //function for get use msg texte
    const getUserMsg = () => {

        btnSend.onclick = () => {
            if (!msgText.value) {
                msgText.style.borderColor = "red";
                msgText.placeholder = "Msg is Empty!"
            }
            else {
                // display user msg in DOM
                DialogDiv.innerHTML += `<div class="msgDialog"><label for="user-text" class="user-label">Me</label><p name="user-mesg" id="user-text">${msgText.value}</p></div>`;
               //scroll to buttom when user tape a message
                window.scrollTo(0, document.body.scrollHeight);
                // DialogDiv.scrollTop = DialogDiv.scrollTopMax;
                getRes(msgText.value);
            }
        }
    }

//function for get Api responses
    const getRes = (msg) => {
        //api stuf needed for wordking
        const url = "https://acobot-brainshop-ai-v1.p.rapidapi.com/get?"
        const params =
        {
            bid: '<your bid>',
            key: 'your api key',
            uid: 'mashape',
        };
        const endpoint = `${url}bid=${params.bid}&key=${params.key}&uid=${params.uid}&msg=${msg}`;

        fetch(endpoint, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "<x-rapid-key>",
                "x-rapidapi-host": "<x-rapid-host>"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                //display robt msg in DOM
                DialogDiv.innerHTML += `<div class="msgDialog robot-text-toEnd"><p name="robot-msg" id="robot-text">${data.cnt}</p><img src="./img/robotLabel.png" alt=""></div>`;
                //scroll to buttom when robot send reponse
                window.scrollTo(0, document.body.scrollHeight);

                // DialogDiv.scrollTop = DialogDiv.scrollTopMax;
            })

            .catch(error => {
                console.log(error)
            })
    }
//call function in global scoop
    getUserMsg();

};

