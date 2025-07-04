/** 
* This code handles all of the UI functionality of the wesbite, such as
* changing the page, loading data, and managing the project modals. 
*/


/* GLOBALS */

const body = document.querySelector("body");
const navLinks = document.getElementById("nav-links");
const navButtons = document.getElementsByClassName("button");
// Pages
const projectsPage = document.getElementById("projects-page");
const aboutPage = document.getElementById("about-page");
const resumePage = document.getElementById("resume-page");
const pages = [projectsPage, aboutPage, resumePage];
// Modal
const projectModal = document.getElementById("project-modal");
const closeButton = document.getElementById("close-button");
const modalTitle = document.getElementById("modal-title");
const modalLink = document.getElementById("button-link");
const modalSummary = document.getElementById("modal-summary");
const text1 = document.getElementById("modal-text1");
const img1 = document.getElementById("modal-img1");
const text2 = document.getElementById("modal-text2");
const img2 = document.getElementById("modal-img2");

/* MAIN */

// Event Listeners

// Invokes changePage function when one of the navbar buttons is pushed
navLinks.addEventListener("click", (e) => {
  changePage(e);
});

projectsPage.addEventListener("click", (e) => {
  showProjectModal(e);
});

window.addEventListener("click", (e) => {
  hideProjectModal(e);
});

loadProjectData();

/* FUNCTIONS */

function changePage(e) {
  /** 
  * Clears pages, then displays the newly selected page
  */
  window.scrollTo(0, 0);
  switch (e.target.id) {
    case "home-button":
      clearPage();
      e.target.classList.add("selected-button");
      break;
    case "projects-button":
      clearPage();
      projectsPage.classList.remove("hidden");
      projectsPage.classList.add("shown-page");
      e.target.classList.add("selected-button");
      break;
    case "resume-button":
      clearPage();
      resumePage.classList.remove("hidden");
      resumePage.classList.add("shown-page");
      e.target.classList.add("selected-button");
      break;
    case "about-button":
      clearPage();
      aboutPage.classList.remove("hidden");
      aboutPage.classList.add("shown-page");
      e.target.classList.add("selected-button");
      break;
  }
}

function clearPage() {
  /**
  * Deselects the nav-buttons and hides all the pages
  */
  for (let button of navButtons) {
    button.classList.remove("selected-button");
  }
  for (let page of pages) {
    page.classList.add("hidden");
    page.classList.remove("shown-page");
  }
}

function loadProjectData() {
  /**
  * Fills the HTML project lists with the project data
  */
  document.getElementById("project-list").innerHTML = addProjectButtons(
    projectData,
    "project"
  );
  document.getElementById("game-list").innerHTML = addProjectButtons(
    gameData,
    "game"
  );
  document.getElementById("challenge-list").innerHTML = addProjectButtons(
    challegeData,
    "challenge"
  );
}

function addProjectButtons(projectArray, type) {
  /**
  * Structures an html project-button from a collection of projects
  */
  var outputHTML = "";
  for (let project of projectArray) {
    const index = projectArray.indexOf(project);
    outputHTML += `<div class="project-button" value="${index}" data-type="${type}">
    <img src="${project.icon}" value="${index}" data-type="${type}" alt="" />
    <p value="${index}" data-type="${type}">${project.title}</p>
    </div>\n`;
  }
  return outputHTML;
}

function showProjectModal(e) {
  /**
  * Shows the modal when clicking on a project button
  */
  if (e.target.dataset.type) {
    projectModal.classList.remove("hidden");
    projectModal.classList.add("shown-modal");
    body.height = "100vh";
    body.style.overflowY = "hidden";
    if (e.target.dataset.type === "project")
      fillProjectModal(e, projectData);
    else if (e.target.dataset.type === "game")
      fillProjectModal(e, gameData);
    else if (e.target.dataset.type === "challenge")
      fillProjectModal(e, challegeData);
  }
}

function fillProjectModal(e, data) {
  /**
  * Fills the modal with data for the selected project-button
  */
  const index = Number(e.target.attributes.value.value);
  
  // Ensures that the second section is shown
  modalLink.style.display = "inline";
  text2.style.display = "inline";
  img2.style.display = "inline";
  
  // If only redirect, then open new tab and close the modal
  if (data[index].redirect) {
    window.open(data[index].link);
    closeButton.click();
    return;
  }
  
  // Fills in the necessary data for the project
  modalTitle.innerHTML = data[index].title;
  modalSummary.innerHTML = data[index].summary;
  text1.innerHTML = data[index].description1;
  img1.src = data[index].img1;
  
  // If project does not have link, description2, or img2, their elements will be hidden
  if (data[index].link) {
    modalLink.href = data[index].link;
  } else {
    modalLink.style.display = "none";
  }
  if (data[index].description2) {
    text2.innerHTML = data[index].description2;
  } else {
    text2.style.display = "none";
  }
  if (data[index].img2) {
    img2.src = data[index].img2;
  } else {
    img2.style.display = "none";
  }
}

function hideProjectModal(e) {
  /**
  * Hides the modal if clicking off the modal or pressing the close button
  */
  const parent = e.target.parentNode;
  
  // Only run if the modal is visible
  if (
    !projectModal.classList.contains("hidden") &&
    !e.target.classList.contains("project-button") &&
    !parent.classList.contains("project-button")
  ) {
    // If clicking off modal, or on the close button, then hide the modal
    if (
      (e.target != projectModal &&
        parent != projectModal &&
        !parent.classList.contains("modal-section")) ||
      e.target == closeButton
    ) {
      projectModal.classList.remove("shown-modal");
      projectModal.classList.add("hidden");
      body.height = "inherit";
      body.style.overflowY = "visible";
    }
  }
}
