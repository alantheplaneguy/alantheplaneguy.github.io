document.addEventListener("DOMContentLoaded", () => {
    const discordBtn = document.getElementById("copy-discord");
    const discordText = document.getElementById("discord-user");

    if (discordBtn && discordText) {
        discordBtn.addEventListener("click", () => {
            navigator.clipboard.writeText("alan_theplaneguy").then(() => {
                const original = discordText.textContent;
                discordText.textContent = "copied!";
                discordBtn.classList.add("copied");

                setTimeout(() => {
                    discordText.textContent = original;
                    discordBtn.classList.remove("copied");
                }, 1500);
            });
        });
    }

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );
                    });
                }
            });
        },
        { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    const timeDisplay = document.getElementById("local-time");

    function updateTime() {
        if (!timeDisplay) return;
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-GB", {
            timeZone: "Europe/Warsaw",
            hour: "2-digit",
            minute: "2-digit",
        });
        timeDisplay.textContent = `${formatted} CET`;
    }

    updateTime();
    setInterval(updateTime, 15000);
});