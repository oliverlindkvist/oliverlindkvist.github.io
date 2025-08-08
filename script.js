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
        <h2>Oliver Lindkvist</h2>
        <p>is a Stockholm based photographer engaged in cultural heritage digitization, photojournalism and long-term documentary projects. </p>
        <p>Enquiries: <a href="mailto:oliver.lindkvist@me.com">oliver.lindkvist@me.com</a></p>
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