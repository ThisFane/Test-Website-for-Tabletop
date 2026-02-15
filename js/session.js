
function setSession(userData) {
    const now = new Date().getTime();
    const session = {
        data: userData,
        timestamp: now
    };
    localStorage.setItem('session', JSON.stringify(session));
}

function getSession() {
    const sessionStr = localStorage.getItem('session');
    if (!sessionStr) return null;

    const session = JSON.parse(sessionStr);
    const now = new Date().getTime();
    const ONE_HOUR = 60 * 60 * 1000; // 3600000 ms

    if (now - session.timestamp > ONE_HOUR) {
        localStorage.removeItem('session');
        return null;
    }

    return session.data;
}

window.setSession = setSession;
window.getSession = getSession;