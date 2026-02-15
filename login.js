document.getElementById("submit").addEventListener("click", function (event) {

    console.log("Login Button was clicked");


    const usernameInput = document.getElementById("username")?.value.trim();
    const passwordInput = document.getElementById("password")?.value.trim();
    const username = "username"
    const password = "password";

    if (usernameInput === username && passwordInput === password) {
        window.alert("logged successful");
    } else if (usernameInput === username && passwordInput !== password) {
        window.alert("wrong password");
        event.preventDefault();
    } else {
        window.alert("login failed");
        event.preventDefault();
    }

});