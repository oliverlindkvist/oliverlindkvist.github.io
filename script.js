let currentProject = null;
let imageIndex = 0;
let images = {}; 
let imageList = []; 

// Load project list from JSON
async function loadProjects() {
  try {
    const response = await fetch('./projects.json'); // explicit relative path
    images = await response.json();

    const menu = document.getElementById('project-list');
    menu.innerHTML = '';

    for (let project in images) {
      const li = document.createElement('li');
      li.textContent = project;
      li.onclick = () => loadProject(project);
      menu.appendChild(li);
    }

    showLandingImage();
  } catch (err) {
    console.error('Failed to load project list:', err);
  }
}

function showLandingImage() {
  const img = document.getElementById('main-image');
  img.src = './index.jpg'; // ensure relative path
  currentProject = null;
  imageList = [];
}

function loadProject(projectName) {
  currentProject = projectName;
  imageList = images[projectName];
  imageIndex = 0;
  updateImage();
}

function nextImage() {
  if (!currentProject || imageList.length === 0) return;
  imageIndex = (imageIndex + 1) % imageList.length;
  updateImage();
}

function updateImage() {
  const img = document.getElementById('main-image');
  img.src = `./projects/${currentProject}/${imageList[imageIndex]}`; 
}

// Initialize
loadProjects();