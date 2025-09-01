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
  viewer.innerHTML = `
    <img id="main-image" class="fade-image visible" src="./index.JPG" alt="Landing Image" onclick="nextImage()" />
  `;
  currentProject = null;
  imageList = [];
}

function loadProject(projectName) {
  currentProject = projectName;
  imageIndex = 0;

  const viewer = document.querySelector('.viewer');

  // About section
  if (projectName.toLowerCase() === 'about') {
    let imageHtml = '';
    if (images['about'] && images['about'].length > 0) {
      imageHtml = `<img src="./projects/about/${images['about'][0]}" alt="About" class="about-image">`;
    }

    viewer.innerHTML = `
      <div class="about-text">
        ${imageHtml}
        <h2>Oliver Lindkvist</h2>
        <p>is a Stockholm based photographer engaged in cultural heritage digitization, photojournalism and long-term documentary projects.</p>
        <p>Enquiries: <a href="mailto:oliver.lindkvist@me.com">oliver.lindkvist@me.com</a></p>
      </div>
    `;
    return;
  }

  // Pizzeria Roma video section
  if (projectName.toLowerCase() === 'pizzeria roma') {
    viewer.innerHTML = `
      <div class="video-wrapper">
        <iframe 
          src="https://player.vimeo.com/video/1109333539?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          title="PIZZERIA ROMA">
        </iframe>
      </div>
      <div class="video-description">
        <p></p>
      </div>
    `;
    return;
  }

  // Image section
  viewer.innerHTML = `
    <img id="main-image" class="fade-image visible" alt="" onclick="nextImage()" />
  `;

  imageList = images[projectName];
  updateImage();
}

function nextImage() {
  if (!currentProject || imageList.length === 0) return;
  imageIndex = (imageIndex + 1) % imageList.length;
  updateImage();
}

function updateImage() {
  const img = document.getElementById('main-image');
  const newSrc = `./projects/${currentProject}/${imageList[imageIndex]}`;

  img.classList.remove('visible'); // start fade-out

  const tempImg = new Image();
  tempImg.onload = () => {
    img.src = newSrc;
    requestAnimationFrame(() => {
      img.classList.add('visible'); // fade back in
    });
  };
  tempImg.src = newSrc;
}

// Init
loadProjects();
