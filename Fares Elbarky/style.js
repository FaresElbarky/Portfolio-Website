(function () {
	function qs(id) { return document.getElementById(id); }

	function showError(el, message) {
		if (!el) return;
		el.textContent = message;
		var input = el.previousElementSibling;
		if (input && input.tagName.toLowerCase() === 'input') {
			input.classList.add('invalid');
		}
	}

	function clearError(el) {
		if (!el) return;
		el.textContent = '';
		var input = el.previousElementSibling;
		if (input && input.tagName.toLowerCase() === 'input') {
			input.classList.remove('invalid');
		}
	}

	function validateEmail(email) {
		var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	window.validateForm = function () {
		var username = qs('username');
		var email = qs('email');
		var password = qs('password');
		var cpassword = qs('c-password');
		var age = qs('age');

		var usernameError = qs('usernameError');
		var emailError = qs('emailError');
		var passwordError = qs('passwordError');
		var cpasswordError = qs('cpasswordError');

		var valid = true;

		if (!username.value || username.value.trim().length < 3) {
			showError(usernameError, 'Full name must be at least 3 characters.');
			valid = false;
		} else {
			clearError(usernameError);
		}

		if (age.value) {
			var birth = new Date(age.value);
			var today = new Date();
			var ageYears = today.getFullYear() - birth.getFullYear();
			var m = today.getMonth() - birth.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
				ageYears--;
			}
			if (isNaN(birth.getTime()) || ageYears < 13) {
				showError(usernameError, 'You must be at least 13 years old.');
				valid = false;
			} else {
				if (usernameError.textContent === 'You must be at least 13 years old.') {
					clearError(usernameError);
				}
			}
		} else {
			showError(usernameError, 'Please provide your birth date.');
			valid = false;
		}

		if (!email.value || !validateEmail(email.value)) {
			showError(emailError, 'Please enter a valid email address.');
			valid = false;
		} else {
			clearError(emailError);
		}

		if (!password.value || password.value.length < 6) {
			showError(passwordError, 'Password must be at least 6 characters.');
			valid = false;
		} else if (!/\d/.test(password.value)) {
			showError(passwordError, 'Password must contain at least one digit.');
			valid = false;
		} else {
			clearError(passwordError);
		}

		if (!cpassword.value || cpassword.value !== password.value) {
			showError(cpasswordError, 'Passwords do not match.');
			valid = false;
		} else {
			clearError(cpasswordError);
		}

		return valid;
	};

	document.addEventListener('DOMContentLoaded', function () {
		var fields = [
			{ id: 'username', err: 'usernameError' },
			{ id: 'email', err: 'emailError' },
			{ id: 'password', err: 'passwordError' },
			{ id: 'c-password', err: 'cpasswordError' },
		];

		fields.forEach(function (f) {
			var el = qs(f.id);
			var err = qs(f.err);
			if (el) {
				el.addEventListener('input', function () { clearError(err); el.classList.remove('invalid'); });
			}
		});
	});
})();
