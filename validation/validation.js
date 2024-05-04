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


const checkInput = (() => {
    const email = (() => {
        emailInput.addEventListener('input', (event) => {
            if (emailInput.validity.valid) {
                emailError.textContent = '';
                emailError.className = 'error';
            } else {
                showError.email();
            }
        })
    })();
    const country = (() => {
        countryInput.addEventListener('input', (event) => {
            if (confirmInput.validity.valid) {
                countryError.textContent = '';
                countryError.className = 'error';
            } else {
                showError.country();
            }
        })
    })();
})();


const showError = (() => {
    const email = () => {
        // Check empty email
        if (emailInput.validity.valueMissing) {
            emailError.textContent = 'Enter your email';
        } else if (emailInput.validity.typeMismatch) {
            emailError.textContent = 'Enter valid email';
        } else if (emailInput.validity.patternMismatch) {
            emailError.textContent = 'Enter email in name@domain.com format'
        }
        emailError.className = 'error active';
    }
    const country = () => {
        if (countryInput.validity.valueMissing) {
            countryError.textContent = 'Enter your country';
        }
        countryError.className = 'error active';
    }
    return { email, country }
})();