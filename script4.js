let mainSlideIndex = 0;
showMainSlides(mainSlideIndex);

// Function to change slides
function changeMainSlide(n) {
    showMainSlides(mainSlideIndex += n);
}

// Function to show the slides
function showMainSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");

    if (n >= slides.length) {
        mainSlideIndex = 0;
    }
    if (n < 0) {
        mainSlideIndex = slides.length - 1;
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the current slide
    slides[mainSlideIndex].style.display = "block";

    // Check if the current slide is a video
    if (slides[mainSlideIndex].querySelector('video')) {
        // For videos, set the interval to the video's duration or loop
        const video = slides[mainSlideIndex].querySelector('video');
        video.play();
        video.onended = () => changeMainSlide(1); // Change slide when video ends
    } else {
        // For images, change slides every 10 seconds
        setTimeout(() => {
            changeMainSlide(1);
        }, 15000); // 15 seconds
    }
}

// Initial call to show the first slide
showMainSlides(mainSlideIndex);

// Interval for automatic slideshow for images
setInterval(() => {
    if (!document.querySelector('.slide-fade video')) {
        changeMainSlide(1);
    }
}, 5000); // Change slide every 5 seconds when video is not playing
