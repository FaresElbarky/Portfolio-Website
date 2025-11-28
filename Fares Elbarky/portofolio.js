(function () {
	function qs(id) { return document.getElementById(id); }

	function showError(el, msg) {
		if (!el) return;
		el.textContent = msg;
		var input = document.querySelector('#' + el.id.replace('Error', ''));
		if (input) input.classList.add('invalid');
	}

	function clearError(el) {
		if (!el) return;
		el.textContent = '';
		var input = document.querySelector('#' + el.id.replace('Error', ''));
		if (input) input.classList.remove('invalid');
	}

	window.validateForm = function (ev) {
		if (ev && ev.preventDefault) ev.preventDefault();

		var username = qs('username');
		var password = qs('password');
		var usernameError = qs('usernameError');
		var passwordError = qs('passwordError');

		var valid = true;

		if (!username || !username.value || username.value.trim().length < 3) {
			showError(usernameError, 'Username must be at least 3 characters.');
			valid = false;
		} else {
			clearError(usernameError);
		}

		if (!password || !password.value || password.value.length < 6) {
			showError(passwordError, 'Password must be at least 6 characters.');
			valid = false;
		} else {
			clearError(passwordError);
		}

		if (valid) {
			window.location.href = 'Portofolio.html';
		}

		return valid;
	};

	document.addEventListener('DOMContentLoaded', function () {
		var username = qs('username');
		var password = qs('password');
		var usernameError = qs('usernameError');
		var passwordError = qs('passwordError');

		if (username) username.addEventListener('input', function () { clearError(usernameError); });
		if (password) password.addEventListener('input', function () { clearError(passwordError); });

		var form = document.querySelector('form[name="login_form"]');
		if (form) {
			form.addEventListener('submit', function (e) {
				if (!window.validateForm(e)) {
				}
			});
		}
	});
})();

