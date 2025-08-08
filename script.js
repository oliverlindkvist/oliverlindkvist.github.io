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
  const viewer = document.querySelector('.viewer');
  viewer.innerHTML = `<img id="main-image" src="./index.JPG" alt="Landing Image" onclick="nextImage()" />`;
  currentProject = null;
  imageList = [];
}

function loadProject(projectName) {
  currentProject = projectName;
  imageIndex = 0;

  const viewer = document.querySelector('.viewer');

  // Special handling for "about"
  if (projectName.toLowerCase() === 'about') {
    viewer.innerHTML = `
      <div class="about-text">
        <h2>About Me</h2>
        <p>I am a photographer based in Stockholm, working in digitisation at the national library.
        My work explores the relationship between archival preservation and creative expression.</p>
        <p>Contact: <a href="mailto:youremail@example.com">youremail@example.com</a></p>
      </div>
    `;
    return;
  }

  // Otherwise load images
  imageList = images[projectName];
  updateImage();
}

function nextImage() {
  if (!currentProject || imageList.length === 0) return;
  imageIndex = (imageIndex + 1) % imageList.length;
  updateImage();
}

function updateImage() {
  const viewer = document.querySelector('.viewer');
  viewer.innerHTML = `<img id="main-image" src="./projects/${currentProject}/${imageList[imageIndex]}" alt="" onclick="nextImage()" />`;
}

// Initialize
loadProjects();