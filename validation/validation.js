const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const emailError = document.querySelector('#email + div.error');
const countryInput = document.getElementById('country');
const countryError = document.querySelector('#country + div.error');
const zipInput = document.getElementById('zipcode');
const zipError = document.querySelector('#zipcode + div.error');
const passwordInput = document.getElementById('password');
const passwordError = document.querySelector('#password + div.error');
const confirmInput = document.getElementById('confirmation');
const confirmError = document.querySelector('#confirmation + div.error');


const zipPatterns = {
    fr: [
        '^(F-)?\\d{5}$',
        'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012'
    ],
    de: [
        '^(D-)?\\d{5}$',
        'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345'
    ],
    nl: [
        '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
        'Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS'
    ],
}


const checkInput = (() => {
    (() => {
        emailInput.addEventListener('input', (event) => {
            if (emailInput.validity.valid) {
                emailError.textContent = '';
                emailError.className = 'error';
            } else {
                showError.email();
            }
        })
    })();
    (() => countryInput.addEventListener('change', () => {
        // Set pattern to ZIP-code field
        const country = countryInput.value;
        zipInput.setAttribute('pattern', zipPatterns[country][0]);
        zipInput.removeAttribute('disabled');
    }))();
    (() => zipInput.addEventListener('input', () => {
        const country = countryInput.value;
        if (zipInput.validity.valid) {
            zipError.textContent = '';
            zipError.className = 'error';
        } else {
            showError.zipcode(country);
        }
    }))();
    (() => {
        passwordInput.addEventListener('input', () => {
            if (passwordInput.validity.valid) {
                passwordError.textContent = '';
                passwordError.className = 'error';
            } else {
                showError.password();
            }
        })
    })();
    (() => {
        confirmInput.addEventListener('input', () => {
            if (passwordInput.value === confirmInput.value) {
                confirmError.textContent = '';
                confirmError.className = 'error';
            } else {
                confirmError.textContent = 'Passwords should match';
                confirmError.className = 'error active';
            }
        })
    })();
})();


const checkSubmit = (() => {
    document.querySelector('button').addEventListener('click', (event) => {
        // Check email
        if (emailInput.validity.valid) {
            emailError.textContent = '';
            emailError.className = 'error';
        } else {
            showError.email();
        }

        // Check ZIP-code
        if (zipInput.validity.valid) {
            zipError.textContent = '';
            zipError.className = 'error';
        } else {
            showError.zipcode(country);
        }

        // Check password
        if (passwordInput.validity.valid) {
            passwordError.textContent = '';
            passwordError.className = 'error';
        } else {
            showError.password();
        }

        event.preventDefault();
    })
})();


const showError = (() => {
    const email = () => {
        // Check empty email
        if (emailInput.validity.valueMissing) {
            emailError.textContent = 'Enter your email';
        } else if (emailInput.validity.typeMismatch) {
            emailError.textContent = 'Enter valid email';
        // Check valid pattern
        } else if (emailInput.validity.patternMismatch) {
            emailError.textContent = 'Enter email in name@domain.com format'
        }
        emailError.className = 'error active';
    }
    const zipcode = (country) => {
        if (zipInput.validity.valueMissing) {
            zipError.textContent = 'Enter ZIP code';
            zipError.className = 'error warning';
        } else if (zipInput.validity.tooShort) {
            // Check for chosen pattern
            zipError.textContent = zipPatterns[country][1];
            zipError.className = 'error warning';
        }
        else if (zipInput.validity.patternMismatch) {
            // Check for chosen pattern
            zipError.textContent = zipPatterns[country][1];
            zipError.className = 'error active';
        }
    }
    const password = () => {
        if (passwordInput.validity.valueMissing) {
            passwordError.textContent = 'Set password';
            passwordError.className = 'error warning'
        } else if (passwordInput.validity.tooShort) {
            passwordError.textContent = 'Minimum 8 symbols';
            passwordError.className = 'error warning'
        }
    }
    return { email, zipcode, password }
})();