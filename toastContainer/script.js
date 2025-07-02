document.addEventListener('DOMContentLoaded', () => {
    getSuccessOutput();
    getErrorOutput();
    getWarningOutput();
});

function getSuccessOutput() {
    const successBtn = document.getElementById('success');
    successBtn.addEventListener('click', () => {
        let notification = document.querySelector('.notification');
        let toastContainer = document.createElement('p');
        toastContainer.className = 'toast-container';
        notification.appendChild(toastContainer);
        toastContainer.innerHTML = `<div class="toast success">Success! This is a success message.</div>`;
        setTimeout(() => {
            toastContainer.remove();
        }, 3000);
    });
}

function getErrorOutput() {
    const errorBtn = document.getElementById('error');
    errorBtn.addEventListener('click', () => {
        let notification = document.querySelector('.notification');
        let toastContainer = document.createElement('p');
        toastContainer.className = 'toast-container';
        notification.appendChild(toastContainer);
        toastContainer.innerHTML = `<div class="toast error">Error! This is an error message.</div>`;
        setTimeout(() => {
            toastContainer.remove();
        }, 3000);
    });
}

function getWarningOutput() {
    const warningBtn = document.getElementById('warning');
    warningBtn.addEventListener('click', () => {
        let notification = document.querySelector('.notification');
        let toastContainer = document.createElement('p');
        toastContainer.className = 'toast-container';
        notification.appendChild(toastContainer);
        toastContainer.innerHTML = `<div class="toast warning">Warning! This is a warning message.</div>`;
        setTimeout(() => {
            toastContainer.remove();
        }, 3000);
    });
}