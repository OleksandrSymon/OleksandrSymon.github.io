var inputEmail = document.querySelector("#email"),
    textareaMessage = document.querySelector("#message");

inputEmail.addEventListener("change", function() {
  document.querySelector("#labelEmail").style.opacity = isStringEmpty(this.value) ? "" : 0;
});

textareaMessage.addEventListener("change", function() {
  document.querySelector("#labelMessage").style.opacity = isStringEmpty(this.value) ? "" : 0;
});

/* document.getElementsByTagName("form")[0].addEventListener("submit", function(event) {
  if (areFieldsEmpty()) {
    event.preventDefault();
    alert("FILL ALL FIELDS, PLEASE");
  }
}); */


function isStringEmpty(stringToCheck) {
  return (stringToCheck && 0 !== stringToCheck.replace(/\s/g, "").length) ? false : true; // <—— The Yoda condition
}

function areFieldsEmpty() {
  return isStringEmpty(inputEmail.value) || isStringEmpty(textareaMessage.value) ? true : false;
}

// function hideLabel(label) {
//   label.style.opacity = isStringEmpty(this.value) ? "" : 0;
//   // hideLabel.call(this, document.querySelector("#labelEmail")); // Also is possible to use Event.target
// }
