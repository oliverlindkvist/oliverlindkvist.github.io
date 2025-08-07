let currentProject = 'project1';
let imageIndex = 0;
let images = [];

function loadProject(projectName) {
  currentProject = projectName;
  imageIndex = 0;

  // You manually list the image filenames for each project
  const imageMap = {
    'project1': ['image1.jpg', 'image2.jpg'],
    'project2': ['image1.jpg', 'image2.jpg'],
  };

  images = imageMap[projectName];
  updateImage();
}

function nextImage() {
  if (images.length === 0) return;
  imageIndex = (imageIndex + 1) % images.length;
  updateImage();
}

function updateImage() {
  const img = document.getElementById('main-image');
  img.src = `projects/${currentProject}/${images[imageIndex]}`;
}

// Initialize
loadProject('project1');