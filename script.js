const form = document.querySelector('form');

var error = document.querySelector('#error-message');

var passwordContainer = document.querySelector('#password-container');

var lockModal = document.querySelector('#lock-modal');

var data = {
    length: document.querySelector('#password-length').value,
    lowercase: document.querySelector('#lowercase').checked,
    uppercase: document.querySelector('#uppercase').checked,
    numbers: document.querySelector('#numbers').checked,
    symbols: document.querySelector('#symbols').checked
}

window.onload = function() {
    var hcaptcha = document.createElement('div');
    hcaptcha.className = 'captcha';
    hcaptcha.setAttribute('data-sitekey', '55c75673-8d89-40ab-af6e-e36e14aa4e31');
    hcaptcha.setAttribute('theme', 'dark');

    error.appendChild(hcaptcha);
}

function getPassword() {

    var password = generatePassword(data.length, data.lowercase, data.uppercase, data.numbers, data.symbols);

    passwordContainer.remove('hidden');
    passwordContainer.textContent = password;

}

function generatePassword(length, lowercase, uppercase, numbers, symbols) {
    var password = '';
    var characters = '';
    if (length > 128) {
        lockModal.classList.remove('hidden');
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
    }
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

function refreshCaptcha() {
    hcaptcha.reset();
}

document.querySelector('#generate').addEventListener('click', function () {
    passwordContainer.classList.add('hidden');
    form.classList.remove('hidden');
    lockModal.classList.add('hidden');
    passwordContainer.innerHTML = '';
    error.innerHTML = '';
    refreshCaptcha();
});

document.querySelector('#copy').addEventListener('click', function () {
    var text = passwordContainer.innerHTML;
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

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (hcaptcha.getResponse() != '') {
        lockModal.classList.remove('hidden');
        setTimeout(function () {
            form.classList.add('hidden');
            lockModal.classList.add('hidden');
            document.getElementById('generator').add('hidden');
            passwordContainer.classList.remove('hidden');
            getPassword();
        }, 3000);
    } else {
        error.innerHTML = 'Please complete the captcha';
    }
});