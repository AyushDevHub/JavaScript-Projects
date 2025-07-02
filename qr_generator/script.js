document.addEventListener('DOMContentLoaded', () => {
    generateQRCode();

    // Restore last QR code if exists
    const lastQRCode = localStorage.getItem('lastQRCode');
    if (lastQRCode) {
        displayQRCode(lastQRCode);
    }
});

function generateQRCode() {
    const button = document.getElementById('generateBtn');
    button.addEventListener('click',() => {
        const data = getInputData();
        const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
        if (data) {
            displayQRCode(apiUrl);
        }
        button.disabled = true; // Disable the button after generating the QR code
    });
}

function getInputData() {
    const inputField = document.getElementById('qrInput');
    let inputData = inputField.value.trim();
    if(!inputData) {
        alert('Please enter some data to generate a QR code.');
        return null;
    }
    inputField.value = ''; 
    return inputData;
}


function displayQRCode(apiUrl) {
    let qrCode = document.getElementById('qrCode');
    qrCode.innerHTML = `<img src="${apiUrl}" alt="QR Code">`;
    qrCode.style.display = 'block';
    localStorage.setItem('lastQRCode', apiUrl);

}