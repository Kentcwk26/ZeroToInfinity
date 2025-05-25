let studioImageIndex = 0;

const studioImages = {
    'studioA': ['pictures/399142435_324786113501031_5278360225113880949_n.jpg','pictures/Screenshot 2024-10-11 023626.png','pictures/Screenshot 2024-10-11 023705.png','pictures/Screenshot 2024-10-11 023739.png'],
    'studioB': ['pictures/398179639_736384281866394_6463279714230769553_n.jpg','pictures/Screenshot 2024-10-11 023804.png','pictures/Screenshot 2024-10-11 023917.png']
};

let currentStudio = '';

function openModal(studio) {
  currentStudio = studio;
  studioImageIndex = 0;
  document.getElementById("modalImage").src = studioImages[currentStudio][studioImageIndex];
  document.getElementById("myModal").style.display = "flex";
  document.body.classList.add("modal-open");
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.body.classList.remove("modal-open");
}

function changeModalSlide(n) {
  studioImageIndex += n;
  if (studioImageIndex >= studioImages[currentStudio].length) {
    studioImageIndex = 0;
  }
  if (studioImageIndex < 0) {
    studioImageIndex = studioImages[currentStudio].length - 1;
  }
  document.getElementById("modalImage").src = studioImages[currentStudio][studioImageIndex];
}

window.onclick = function(event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
    closeModal();
  }
};
