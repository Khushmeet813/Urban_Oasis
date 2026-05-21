document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profile");

    const panel = document.createElement("div");
    panel.id = "profilePanel";
    document.body.appendChild(panel);

    profileIcon.addEventListener("click", function (event) {
        event.preventDefault(); 
        
        const email = localStorage.getItem("userEmail");
        const name = localStorage.getItem("userName");

        if (!email) {
            window.location.href = "index.html";
            return;
        }

        panel.innerHTML = `
            <h3>Welcome back!</h3>
            <p class="user-name">👤 ${name}</p>
            <p class="user-email">✉️ ${email}</p>
            <button id="logoutBtn">Log Out</button>
        `;

        const rect = profileIcon.getBoundingClientRect();
        panel.style.top = `${rect.bottom + window.scrollY + 10}px`;
        
        panel.classList.toggle("show");
        panel.style.left = `${rect.right + window.scrollX - panel.offsetWidth}px`;
    });

    document.addEventListener("click", function (event) {
        if (event.target && event.target.id === "logoutBtn") {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userName");
            panel.classList.remove("show");
            
            window.location.href = "index.html"; 
        }
        
        if (!panel.contains(event.target) && !profileIcon.contains(event.target)) {
            panel.classList.remove("show");
        }
    });
});

const statusElement = document.getElementById('status');
const now = new Date();
const hour = now.getHours();

if (hour >= 9 && hour < 21) {
    statusElement.innerHTML = "📍 Visit Us — <span style='color: green;'>We're Open!</span>";
} else {
    statusElement.innerHTML = "📍 Visit Us — <span style='color: red;'>Closed (Opens at 9 AM)</span>";
}