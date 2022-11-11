var query = {
    form: document.querySelector('form'),
    error: document.querySelector('#error-message'),
    passwordContainer: document.querySelector('#password-container'),
    passwordInput: document.querySelector('#password-input'),
    lockModal: document.querySelector('#lock-modal'),
    generator: document.querySelector('#generator'),
    copy: document.querySelector('#copy'),
    generate: document.querySelector('#generate'),
    download: document.querySelector('#download'),
    hcaptcha: document.getElementById('captcha'),
}


var data = {
    // password length from the form
    length: document.querySelector('#password-length').value,
    lowercase: document.getElementById('#lowercase'),
    uppercase: document.getElementById('#uppercase'),
    numbers: document.getElementById('#numbers'),
    symbols: document.getElementById('#symbols')
}

var captcha = false;

window.onload = function () {
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

function mouseoverPass() {
    query.passwordInput.type = "text";
}

function mouseoutPass() {
    query.passwordInput.type = "password";
}

function getPassword() {

    var password = generatePassword(data.length, data.lowercase, data.uppercase, data.numbers, data.symbols);

    query.passwordInput.value = password;
}

function generatePassword(length, lowercase, uppercase, numbers, symbols) {
    var password = '';
    var characters = '';
    if (lowercase) {
        characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (uppercase) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (numbers) {
        characters += '0123456789';
    }
    if (symbols) {
        characters += '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    }
    for (var i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

function onSucess() {
    captcha = true;
}

function onExpire() {
    query.error.innerHTML = "Captcha Expired";
    captcha = false;
}


function refreshCaptcha() {
    query.hcaptcha.src = query.hcaptcha.src.substring(0, query.hcaptcha.src.lastIndexOf("?")) + "?rand=" + Math.random() * 1000;
}

query.generate.addEventListener('click', function () {
    query.generator.classList.remove('hidden');
    query.passwordContainer.classList.add('hidden');
    query.form.classList.remove('hidden');
    query.lockModal.classList.add('hidden');
    query.error.innerHTML = '';
    refreshCaptcha();
});

query.copy.addEventListener('click', function () {
    var text = query.passwordInput.value;

    var success = 'The password has been copied to clipboard';
    var fail = 'Failed to copy the password to clipboard';
    if (navigator.clipboard.writeText(text)) {
        swal({
            title: 'Copied!',
            text: success,
            icon: 'success',
            button: 'Close',
        });
    } else {
        swal({
            title: 'ERROR!',
            text: fail,
            icon: 'error',
            button: 'Close',
        });
    }
});

query.download.addEventListener('click', function () {
    var text = query.passwordInput.value;
    var filename = 'password.txt';
    var blob = new Blob([text], {
        type: 'text/plain'
    });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
});

query.form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (captcha) {
        query.lockModal.classList.remove('hidden');
        setTimeout(function () {
            if (data.lowercase || data.uppercase) {
                query.form.classList.add('hidden');
                query.generator.classList.add('hidden');
                query.lockModal.classList.add('hidden');
                query.passwordContainer.classList.remove('hidden');
                getPassword();
            } else {
                query.lockModal.classList.add('hidden');
                query.error.innerHTML = 'Please select at least one of the following options: lowercase, uppercase';
            }
        }, 2000).toFixed;
    } else {
        query.error.innerHTML = 'Please complete the captcha';
    }
});

document.querySelectorAll('input').forEach(function (input) {
    input.addEventListener('change', function () {
        data[input.id] = input.checked;
        data.length = document.querySelector('#password-length').value;
    });
});