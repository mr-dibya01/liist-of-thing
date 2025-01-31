// JavaScript function to confirm delete
function confirmDelete(event) {
    // Show confirmation pop-up
    const userConfirmed = confirm("are you sure delete this");
    
    // If the user cancels, prevent form submission
    if (!userConfirmed) {
        event.preventDefault();
    }
}
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()