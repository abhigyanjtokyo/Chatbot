const chat_input = document.querySelector("#chatbot-text-input");
const chat_messages =  document.querySelector("#chat-messages")

const url = "https://chatbot-api-fiverr-sample.herokuapp.com/";

function add_message(author, text) {
  chat_messages.innerHTML += `${author} - ${text}`
}

const headers = {
  'Content-Type': 'application/json',
  'Origin': 'http://localhost',
  'Access-Control-Request-Method': 'POST',
  'Access-Control-Request-Headers': 'content-type'}

chat_input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    if (chat_input.value != ""){
      add_message("User", chat_input.value)
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.headers = headers
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
          "text": chat_input.value,
      }));
      xhr.onload = () => {
          var data = JSON.parse(this.responseText);
          add_message("Bot", JSON.stringify(data['data']['text']))
      };
      chat_input.value = "" 
  }
}
});

