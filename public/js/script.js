"use strict";


/* =====================================
   ELEMENTS
===================================== */

const panels = {
    login: document.getElementById("loginPanel"),
    register: document.getElementById("registerPanel"),
    forgot: document.getElementById("forgotPanel"),
    success: document.getElementById("successPanel")
};

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotForm = document.getElementById("forgotForm");

const toast = document.getElementById("toast");

const successMessage = document.getElementById("successMessage");
const successButton = document.getElementById("successButton");


/* =====================================
   RANDOM TRANSITIONS
===================================== */

const transitions = [
    "transition-left",
    "transition-right",
    "transition-up",
    "transition-down"
];

function getRandomTransition() {
    return transitions[
        Math.floor(Math.random() * transitions.length)
    ];
}


/* =====================================
   PANEL NAVIGATION
===================================== */

function showPanel(name) {

    Object.values(panels).forEach(panel => {
        panel.classList.remove(
            "active",
            "transition-left",
            "transition-right",
            "transition-up",
            "transition-down"
        );
    });

    const panel = panels[name];

    if (!panel) return;

    panel.classList.add("active");

    const randomAnimation = getRandomTransition();

    panel.classList.add(randomAnimation);
}


/* =====================================
   NAVIGATION BUTTONS
===================================== */

document.querySelectorAll("[data-panel]").forEach(button => {

    button.addEventListener("click", () => {

        const panel = button.dataset.panel;

        showPanel(panel);

    });

});


/* =====================================
   PASSWORD VISIBILITY
===================================== */

document.querySelectorAll(".password-toggle").forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const input = document.getElementById(targetId);

        if (input.type === "password") {

            input.type = "text";

            button.textContent = "Hide";

        } else {

            input.type = "password";

            button.textContent = "Show";
        }

    });

});


/* =====================================
   TOAST
===================================== */

let toastTimer;

function showToast(message, type = "error") {

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.className = `toast ${type} show`;

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);
}


/* =====================================
   PASSWORD HASHING
===================================== */

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest("SHA-256", data);

    const hashArray =
        Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


/* =====================================
   GET USERS
===================================== */

function getUsers() {

    return JSON.parse(
        localStorage.getItem("novaUsers") || "[]"
    );

}


/* =====================================
   SAVE USERS
===================================== */

function saveUsers(users) {

    localStorage.setItem(
        "novaUsers",
        JSON.stringify(users)
    );

}


/* =====================================
   REGISTER
===================================== */

registerForm.addEventListener("submit", async event => {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        showToast(
            "Passwords do not match.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showToast(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    const users = getUsers();


    const existingUser = users.find(
        user => user.email === email
    );


    if (existingUser) {

        showToast(
            "An account with this email already exists.",
            "error"
        );

        return;
    }


    const passwordHash =
        await hashPassword(password);


    users.push({
        id: crypto.randomUUID(),
        name,
        email,
        password: passwordHash,
        createdAt: new Date().toISOString()
    });


    saveUsers(users);


    successMessage.textContent =
        "Your account has been created successfully.";

    successButton.dataset.next = "login";

    showPanel("success");

});


/* =====================================
   LOGIN
===================================== */

loginForm.addEventListener("submit", async event => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("loginPassword").value;

    const rememberMe =
        document.getElementById("rememberMe").checked;


    const users = getUsers();

    const user = users.find(
        user => user.email === email
    );


    if (!user) {

        showToast(
            "Incorrect email or password.",
            "error"
        );

        return;
    }


    const passwordHash =
        await hashPassword(password);


    if (passwordHash !== user.password) {

    showToast(
        "Incorrect email or password.",
        "error"
    );

    return;
}

const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    loggedInAt: new Date().toISOString()
};

if (rememberMe) {

    localStorage.setItem(
        "novaRememberedUser",
        JSON.stringify(session)
    );

} else {

    sessionStorage.setItem(
        "novaSession",
        JSON.stringify(session)
    );
}

successMessage.textContent =
    `Welcome back, ${user.name}! You have successfully signed in.`;

showPanel("success");

setTimeout(() => {
    window.location.href = "dashboard.html";
}, 1000);

});


/* =====================================
   FORGOT PASSWORD
===================================== */

forgotForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        document.getElementById("forgotEmail").value
        .trim()
        .toLowerCase();


    const users = getUsers();

    const user = users.find(
        user => user.email === email
    );


    /*
        This demo doesn't actually send an email.

        In a real production application, this
        request should go to your backend/API.
    */

    if (!user) {

        showToast(
            "If an account exists for this email, a reset link will be sent.",
            "success"
        );

        return;
    }


    successMessage.textContent =
        "A password reset request has been prepared for your account.";

    successButton.dataset.next = "login";

    showPanel("success");

});


/* =====================================
   SUCCESS BUTTON
===================================== */

successButton.addEventListener("click", () => {

    const next =
        successButton.dataset.next || "login";

    showPanel(next);

});


/* =====================================
   REMEMBERED USER
===================================== */

function loadRememberedUser() {

    const saved =
        localStorage.getItem("novaRememberedUser");

    if (!saved) return;

    try {

        const user = JSON.parse(saved);

        document.getElementById("loginEmail").value =
            user.email;

        document.getElementById("rememberMe").checked =
            true;

    } catch (error) {

        localStorage.removeItem("novaRememberedUser");

    }

}


/* =====================================
   LOGOUT HELPER
===================================== */

function logout() {

    localStorage.removeItem("novaRememberedUser");

    sessionStorage.removeItem("novaSession");

    showPanel("login");

    showToast(
        "You have been signed out.",
        "success"
    );

}


/* =====================================
   INITIALIZE
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadRememberedUser();

    showPanel("login");

});


