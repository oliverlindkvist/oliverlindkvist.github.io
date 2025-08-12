let currentProject = null;
let imageIndex = 0;
let images = {}; 
let imageList = []; 

async function loadProjects() {
  try {
    const response = await fetch('./projects.json');
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

  // About section
  if (projectName.toLowerCase() === 'about') {
    viewer.innerHTML = `
      <div class="about-text">
        <h2>Oliver Lindkvist</h2>
        <p>is a Stockholm based photographer engaged in cultural heritage digitization, photojournalism and long-term documentary projects.</p>
        <p>Enquiries: <a href="mailto:oliver.lindkvist@me.com">oliver.lindkvist@me.com</a></p>
      </div>
    `;
    return;
  }

  // Video section
  if (projectName.toLowerCase() === 'video') {
    viewer.innerHTML = `
      <div class="video-wrapper">
        <div style="padding:76.06% 0 0 0;position:relative;">
          <iframe src="https://player.vimeo.com/video/1109333539?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            style="position:absolute;top:0;left:0;width:100%;height:100%;"
            title="PIZZERIA ROMA"></iframe>
        </div>
      </div>
      <div class="video-description">
        <p>Pizzeria Roma</p>
      </div>
    `;
    return;
  }

  // Images section
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

// Init
loadProjects();