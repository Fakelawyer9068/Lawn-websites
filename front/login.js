// login.js

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Perform login validation (you can use AJAX to send data to the server for validation)
    if (username === 'tyler' && password === '1') {
      alert('Login successful!');
      // Redirect to dashboard or another page
       window.location.href = 'inquires.html';
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }
  