'use strict'

/* html's form vars */
const loginForm = document.getElementById('welcome-form'),
  messagesSection = document.getElementById('messages-section'),
  messagesList = document.getElementById('messages-list'),
  addMessageForm = document.getElementById('add-messages-form'),
  userNameInput = document.getElementById('username'),
  messageContentInput = document.getElementById('message-content');

/* global vars */
let userName;
const select = {
  classes: {
    show: 'show',
    message: 'message',
    msgSelf: 'message--self',
    msgReceived: 'message--received',
    msgAuthor: 'message__author',
    msgContent: 'message__content',
  },
}

/* WebSocket */
const socket = io(); // by default, Socket.io assumes that the server with which we will communicate is the same on which the client is launched (here: localhost: 8000)
socket.on('message', ({ author, content }) => addMessage(author, content)); // listener in socket.io
socket.open()

/* logic */
const login = function(e){
  e.preventDefault();

  if(userNameInput.value === ''){
    alert('Please enter your username');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove(select.classes.show);
    messagesSection.classList.add(select.classes.show);
  }
}

loginForm.addEventListener('submit', login);

const sendMessage = function(e){
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('Please enter your message');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContentInput.value = '';
  }
}

const addMessage = function(author, content){
  const message = document.createElement('li');
  message.classList.add(select.classes.message, select.classes.msgReceived);
  if(author === userName) message.classList.add(select.classes.msgSelf);

  message.innerHTML = `
    <h3 class='${select.classes.msgAuthor}'>${userName === author ? 'You' : author }</h3>
    <div class='${select.classes.msgContent}'>
      ${content}
    </div>
  `;

  messagesList.appendChild(message);
}

addMessageForm.addEventListener('submit', sendMessage);
