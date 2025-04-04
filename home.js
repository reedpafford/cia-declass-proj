document.addEventListener('DOMContentLoaded', () => {
  // The user can see this page only if the sessionStartTime was set
  // (because checkTimer.js will redirect if not).

  const randomDocBtn = document.getElementById('randomDocBtn');
  randomDocBtn.addEventListener('click', () => {
    // Example random ID logic (1–100)
    const randomId = Math.floor(Math.random() * 9) + 1;
    window.location.href = `viewer.html?id=${randomId}`;
  });
});

  