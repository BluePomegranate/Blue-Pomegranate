document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const navContainer = document.querySelector('.nav-container');
            if (navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle - Robust Version
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');

    console.log("Menu Logic Loaded", menuToggle, navContainer);

    if (menuToggle && navContainer) {
        menuToggle.onclick = function (e) {
            e.stopPropagation(); // Prevent clicks from bubbling
            console.log("Menu Clicked");

            // Toggle core class
            navContainer.classList.toggle('active');

            // Update Icon
            const icon = menuToggle.querySelector('.material-icons-round');
            const isOpen = navContainer.classList.contains('active');
            if (isOpen) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        };
    }

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Contact Form Logic
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const sendBtn = contactForm.querySelector('button');
        const inputs = contactForm.querySelectorAll('input, textarea');

        sendBtn.addEventListener('click', () => {
            const name = inputs[0].value;
            const email = inputs[1].value;
            const message = inputs[2].value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Simulate Sending UI
            const originalText = sendBtn.innerText;
            sendBtn.innerText = 'Sending...';
            sendBtn.style.opacity = '0.7';
            sendBtn.disabled = true;

            setTimeout(() => {
                // Construct Mailto Link
                const subject = `Contact from ${name} (Blue Pomegranate Website)`;
                const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                window.location.href = `mailto:bluepomegranate.inc@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

                // Reset UI
                sendBtn.innerText = 'Message Sent!';
                sendBtn.style.backgroundColor = '#166534'; // Success Green
                sendBtn.style.color = '#fff';

                setTimeout(() => {
                    sendBtn.innerText = originalText;
                    sendBtn.disabled = false;
                    sendBtn.style.opacity = '1';
                    sendBtn.style.backgroundColor = ''; // Reset to CSS default
                    contactForm.reset();
                }, 3000);
            }, 1000);
        });
    }

    console.log("Blue Pomegranate UX Loaded.");
});
