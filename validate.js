//practice usage of md5 hash on a password lol

function login() {
    const inputPassword = document.getElementById("passwordInput").value;
    const inputHash = CryptoJS.MD5(inputPassword).toString();
    const storedHash = "3985ed63d5590ea2bfabea0438c0e19c"; // hash also if u see this, ur a freaking nerd leave me alone.


    if (inputHash === storedHash) {
        window.location.href = 'plan.html'; // Redirect to the success page
    } else {
        alert("Incorrect password.");
    }
}
