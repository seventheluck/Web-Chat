'use strict';
const selectedUser = {};


// const generateSelectUser = function() {
//   const url = window.location.href;
//   let storedUsers = url.substring(url.indexOf('stored_users=')+13, url.length);
//   while(storedUsers.length !== 0){
//     if(storedUsers.indexOf(",")!== -1){
//       const userName = storedUsers.substring(0, storedUsers.indexOf(","));
//       storedUsers = storedUsers.substring(storedUsers.indexOf(",")+1, storedUsers.length);
//       selectedUser[userName] = userName;
//     } else {
//       selectedUser[storedUsers] = storedUsers;
//       storedUsers = '';
//     }
//   }
// };

// const generateUrl = function() {

// };

const usersField = document.querySelector('.users');
usersField.addEventListener('click', (clickUserEvent) => {
  if (clickUserEvent.target.classList.contains('username')) {
    clickUserEvent.target.classList.toggle('clickon');
    const username = clickUserEvent.target.textContent;
    if(clickUserEvent.target.classList.contains('clickon')){
      selectedUser[username] = username;
    } else {
      delete selectedUser[username];
    }
    setUnselectButton();
    refreshMessages();
  }
});

const clickOnUserName = function(clickUserEvent) {
  if (clickUserEvent.target.classList.contains('username')) {
    clickUserEvent.target.classList.toggle('clickon');
    const username = clickUserEvent.target.textContent;
    if(clickUserEvent.target.classList.contains('clickon')){
      selectedUser[username] = username;
    } else {
      delete selectedUser[username];
    }
    setUnselectButton();
    refreshMessages();
  }
};

const setUnselectButton = function(){
  const unselectButton = document.querySelector(".unselect-btn");
    if(Object.getOwnPropertyNames(selectedUser).length === 0) {
      unselectButton.hidden = true;
    } else {
      unselectButton.hidden = false;
    }
};

const unselectButton = document.querySelector(".unselect-btn");
unselectButton.addEventListener('click', (unselectEvent) => {
  const usersField = document.querySelectorAll('.username');
  for (let index = 0; index < usersField.length; index++) {
    const usersItem = usersField.item(index);
    if (usersItem.classList.contains('clickon')) {
      usersItem.classList.remove('clickon');
      delete selectedUser[usersItem.textContent];
    }
  }
  if(Object.getOwnPropertyNames(selectedUser).length === 0) {
    unselectButton.hidden = true;
  } else {
    unselectButton.hidden = false;
  }
  refreshMessages();
});

const refreshMessages = function () {
  const invisibleMessages = document.querySelectorAll(".invisibleMessage");
  const messagesField = document.querySelectorAll('.message');
  for(let index = 0; index < invisibleMessages.length; index++) {
    const message = invisibleMessages.item(index);
    message.parentElement.removeChild(message);
  }
  if(Object.getOwnPropertyNames(selectedUser).length == 0){
    for (let index = 0; index < messagesField.length; index++) {
      const messageItem = messagesField.item(index);
      messageItem.hidden = false;
    }
    return;
  }
  // false : display, true : hidden
  let previousHiddenStatus = false;
  for (let index = 0; index < messagesField.length; index++) {
    const messageItem = messagesField.item(index);
    const usernameItem = messageItem.querySelector('.username');
    const username = usernameItem.textContent;
    if(selectedUser[username] === undefined) {
      messageItem.hidden = true;
      previousHiddenStatus = true;
    } else {
      messageItem.hidden = false;
      if(previousHiddenStatus === true) {
        const newDiv = document.createElement("div");
        newDiv.className = "invisibleMessage";
        const newContent = document.createTextNode(" ---- hidden messages here ---- ");
        newDiv.appendChild(newContent);
        const parentElement = messageItem.parentElement;
        parentElement.insertBefore(newDiv, messageItem);
        previousHiddenStatus = false;
      }
    }
  }
  if(previousHiddenStatus === true) {
    const newDiv = document.createElement("div");
    newDiv.className = "invisibleMessage";
    const newContent = document.createTextNode(" ---- hidden messages here ---- ");
    newDiv.appendChild(newContent);
    const parentElement = messagesField.item(messagesField.length - 1).parentElement;
    parentElement.insertBefore(newDiv, messagesField.item(messagesField.length - 1));
    previousHiddenStatus = false;
  }
  
};

const storeUsersInfo = function() {
  let selectedUserString = '';
  Object.keys(selectedUser).forEach(function(element){
    selectedUserString = selectedUserString + ','+element;
  });
  window.name = selectedUserString;
};

const refreshButton = document.querySelector(".refresh-btn");
refreshButton.addEventListener('click', () => {
  storeUsersInfo();
});

const sendButton = document.querySelector(".send-btn");
sendButton.addEventListener('click', () => {
  storeUsersInfo();
});


(function IIFE() {
  const sendButton = document.querySelector(".send button");
  const toSend = document.querySelector(".to-send");
  if (toSend && sendButton) {
    sendButton.disabled = !toSend.value;
    toSend.addEventListener('input', (e) => {
      if (e.target.value) {
        sendButton.disabled = false;
      } else {
        sendButton.disabled = true;
      }
    });
  }

  const loginButton = document.querySelector(".submit-button");
  const userName = document.querySelector(".user-name");
  if (loginButton && userName) {
    loginButton.disabled = !userName.value;
    userName.addEventListener('input', (loginEvent) => {
      if (loginEvent.target.value) {
        loginButton.disabled = false;
      } else {
        loginButton.disabled = true;
      }
    });
  }
  const unselectButton = document.querySelector(".unselect-btn");
  unselectButton.hidden = true;
  let selectedUserString = window.name;

  if(selectedUserString.startsWith(',')) {
    selectedUserString = selectedUserString.substring(1, selectedUserString.length);
    while(selectedUserString!== ''){
      let index = selectedUserString.indexOf(',');
      let userName = '';
      if(index === -1){
        userName = selectedUserString;
        selectedUserString = '';
      } else {
        userName = selectedUserString.substring(0, index);
        selectedUserString = selectedUserString.substring(index + 1, selectedUserString.length);
      }
      selectedUser[userName] = userName;
    }
    const usersField = document.querySelector('.users');
    const users = usersField.querySelectorAll(".username");
    for(let index = 0; index < users.length; index++){
      let user = users.item(index);
      let username = user.textContent;
      if(selectedUser[username] !== undefined){
        user.classList.toggle('clickon');
      }
    }
    setUnselectButton();
    refreshMessages();
  }
})();
