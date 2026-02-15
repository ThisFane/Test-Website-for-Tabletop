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