document.addEventListener("DOMContentLoaded", async () => {
    const placeholder = document.getElementById("navbar-placeholder");

    if (!placeholder) return;

    try {
        const response = await fetch("navbar.html");

        if (!response.ok) {
            throw new Error("Could not load navbar.html");
        }

        placeholder.innerHTML = await response.text();

        // Highlight the current page
        const currentPage = window.location.pathname
            .split("/")
            .pop() || "index.html";

        document.querySelectorAll(".nav-links a").forEach(link => {
            if (link.dataset.page === currentPage) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            }
        });

        // Mobile menu
        const menuButton = document.querySelector(".mobile-menu");
        const navLinks = document.querySelector(".nav-links");

        if (menuButton && navLinks) {
            menuButton.addEventListener("click", () => {
                const isOpen = navLinks.classList.toggle("mobile-visible");
                menuButton.setAttribute("aria-expanded", String(isOpen));
            });
        }
    } catch (error) {
        console.error("Navbar loading failed:", error);
    }
});