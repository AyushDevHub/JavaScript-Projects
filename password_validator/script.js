const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

function getInputValue() {
    const input = document.getElementById("password");
    const password = input.value.trim();
    if(!password) {
        alert("Please enter a password");
        return null;
    } 
    input.value = ""; // Clear the input field
    return password;
}