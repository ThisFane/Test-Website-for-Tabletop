window.addEventListener('load', function() {
    const sessionData = getSession();
    if (sessionData) {
        console.log('Welcome back, ' + sessionData.username);
        document.body.style.display = "block";
    } else {
        console.log('No active session.');
        window.location.href = "index.html";
    }
});

window.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'd' && e.shiftKey) {
        localStorage.removeItem('session');
        console.log('Session cleared via hotkey!');
        alert('Session cleared!');
    }
});