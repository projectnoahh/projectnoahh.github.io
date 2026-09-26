document.addEventListener("DOMContentLoaded", () => {
    // CURSOR GLOW
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

    // MOBILE MENU
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
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });
    }

    // SCROLL REVEAL
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
        revealElements.forEach((element) => {
            element.classList.add("revealed");
        });
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            closeMobileMenu();
        });
    });

    // CONTACT FORM
    const contactForm = document.querySelector("#contact-form");
    const formNote = document.querySelector("#form-note");
    const contactEmail = "your-email@example.com";

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (contactEmail === "your-email@example.com") {
                if (formNote) {
                    formNote.textContent =
                        "Please configure the contact email address in js/main.js before using this form.";
                }
                return;
            }

            const formData = new FormData(contactForm);

            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim();
            const topic = String(
                formData.get("topic") || "General inquiry"
            ).trim();
            const message = String(
                formData.get("message") || ""
            ).trim();

            const subject = encodeURIComponent(
                `PROJECT Noahh inquiry — ${topic}`
            );

            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Topic: ${topic}\n\n` +
                `Message:\n${message}`
            );

            window.location.href =
                `mailto:${contactEmail}?subject=${subject}&body=${body}`;

            if (formNote) {
                formNote.textContent =
                    "Your email app should open with the message prepared. Review it and send it from there.";
            }
        });
    }
});