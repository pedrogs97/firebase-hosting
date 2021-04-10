'use strict';
function saveMessage(messageText, nameText, emailText, phoneText) {
    const data = {
      name: nameText,
      email: emailText,
      phone: phoneText,
      message: messageText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }
    // Add a new message entry to the database.
    return firebase.firestore().collection('messages').add(data).then(() =>{
      Swal.fire({
        title: 'Enviado',
        text: 'Recebemos sua mensagem, em breve entraremos em contato.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      document.getElementById('ModalCenter').modal('hide');
    })
    .catch((error) => {
      console.error('Error writing new message to database', error);
    });
}

const validateInput = (element) => {
  if (element.value){
    element.style.borderColor = "transparent";
    return true;
  }
  else{
    element.style.borderColor = "red";
    return false;
  }
}

// Triggered when the send new message form is submitted.
const onMessageFormSubmit = (e) => {
  e.preventDefault();
  
  if (validateInput(nameInputElement) && validateInput(emailInputElement) && validateInput(phoneInputElement) && validateInput(messageInputElement)) {
    errorDivElement.hidden = true;
    saveMessage(messageInputElement.value, nameInputElement.value, emailInputElement.value, phoneInputElement.value);
  }
  else{
    errorDivElement.hidden = false;
  }
}

const onChangeInput = (event) => {
  validateInput(event.target);
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('Error on load');
  }   
}

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.
var contactFormElement = document.getElementById('contact-form');
var nameInputElement = document.getElementById('name');
var emailInputElement = document.getElementById('email');
var phoneInputElement = document.getElementById('phone');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit-button');
var modalSuccessElement = document.getElementById('modal-success');
var errorMessageElement = document.getElementById('error-message');
var errorDivElement = document.getElementById('error-container');
// Saves message on form submit.
contactFormElement.addEventListener('submit', onMessageFormSubmit);
// On change event
nameInputElement.onchange = onChangeInput;
emailInputElement.onchange = onChangeInput;
phoneInputElement.onchange = onChangeInput;
messageInputElement.onchange = onChangeInput;
