document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulate login process
    if (email === 'test@example.com' && password === 'password123') {
      alert('Login successful!');
    } else {
      alert('Invalid email or password.');
    }
  });

  // Toggle password visibility
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');

  togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePassword.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      togglePassword.textContent = 'Show';
    }
  });

  // Check password strength
  passwordInput.addEventListener('input', () => {
    const passwordStrength = document.getElementById('passwordStrength');
    const value = passwordInput.value;

    if (value.length < 6) {
      passwordStrength.textContent = 'Weak';
      passwordStrength.style.color = 'red';
    } else if (value.length < 10) {
      passwordStrength.textContent = 'Moderate';
      passwordStrength.style.color = 'orange';
    } else {
      passwordStrength.textContent = 'Strong';
      passwordStrength.style.color = 'green';
    }
  });

  // Handle social login clicks
  const socialLogins = document.querySelectorAll('.social-login');

  socialLogins.forEach(icon => {
    icon.addEventListener('click', () => {
      alert(`Login with ${icon.dataset.provider} clicked!`);
    });
  });
