document.addEventListener('DOMContentLoaded', () => {
    const viewMoreLink = document.getElementById('view-more-link');
    const hiddenActivities = document.querySelectorAll('.hidden-activities'); // Select all hidden rows

    viewMoreLink.addEventListener('click', (event) => {
        event.preventDefault();

        // Loop through all hidden activities and toggle their display
        hiddenActivities.forEach(activity => {
            activity.style.display = activity.style.display === 'none' ? 'table-row' : 'none';
        });

        // Change the icon and text of the "View More" link
        const img = viewMoreLink.querySelector('img');
        if (img.src.includes('eyes-open.png')) {
            img.src = 'pictures/eyes-closed.png';
            viewMoreLink.querySelector('span').textContent = 'View Less';
        } else {
            img.src = 'pictures/eyes-open.png';
            viewMoreLink.querySelector('span').textContent = 'View More';
        }
    });

    // Hide all hidden activities initially
    hiddenActivities.forEach(activity => activity.style.display = 'none');
});
