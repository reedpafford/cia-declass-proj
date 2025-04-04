document.addEventListener('DOMContentLoaded', () => {
  const passwordForm = document.getElementById('passwordForm');
  const passwordInput = document.getElementById('passwordInput');

  // store the real typed characters if needed
  let realPassword = '';

  passwordInput.addEventListener('input', (e) => {
    const newValue = e.target.value;

    // If characters were added
    if (newValue.length > realPassword.length) {
      const addedChars = newValue.slice(realPassword.length);
      realPassword += addedChars;
    } 
    // If characters were removed
    else if (newValue.length < realPassword.length) {
      realPassword = realPassword.slice(0, newValue.length);
    }

    // Replace displayed text with "*" for each character
    e.target.value = '*'.repeat(realPassword.length);
  });

  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // For now, "any password" is accepted, so we just set sessionStartTime:
    sessionStorage.setItem('sessionStartTime', Date.now().toString());

    window.location.href = 'home.html';
  });
});

  