document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for internal links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Dynamic welcome message with fade-in effect
    const header = document.querySelector("header h1");
    const welcomeMessages = [
        "Welcome to the Ultimate Car Hub!",
        "Find Your Dream Car Today!",
        "Speed, Style, and Power Await!"
    ];
    let messageIndex = 0;
    setInterval(() => {
        header.style.opacity = 0;
        setTimeout(() => {
            header.textContent = welcomeMessages[messageIndex];
            header.style.opacity = 1;
            messageIndex = (messageIndex + 1) % welcomeMessages.length;
        }, 500);
    }, 3000);

    // Car selection handling with modal popup
    document.querySelectorAll(".car-card").forEach(car => {
        car.addEventListener("click", (e) => {
            e.preventDefault();
            const carName = car.querySelector("p").textContent.trim();
            openCarModal(carName);
        });
    });

    // Function to open modal with car details
    function openCarModal(carName) {
        const modal = document.createElement("div");
        modal.classList.add("car-modal");
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>${carName} Details</h2>
                <img src="images/${carName.toLowerCase().replace(/ /g, "_")}.jpg" alt="${carName}">
                <p>Experience the luxury and performance of the ${carName}. Built for speed and comfort.</p>
                <a href="buy.html" class="buy-button">Buy Now</a>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal on clicking close button
        modal.querySelector(".close-btn").addEventListener("click", () => {
            modal.classList.add("fade-out");
            setTimeout(() => modal.remove(), 500);
        });

        // Add fade-in animation
        setTimeout(() => {
            modal.classList.add("fade-in");
        }, 10);
    }

    // Dark mode toggle
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "Toggle Dark Mode";
    darkModeToggle.classList.add("dark-mode-toggle");
    document.body.appendChild(darkModeToggle);
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Apply dark mode if previously enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Back to top button with fade effect
    const backToTop = document.createElement("button");
    backToTop.textContent = "↑";
    backToTop.classList.add("back-to-top");
    document.body.appendChild(backToTop);
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Show/Hide back-to-top button on scroll with fade effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });
});

// Add enhanced styles dynamically
const style = document.createElement("style");
style.innerHTML = `
    /* Dark mode styling */
    .dark-mode {
        background-color: #111;
        color: white;
    }

    /* Themed Buttons */
    .buy-button {
        display: inline-block;
        text-decoration: none;
        font-size: 20px;
        color: white;
        background: linear-gradient(90deg, #ffcc00, #ff9900);
        padding: 10px 20px;
        border-radius: 5px;
        transition: background 0.3s ease-in-out, transform 0.2s;
    }
    .buy-button:hover {
        background: linear-gradient(90deg, #ff9900, #ff6600);
        transform: scale(1.05);
    }

    /* Back-to-top button */
    .back-to-top {
        position: fixed;
        bottom: 50px;
        right: 20px;
        padding: 12px;
        background: #007BFF;
        color: white;
        border-radius: 50%;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .back-to-top.visible {
        opacity: 1;
    }

    /* Dark mode toggle button */
    .dark-mode-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s;
    }
    .dark-mode-toggle:hover {
        background: #0056b3;
    }

    /* Modal Styling */
    .car-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .car-modal.fade-in {
        opacity: 1;
    }
    .car-modal.fade-out {
        opacity: 0;
    }
    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        max-width: 500px;
        position: relative;
        animation: fadeInUp 0.5s ease-in-out;
    }
    .modal-content img {
        width: 100%;
        border-radius: 10px;
        margin-bottom: 10px;
    }
    .close-btn {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
    }

    /* Smooth fade-in animation */
    @keyframes fadeInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
