/* =========================================
   ARNOLD WASIKE PORTFOLIO
========================================= */


/* =========================================
   YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();



/* =========================================
   LIGHT / DARK MODE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


/*
    Check if the visitor already selected
    a theme before.
*/

const savedTheme =
    localStorage.getItem("arnold-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeIcon.textContent = "☀";

}


/*
    Theme switch
*/

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");


    const isLight =
        document.body.classList.contains("light");


    if (isLight) {

        themeIcon.textContent = "☀";

        localStorage.setItem(
            "arnold-theme",
            "light"
        );

    } else {

        themeIcon.textContent = "☾";

        localStorage.setItem(
            "arnold-theme",
            "dark"
        );

    }

});



/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const closeMenu =
    document.getElementById("closeMenu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.add("open");

    document.body.classList.add("menu-open");

});


closeMenu.addEventListener("click", () => {

    mobileMenu.classList.remove("open");

    document.body.classList.remove("menu-open");

});


/*
    Close menu when a link is clicked.
*/

document.querySelectorAll(
    ".mobile-menu a"
).forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        document.body.classList.remove(
            "menu-open"
        );

    });

});



/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================
   BOTTOM NAV ACTIVE STATE
========================================= */

const navLinks =
    document.querySelectorAll(
        ".bottom-nav a"
    );


const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }


                const currentId =
                    entry.target.id;


                navLinks.forEach(link => {

                    link.classList.toggle(

                        "active",

                        link.getAttribute(
                            "href"
                        ) ===
                        "#" + currentId

                    );

                });

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});



/* =========================================
   PROJECT MODAL
========================================= */

const modal =
    document.getElementById(
        "projectModal"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalTags =
    document.getElementById(
        "modalTags"
    );


const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    const button =
        card.querySelector(
            ".project-button"
        );


    button.addEventListener(
        "click",
        () => {

            const title =
                card.dataset.title;


            const description =
                card.dataset.description;


            const tags =
                card.dataset.tags
                    .split(",");


            modalTitle.textContent =
                title;


            modalDescription.textContent =
                description;


            modalTags.innerHTML = "";


            tags.forEach(tag => {

                const element =
                    document.createElement(
                        "span"
                    );


                element.textContent =
                    tag.trim();


                modalTags.appendChild(
                    element
                );

            });


            modal.classList.add(
                "open"
            );


            document.body.classList.add(
                "modal-open"
            );

        }

    );

});



/*
    Close modal
*/

modalClose.addEventListener(
    "click",
    closeModal
);


document.querySelector(
    ".modal-overlay"
).addEventListener(
    "click",
    closeModal
);


function closeModal() {

    modal.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "modal-open"
    );

}



/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

            mobileMenu.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);



/* =========================================
   HORIZONTAL DRAG SCROLL
========================================= */

document.querySelectorAll(
    ".horizontal-scroll"
).forEach(scroller => {

    let isDragging = false;

    let startX = 0;

    let startingScroll = 0;


    scroller.addEventListener(
        "pointerdown",
        event => {

            isDragging = true;

            startX =
                event.pageX -
                scroller.offsetLeft;

            startingScroll =
                scroller.scrollLeft;

            scroller.setPointerCapture(
                event.pointerId
            );

        }
    );


    scroller.addEventListener(
        "pointermove",
        event => {

            if (!isDragging) {
                return;
            }


            event.preventDefault();


            const currentX =
                event.pageX -
                scroller.offsetLeft;


            const distance =
                (currentX - startX) * 1.15;


            scroller.scrollLeft =
                startingScroll - distance;

        }
    );


    const stopDragging = () => {

        isDragging = false;

    };


    scroller.addEventListener(
        "pointerup",
        stopDragging
    );


    scroller.addEventListener(
        "pointercancel",
        stopDragging
    );


    scroller.addEventListener(
        "pointerleave",
        stopDragging
    );

});