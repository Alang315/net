// Función para cargar el formulario correspondiente según el modo
function loadForm(mode) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'forgot', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            document.getElementById('form-container').innerHTML = xhr.responseText;
        }
    };
    xhr.send('mode=' + mode);
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();

    var modeInput = event.target.querySelector('input[name="mode"]');
    var mode = modeInput.value;

    switch (mode) {
        case 'enter_mail':
            modeInput.value = 'enter_code';
            break;
        case 'enter_code':
            modeInput.value = 'enter_password';
            break;
    }

    loadForm(modeInput.value);
}

loadForm('<?php echo $mode; ?>');

document.getElementById('form-container').addEventListener('submit', handleFormSubmit);