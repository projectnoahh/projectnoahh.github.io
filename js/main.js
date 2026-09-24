document.addEventListener("DOMContentLoaded", () => {

    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow) {
        document.addEventListener(
            "mousemove",
            (event) => {
                cursorGlow.style.left = `${event.clientX}px`;
                cursorGlow.style.top = `${event.clientY}px`;
            },
            { passive: true }
        );
    }

    const menuButton = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    const closeMobileMenu = () => {
        if (!navLinks || !menuButton) return;

        navLinks.classList.remove("mobile-visible");
        menuButton.setAttribute("aria-expanded", "false");
    };

    const openMobileMenu = () => {
        if (!navLinks || !menuButton) return;

        navLinks.classList.add("mobile-visible");
        menuButton.setAttribute("aria-expanded", "true");
    };

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("mobile-visible");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => closeMobileMenu());
        });

        document.addEventListener("click", (event) => {
            if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });
    }

    const revealElements = document.querySelectorAll(
        ".service-card, .method-card, .project-card, .technology-card, .founder-card"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window && revealElements.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("revealed"));
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            closeMobileMenu();
        });
    });
});