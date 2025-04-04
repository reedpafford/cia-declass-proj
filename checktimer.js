document.addEventListener('DOMContentLoaded', () => {
    const startTimeStr = sessionStorage.getItem('sessionStartTime');
  
    if (!startTimeStr) {
      window.location.href = 'index.html';
      return;
    }
  
    const startTime = parseInt(startTimeStr, 10);
    const TIME_LIMIT = 2 * 60 * 1000; // 2 minutes in ms
  
    // check immediately in case time already expired
    checkTime();
  
    // check every second while on this page
    const interval = setInterval(() => {
      checkTime();
    }, 1000);
  
    function checkTime() {
      const now = Date.now();
      if (now - startTime >= TIME_LIMIT) {
        clearInterval(interval);
        window.location.href = 'breached.html';
      }
    }
  });
  