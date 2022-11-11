var query = {
    form: document.querySelector('form'),
    error: document.querySelector('#error-message'),
    passwordContainer: document.querySelector('#password-container'),
    passwordInput: document.querySelector('#password-input'),
    lockModal: document.querySelector('#lock-modal'),
    generator: document.querySelector('#generator'),
    copy: document.querySelector('#copy'),
    generate: document.querySelector('#generate')
}

var data = {
    // password length from the form
    length: document.querySelector('#password-length').value,
    lowercase: document.getElementById('#lowercase'),
    uppercase: document.getElementById('#uppercase'),
    numbers: document.getElementById('#numbers'),
    symbols: document.getElementById('#symbols')
}

window.onload = function () {
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

function getPassword() {

    var password = generatePassword(data.length, data.lowercase, data.uppercase, data.numbers, data.symbols);

    if (length > 128) {
        var ad = document.createElement('div');
        ad.className = 'ad';
        ad.setAttribute('data-ad-client', 'ca-pub-3940256099942544');
        ad.setAttribute('data-ad-slot', '3098455663');
        ad.setAttribute('data-ad-format', 'auto');
        ad.setAttribute('data-full-width-responsive', 'true');
        ad.setAttribute('data-adtest', 'on');
        ad.setAttribute('style', 'display:block');
        ad.setAttribute('data-adsbygoogle-status', 'done');
        ad.setAttribute('data-adsbygoogle-pub-adsbygoogle-push', 'true');
        query.passwordContainer.appendChild(ad);
        (adsbygoogle = window.adsbygoogle || []).push({});
    }

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
    if (hcaptcha.getResponse() != '') {
        return true;
    } 

    return false;
}

function refreshCaptcha() {
    hcaptcha.reset();
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

query.form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (onSucess) {
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