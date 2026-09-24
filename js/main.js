document.addEventListener("DOMContentLoaded", () => {


    /* ==========================================
       CURSOR GLOW
    =========================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    document.addEventListener("mousemove", (event) => {

        if (!cursorGlow) return;

        cursorGlow.style.left = event.clientX + "px";

        cursorGlow.style.top = event.clientY + "px";

    });



    /* ==========================================
       MOBILE MENU
    =========================================== */

    const menuButton =
        document.querySelector(".mobile-menu");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-visible");

        });

    }



    /* ==========================================
       SCROLL REVEAL
    =========================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .method-card, .project-panel"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });



    /* ==========================================
       NAVIGATION
    =========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                if (targetId === "#") return;


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    navLinks?.classList.remove(
                        "mobile-visible"
                    );

                }

            });

        });


});