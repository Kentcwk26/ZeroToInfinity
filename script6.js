let currentSlideIndex = 0;

function showSlide(index) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    // If index is out of bounds, wrap it around
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Hide all slides and remove "active" class from dots
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }

    // Show the current slide and highlight the corresponding dot
    slides[currentSlideIndex].style.display = "block";
    dots[currentSlideIndex].classList.add("active");
}

// Next/previous controls
function changeMainSlide(n) {
    showSlide(currentSlideIndex + n);
}

// Dot controls
function currentSlide(n) {
    showSlide(n - 1);
}

// Initialize the slideshow by showing the first slide
showSlide(0);
