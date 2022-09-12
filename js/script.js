// Get the modal
var modal = document.getElementById("modal-add-word");

// Get the button that opens the modal
var btn = document.getElementById("add-word");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.classList.toggle("modal-active");

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.classList.remove("modal-active")
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("modal-active")
  }
}


