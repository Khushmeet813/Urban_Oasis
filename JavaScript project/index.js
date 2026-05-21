function msg(text) {
    const box = document.getElementById("toast");
    box.innerText = text;
    box.classList.add("show");
    
    setTimeout(function() {
        box.classList.remove("show");
    }, 2500);
}

document.getElementById("forgotlink").onclick = function() {
    msg("Password link coming soon!");
};

document.getElementById("signuplink").onclick = function() {
    msg("Registration page coming soon!");
};

document.getElementById("loginform").onsubmit = function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const emailerror = document.getElementById("emailerror");
    const passworderror = document.getElementById("passworderror");

    let pass = true;

    if (email.indexOf("@") === -1) {
        emailerror.style.display = "block";
        pass = false;
    } else {
        emailerror.style.display = "none";
    }

    if (password.length < 6) {
        passworderror.style.display = "block";
        pass = false;
    } else {
        passworderror.style.display = "none";
    }

    if (pass === true) {
        localStorage.setItem("userEmail", email);
        const parsedName = email.split('@')[0];
        localStorage.setItem("userName", parsedName);

        msg("Success! Going to menu page...");
        
        setTimeout(function() {
            window.location.href = "2home.html"; 
        }, 1500);
    }
};