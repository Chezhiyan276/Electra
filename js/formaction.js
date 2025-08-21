document.addEventListener('DOMContentLoaded',function(){
document.getElementById('contactForm').addEventListener('submit', function (event) {
	event.preventDefault(); // Prevent form submission

	// Input elements
	const name = document.getElementById('name');
	const email = document.getElementById('email');
	const phone = document.getElementById('phone');
	const project = document.getElementById('project');
	const message = document.getElementById('message');
	const flexCheck = document.getElementById('flexCheck');

	// Validation messages
	const validationMessages = document.querySelectorAll('.validation-message');
	validationMessages.forEach(message => message.style.display = 'none'); // Hide all validation messages

	let isValid = true; // Validation flag

	// Validation logic
	if (!name.value.trim()) {
		showMessage(name, "Please enter your name");
		isValid = false;
	}
	if (!email.value.trim() || !validateEmail(email.value.trim())) {
		showMessage(email, "Please enter a valid email");
		isValid = false;
	}
	if (!phone.value.trim()) {
		showMessage(phone, "Please enter your phone number");
		isValid = false;
	}
	if (!project.value.trim()) {
		showMessage(project, "Please enter your project");
		isValid = false;
	}
	if (!message.value.trim()) {
		showMessage(message, "Please enter your message");
		isValid = false;
	}
	if (!flexCheck.checked) {
		showMessage(flexCheck, "Please accept the Terms & Conditions");
		isValid = false;
	}

	// Redirect if valid
	if (isValid) {
		window.location.href = "thank-you.html";
	}

	// Show validation message function
	function showMessage(element, message) {
		const parent = element.closest('.form-floating, .form-check');
		const validationMessage = parent.querySelector('.validation-message');
		if (validationMessage) {
			validationMessage.textContent = message;
			validationMessage.style.display = 'block';
		}
	}

	// Email validation regex
	function validateEmail(email) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
});
});