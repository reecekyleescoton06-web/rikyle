"use strict";


/* =========================================
   GET ELEMENTS
========================================= */

const sidebar =
    document.getElementById("sidebar");

const menuButton =
    document.getElementById("menuButton");

const menuOverlay =
    document.getElementById("menuOverlay");

const mainContent =
    document.getElementById("mainContent");

const logoutButton =
    document.getElementById("logoutButton");

const navItems =
    document.querySelectorAll(".nav-item");


const pages = {

    overview:
        document.getElementById("overviewPage"),

    analytics:
        document.getElementById("analyticsPage"),

    projects:
        document.getElementById("projectsPage"),

    settings:
        document.getElementById("settingsPage")

};


/* =========================================
   GET LOGGED-IN USER
========================================= */

function getLoggedInUser() {

    const remembered =
        localStorage.getItem(
            "novaRememberedUser"
        );

    const session =
        sessionStorage.getItem(
            "novaSession"
        );


    /* -----------------------------
       REMEMBERED LOGIN
    ----------------------------- */

    if (remembered) {

        try {

            return JSON.parse(
                remembered
            );

        } catch (error) {

            console.error(
                "Invalid remembered user data.",
                error
            );

            localStorage.removeItem(
                "novaRememberedUser"
            );

        }

    }


    /* -----------------------------
       NORMAL SESSION
    ----------------------------- */

    if (session) {

        try {

            return JSON.parse(
                session
            );

        } catch (error) {

            console.error(
                "Invalid session data.",
                error
            );

            sessionStorage.removeItem(
                "novaSession"
            );

        }

    }


    return null;

}


const user =
    getLoggedInUser();


/* =========================================
   PROTECT DASHBOARD
========================================= */

if (!user) {

    window.location.replace(
        "index.html"
    );

}


/* =========================================
   DISPLAY USER INFORMATION
========================================= */

if (user) {

    const firstLetter =
        user.name
            .charAt(0)
            .toUpperCase();


    const userName =
        document.getElementById(
            "userName"
        );

    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const accountName =
        document.getElementById(
            "accountName"
        );

    const accountEmail =
        document.getElementById(
            "accountEmail"
        );

    const userAvatar =
        document.getElementById(
            "userAvatar"
        );

    const largeAvatar =
        document.getElementById(
            "largeAvatar"
        );


    /* -----------------------------
       WELCOME NAME
    ----------------------------- */

    if (userName) {

        userName.textContent =
            user.name.split(" ")[0];

    }


    /* -----------------------------
       PROFILE NAME
    ----------------------------- */

    if (profileName) {

        profileName.textContent =
            user.name;

    }


    /* -----------------------------
       PROFILE EMAIL
    ----------------------------- */

    if (profileEmail) {

        profileEmail.textContent =
            user.email;

    }


    /* -----------------------------
       ACCOUNT NAME
    ----------------------------- */

    if (accountName) {

        accountName.textContent =
            user.name;

    }


    /* -----------------------------
       ACCOUNT EMAIL
    ----------------------------- */

    if (accountEmail) {

        accountEmail.textContent =
            user.email;

    }


    /* -----------------------------
       SMALL AVATAR
    ----------------------------- */

    if (userAvatar) {

        userAvatar.textContent =
            firstLetter;

    }


    /* -----------------------------
       LARGE AVATAR
    ----------------------------- */

    if (largeAvatar) {

        largeAvatar.textContent =
            firstLetter;

    }

}


/* =========================================
   MENU FUNCTIONS
========================================= */

function openMenu() {

    if (!sidebar || !menuButton) {
        return;
    }


    sidebar.classList.add(
        "open"
    );


    menuButton.classList.add(
        "active"
    );


    if (menuOverlay) {

        menuOverlay.classList.add(
            "active"
        );

    }


    if (mainContent) {

        document.body.classList.add(
            "menu-open"
        );

    }


    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );


    menuButton.setAttribute(
        "aria-label",
        "Close dashboard menu"
    );

}


function closeMenu() {

    if (!sidebar || !menuButton) {
        return;
    }


    sidebar.classList.remove(
        "open"
    );


    menuButton.classList.remove(
        "active"
    );


    if (menuOverlay) {

        menuOverlay.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "menu-open"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    menuButton.setAttribute(
        "aria-label",
        "Open dashboard menu"
    );

}


function toggleMenu() {

    if (!sidebar) {
        return;
    }


    if (
        sidebar.classList.contains(
            "open"
        )
    ) {

        closeMenu();

    } else {

        openMenu();

    }

}


/* =========================================
   HAMBURGER BUTTON
========================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        toggleMenu
    );

}


/* =========================================
   DARK OVERLAY
========================================= */

if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        closeMenu
    );

}


/* =========================================
   CLOSE MENU WITH ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            sidebar &&
            sidebar.classList.contains(
                "open"
            )
        ) {

            closeMenu();

        }

    }
);


/* =========================================
   CHANGE DASHBOARD PAGE
========================================= */

function showPage(pageName) {

    /* -----------------------------
       Hide every page
    ----------------------------- */

    Object.values(pages).forEach(
        page => {

            if (page) {

                page.classList.remove(
                    "active"
                );

            }

        }
    );


    /* -----------------------------
       Remove active menu state
    ----------------------------- */

    navItems.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    /* -----------------------------
       Get selected page
    ----------------------------- */

    const selectedPage =
        pages[pageName];


    if (!selectedPage) {

        console.warn(
            "Dashboard page not found:",
            pageName
        );

        return;

    }


    /* -----------------------------
       Show selected page
    ----------------------------- */

    selectedPage.classList.add(
        "active"
    );


    /* -----------------------------
       Activate selected button
    ----------------------------- */

    const selectedButton =
        document.querySelector(
            `[data-page="${pageName}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "active"
        );

    }


    /* -----------------------------
       Close menu
    ----------------------------- */

    closeMenu();


    /* -----------------------------
       Scroll to top
    ----------------------------- */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   SIDEBAR NAVIGATION
========================================= */

navItems.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const pageName =
                    button.dataset.page;


                if (!pageName) {
                    return;
                }


                showPage(
                    pageName
                );

            }
        );

    }
);


/* =========================================
   LOGOUT
========================================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        () => {

            /* Close menu first */

            closeMenu();


            /* Remove remembered login */

            localStorage.removeItem(
                "novaRememberedUser"
            );


            /* Remove normal session */

            sessionStorage.removeItem(
                "novaSession"
            );


            /* Redirect to login */

            setTimeout(
                () => {

                    window.location.replace(
                        "index.html"
                    );

                },
                250
            );

        }
    );

}


/* =========================================
   VIEW ALL BUTTON
========================================= */

const viewAllButton =
    document.getElementById(
        "viewAllButton"
    );


if (viewAllButton) {

    viewAllButton.addEventListener(
        "click",
        () => {

            showPage(
                "analytics"
            );

        }
    );

}


/* =========================================
   EDIT PROFILE BUTTON
========================================= */

const editProfileButton =
    document.getElementById(
        "editProfileButton"
    );


if (editProfileButton) {

    editProfileButton.addEventListener(
        "click",
        () => {

            showPage(
                "settings"
            );

        }
    );

}


/* =========================================
   SETTINGS EDIT BUTTONS
========================================= */

const settingsEditButtons =
    document.querySelectorAll(
        ".settings-card .small-button"
    );


settingsEditButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Profile editing can be connected here."
                );

            }
        );

    }
);


/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener(
    "resize",
    () => {

        /*
         * On desktop, reset the
         * mobile menu state.
         */

        if (
            window.innerWidth > 850
        ) {

            closeMenu();

        }

    }
);


/* =========================================
   PREVENT BACKGROUND SCROLL
   WHEN MENU IS OPEN
========================================= */

function updateBodyScroll() {

    if (
        sidebar &&
        sidebar.classList.contains(
            "open"
        )
    ) {

        document.body.style.overflow =
            "hidden";

    } else {

        document.body.style.overflow =
            "";

    }

}


/* Watch menu changes */

if (sidebar) {

    const menuObserver =
        new MutationObserver(
            updateBodyScroll
        );


    menuObserver.observe(
        sidebar,
        {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );

}


/* =========================================
   INITIAL DASHBOARD
========================================= */

showPage(
    "overview"
);
