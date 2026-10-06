"use strict";

/* =========================================
   GET ELEMENTS
========================================= */

const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const mainContent = document.getElementById("mainContent");
const logoutButton = document.getElementById("logoutButton");

const navItems = document.querySelectorAll(".nav-item");


/* =========================================
   DASHBOARD PAGES
========================================= */

const pages = {
    overview: document.getElementById("overviewPage"),
    system: document.getElementById("systemPage"),
    lib: document.getElementById("libPage"),
    settings: document.getElementById("settingsPage")
};


/* =========================================
   PAGE TITLES
========================================= */

const pageTitles = {

    overview: {
        label: "OVERVIEW",
        title: "Dashboard",
        description: "Welcome to your AresX dashboard."
    },

    system: {
        label: "SYSTEM",
        title: "Online System",
        description: "Monitor and manage your online system."
    },

    lib: {
        label: "LIBRARY",
        title: "Online Lib",
        description: "Access your available online library."
    },

    settings: {
        label: "SETTINGS",
        title: "Settings",
        description: "Manage your account preferences."
    },

    keygen: {
        label: "KEYGEN",
        title: "Manage Keygen Links",
        description: "Create and manage your key generation links."
    },

    gamesys: {
        label: "ADMIN",
        title: "Online System",
        description: "Manage the administrator online system."
    },

    onlinelib: {
        label: "ADMIN",
        title: "Online LIB",
        description: "Manage the administrator online library."
    },

    hacking: {
        label: "ADMIN",
        title: "Manage Hacking Attempt",
        description: "Monitor and manage security attempts."
    },

    private: {
        label: "ADMIN",
        title: "Private Dashboard",
        description: "Access your private administrator dashboard."
    },

    users: {
        label: "ADMIN",
        title: "Manage Users",
        description: "Manage registered dashboard users."
    },

    referral: {
        label: "ADMIN",
        title: "Create Referral",
        description: "Create and manage referral links."
    }
};


/* =========================================
   GET LOGGED-IN USER
========================================= */

function getLoggedInUser() {

    const remembered =
        localStorage.getItem("novaRememberedUser");

    const session =
        sessionStorage.getItem("novaSession");


    /* ---------------------------------
       REMEMBERED LOGIN
    --------------------------------- */

    if (remembered) {

        try {

            return JSON.parse(remembered);

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


    /* ---------------------------------
       NORMAL SESSION
    --------------------------------- */

    if (session) {

        try {

            return JSON.parse(session);

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


const user = getLoggedInUser();


/* =========================================
   PROTECT DASHBOARD
========================================= */

if (!user) {

    window.location.replace("index.html");

}


/* =========================================
   DISPLAY USER INFORMATION
========================================= */

if (user) {

    const safeName =
        typeof user.name === "string" &&
        user.name.trim()
            ? user.name.trim()
            : "User";


    const safeEmail =
        typeof user.email === "string" &&
        user.email.trim()
            ? user.email.trim()
            : "user@example.com";


    const firstLetter =
        safeName.charAt(0).toUpperCase();


    const userName =
        document.getElementById("userName");

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const accountName =
        document.getElementById("accountName");

    const accountEmail =
        document.getElementById("accountEmail");

    const userAvatar =
        document.getElementById("userAvatar");

    const largeAvatar =
        document.getElementById("largeAvatar");


    if (userName) {

        userName.textContent =
            safeName.split(" ")[0];

    }


    if (profileName) {

        profileName.textContent =
            safeName;

    }


    if (profileEmail) {

        profileEmail.textContent =
            safeEmail;

    }


    if (accountName) {

        accountName.textContent =
            safeName;

    }


    if (accountEmail) {

        accountEmail.textContent =
            safeEmail;

    }


    if (userAvatar) {

        userAvatar.textContent =
            firstLetter;

    }


    if (largeAvatar) {

        largeAvatar.textContent =
            firstLetter;

    }

}


/* =========================================
   CREATE MISSING PAGE
========================================= */

function createMissingPage(pageName) {

    if (!mainContent) {
        return null;
    }


    /* Already exists */

    if (pages[pageName]) {
        return pages[pageName];
    }


    const information =
        pageTitles[pageName] || {
            label: "ARES X",
            title: pageName,
            description: "Dashboard section."
        };


    const section =
        document.createElement("section");


    section.className =
        "page-section";


    section.id =
        pageName + "Page";


    section.innerHTML = `

        <div class="page-heading">

            <p class="eyebrow">
                ${information.label}
            </p>

            <h1>
                ${information.title}
            </h1>

            <p>
                ${information.description}
            </p>

        </div>


        <div class="dashboard-card">

            <div class="card-header">

                <div>

                    <h3>
                        ${information.title}
                    </h3>

                    <p>
                        This section is ready to be connected.
                    </p>

                </div>

            </div>


            <div style="
                padding: 45px 20px;
                text-align: center;
            ">

                <div style="
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 18px;
                    display: grid;
                    place-items: center;
                    border-radius: 16px;
                    background: rgba(99,102,241,.12);
                    color: #a78bfa;
                    font-size: 25px;
                    border: 1px solid rgba(139,92,246,.18);
                ">
                    ✦
                </div>

                <h3 style="
                    margin-bottom: 8px;
                    font-size: 16px;
                ">
                    ${information.title}
                </h3>

                <p style="
                    color: #94a3b8;
                    font-size: 11px;
                    line-height: 1.7;
                ">
                    ${information.description}
                </p>

            </div>

        </div>

    `;


    mainContent.insertBefore(
        section,
        mainContent.querySelector("footer")
    );


    pages[pageName] =
        section;


    return section;
}


/* =========================================
   MENU SCROLL CONTROL
========================================= */

function updateBodyScroll() {

    /*
     * Only lock page scrolling while
     * the mobile sidebar is open.
     */

    if (
        sidebar &&
        sidebar.classList.contains("open") &&
        window.innerWidth <= 850
    ) {

        document.body.style.overflow =
            "hidden";

    } else {

        document.body.style.overflow =
            "";

    }

}


/* =========================================
   OPEN MENU
========================================= */

function openMenu() {

    if (!sidebar || !menuButton) {
        return;
    }


    sidebar.classList.add("open");

    menuButton.classList.add("active");


    if (menuOverlay) {

        menuOverlay.classList.add("active");

    }


    document.body.classList.add(
        "menu-open"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );


    menuButton.setAttribute(
        "aria-label",
        "Close dashboard menu"
    );


    updateBodyScroll();

}


/* =========================================
   CLOSE MENU
========================================= */

function closeMenu() {

    if (!sidebar || !menuButton) {
        return;
    }


    sidebar.classList.remove("open");

    menuButton.classList.remove("active");


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


    updateBodyScroll();

}


/* =========================================
   TOGGLE MENU
========================================= */

function toggleMenu() {

    if (!sidebar) {
        return;
    }


    if (
        sidebar.classList.contains("open")
    ) {

        closeMenu();

    } else {

        openMenu();

    }

}


/* =========================================
   HAMBURGER
========================================= */

if (menuButton) {

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    menuButton.setAttribute(
        "aria-label",
        "Open dashboard menu"
    );


    menuButton.addEventListener(
        "click",
        toggleMenu
    );

}


/* =========================================
   OVERLAY
========================================= */

if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        closeMenu
    );

}


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            sidebar &&
            sidebar.classList.contains("open")
        ) {

            closeMenu();

        }

    }
);


/* =========================================
   SHOW PAGE
========================================= */

function showPage(pageName) {

    /*
     * If the page does not exist in HTML,
     * create it automatically.
     */

    let selectedPage =
        pages[pageName];


    if (!selectedPage) {

        selectedPage =
            createMissingPage(pageName);

    }


    if (!selectedPage) {

        console.warn(
            "Dashboard page could not be created:",
            pageName
        );

        return;

    }


    /* ---------------------------------
       Hide all pages
    --------------------------------- */

    Object.values(pages).forEach(
        page => {

            if (page) {

                page.classList.remove(
                    "active"
                );

            }

        }
    );


    /* ---------------------------------
       Remove active navigation
    --------------------------------- */

    navItems.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    /* ---------------------------------
       Show selected page
    --------------------------------- */

    selectedPage.classList.add(
        "active"
    );


    /* ---------------------------------
       Activate selected navigation
    --------------------------------- */

    const selectedButton =
        document.querySelector(
            `[data-page="${pageName}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "active"
        );

    }


    /* ---------------------------------
       Close mobile menu
    --------------------------------- */

    closeMenu();


    /* ---------------------------------
       Scroll dashboard to top
    --------------------------------- */

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
            event => {

                event.preventDefault();


                const pageName =
                    button.dataset.page;


                if (!pageName) {
                    return;
                }


                showPage(pageName);

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
        event => {

            event.preventDefault();


            closeMenu();


            /* Remove remembered login */

            localStorage.removeItem(
                "novaRememberedUser"
            );


            /* Remove current session */

            sessionStorage.removeItem(
                "novaSession"
            );


            /* Redirect */

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
   VIEW ALL
========================================= */

const viewAllButton =
    document.querySelector(
        ".card-header .small-button"
    );


if (viewAllButton) {

    viewAllButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showPage("system");

        }
    );

}


/* =========================================
   EDIT PROFILE
========================================= */

const editProfileButton =
    document.querySelector(
        ".edit-button"
    );


if (editProfileButton) {

    editProfileButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showPage("settings");

        }
    );

}


/* =========================================
   SETTINGS BUTTONS
========================================= */

const settingsEditButtons =
    document.querySelectorAll(
        ".settings-card .small-button"
    );


settingsEditButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                alert(
                    "Profile editing can be connected here."
                );

            }
        );

    }
);


/* =========================================
   LIBRARY BUTTONS
========================================= */

const libraryButtons =
    document.querySelectorAll(
        ".library-card .small-button"
    );


libraryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                alert(
                    "Library section is ready to be connected."
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
         * If desktop mode is reached,
         * close the mobile menu.
         */

        if (window.innerWidth > 850) {

            closeMenu();

        }

        updateBodyScroll();

    }
);


/* =========================================
   SIDEBAR OBSERVER
========================================= */

if (sidebar) {

    const menuObserver =
        new MutationObserver(
            updateBodyScroll
        );


    menuObserver.observe(
        sidebar,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );

}


/* =========================================
   INITIAL DASHBOARD
========================================= */

showPage("overview");


/* =========================================
   INITIAL SCROLL STATE
========================================= */

updateBodyScroll();
