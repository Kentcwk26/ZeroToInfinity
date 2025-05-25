document.addEventListener('DOMContentLoaded', () => {
    const viewMoreLink = document.getElementById('view-more-link');
    const hiddenFAQs = document.querySelector('.hidden-faq');

    viewMoreLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior

        // Toggle hidden FAQs
        hiddenFAQs.style.display = hiddenFAQs.style.display === 'none' ? 'block' : 'none';
        
        // Add a slight delay to allow the display property to take effect before fading
        setTimeout(() => {
            hiddenFAQs.style.opacity = hiddenFAQs.style.display === 'block' ? '1' : '0';
        }, 20);

        // Toggle the image and text
        const img = viewMoreLink.querySelector('img');
        if (img.src.includes('eyes-open.png')) {
            img.src = 'pictures/eyes-closed.png'; // Change to eyes-closed image
            viewMoreLink.querySelector('span').textContent = 'View Less'; // Change text to "View Less"
        } else {
            img.src = 'pictures/eyes-open.png'; // Change back to eyes-open image
            viewMoreLink.querySelector('span').textContent = 'View More'; // Change text to "View More"
        }
    });

    const faqQuestions = document.querySelectorAll('.faquestion');
    faqQuestions.forEach((faq) => {
        faq.addEventListener('click', () => {
            const answer = faq.nextElementSibling;
            answer.classList.toggle('visible'); // Toggle the answer visibility
            faq.classList.toggle('active'); // Toggle active class for the question
            
            // Fade in/out effect for the answer
            if (answer.classList.contains('visible')) {
                answer.style.display = 'block'; // Make sure it is displayed before fading
                setTimeout(() => {
                    answer.style.opacity = '1'; // Fade in
                }, 20); // Allow display to take effect
            } else {
                answer.style.opacity = '0'; // Fade out
                setTimeout(() => {
                    answer.style.display = 'none'; // Hide after fading out
                }, 500); // Match this time with the CSS transition duration
            }
        });
    });

    const collapseLinks = document.querySelectorAll('.collapse-link');
    collapseLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
            const answer = link.closest('.faqanswer').previousElementSibling;
            answer.classList.remove('visible'); // Hide the answer
            answer.style.opacity = '0'; // Fade out
            setTimeout(() => {
                answer.style.display = 'none'; // Hide after fading out
            }, 500); // Match this time with the CSS transition duration
            answer.classList.remove('active'); // Remove active class from the question
        });
    });
});
