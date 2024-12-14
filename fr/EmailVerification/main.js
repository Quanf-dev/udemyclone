
    // Example: Replace placeholders with dynamic data
    document.getElementById('first-name').textContent = 'John';
    document.getElementById('company-name').textContent = 'ExampleCorp';
    // Add event listener for the verification button
    document.getElementById('verify-button').addEventListener('click', function(event) {
        event.preventDefault();
        alert('Your email has been verified successfully!');
    });
