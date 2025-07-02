const passwordInput = document.getElementById("password");
const strengthDiv = document.getElementById("strength");

passwordInput.addEventListener("input", function () {
    const value = passwordInput.value;

    // Criteria flags
    const isLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    // Update checklist
    updateCriteria("length", isLength);
    updateCriteria("uppercase", hasUpper);
    updateCriteria("lowercase", hasLower);
    updateCriteria("number", hasNumber);
    updateCriteria("special", hasSpecial);

    // Strength status
    const score = [isLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    if (score === 5) {
        strengthDiv.textContent = "🟢 Strong Password";
        strengthDiv.style.color = "lime";
    } else if (score >= 3) {
        strengthDiv.textContent = "🟡 Medium Password";
        strengthDiv.style.color = "orange";
    } else {
        strengthDiv.textContent = "🔴 Weak Password";
        strengthDiv.style.color = "red";
    }
});

function updateCriteria(id, valid) {
    const element = document.getElementById(id);
    if (valid) {
        element.style.color = "lime";
        element.style.textDecoration = "none";
    } else {
        element.style.color = "gray";
        element.style.textDecoration = "line-through";
    }
}
