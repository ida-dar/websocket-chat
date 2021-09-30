'use strict'

/* html's form vars */
const loginForm = document.getElementById('welcome-form'),
  messagesSection = document.getElementById('messages-section'),
  messagesList = document.getElementById('messages-list'),
  addMessageForm = document.getElementById('add-messages-form'),
  userNameInput = document.getElementById('username'),
  messageContentInput = document.getElementById('message-content');

/* global vars */
const userName = '';
const select = {
  classes: {
    show: 'show',
    message: 'message',
    msgSelf: 'message--self',
    msgAuthor: 'message__author',
    msgContent: 'message__content',
    msgReceived: 'message--received',
  },
}

/* logic */
const login = function(e){
  e.preventDefault();

  if(userNameInput.value === ''){
    alert('Please enter your username');
  } else {
    userNameInput.value = userName;
    loginForm.classList.remove(select.classes.show);
    messagesSection.classList.add(select.classes.show);
  }
}

loginForm.addEventListener('submit', login);

const sendMessage = function(e){
  e.preventDefault();

  if(!messageContentInput.value){
    alert('Please enter your message');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
}

const addMessage = function(author, content){
  const message = document.createElement('li');
  message.classList.add(select.classes.message);
  message.classList.add(select.classes.msgReceived);
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
