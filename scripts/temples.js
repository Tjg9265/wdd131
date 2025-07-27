// Hamburger menu
const menuButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.textContent = navigation.classList.contains("open") ? "X" : "☰";
  });
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Footer last modified
const modifiedSpan = document.getElementById("lastModified");
if (modifiedSpan) {
  modifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
}

// ===========================
// Temple JSON logic
// ===========================
const templeContainer = document.querySelector("#temples");
let templeList = [];

// Fetch and store data
async function getTemples() {
  const response = await fetch("data/temples.json");
  templeList = await response.json();
  displayTemples(templeList);
}

function displayTemples(temples) {
  templeContainer.innerHTML = ""; // Clear existing

  temples.forEach((temple) => {
    const section = document.createElement("section");

    section.innerHTML = `
      <h3>${temple.templeName}</h3>
      <img src="${temple.imageUrl}" alt="Image of ${temple.templeName}" loading="lazy">
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    `;

    templeContainer.appendChild(section);
  });
}

// ===========================
// Filtering functions
// ===========================
function filterTemples(filter) {
  let filtered = [];

  switch (filter) {
    case "old":
      filtered = templeList.filter(t => parseInt(t.dedicated) < 1900);
      break;
    case "new":
      filtered = templeList.filter(t => parseInt(t.dedicated) > 2000);
      break;
    case "large":
      filtered = templeList.filter(t => t.area > 90000);
      break;
    case "small":
      filtered = templeList.filter(t => t.area < 10000);
      break;
    default:
      filtered = templeList;
  }

  displayTemples(filtered);
}

// Add event listeners to filter buttons
document.querySelector("#old")?.addEventListener("click", () => filterTemples("old"));
document.querySelector("#new")?.addEventListener("click", () => filterTemples("new"));
document.querySelector("#large")?.addEventListener("click", () => filterTemples("large"));
document.querySelector("#small")?.addEventListener("click", () => filterTemples("small"));
document.querySelector("#home")?.addEventListener("click", () => filterTemples("all"));

// Initial load
getTemples();

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu");
  const navigation = document.querySelector(".navigation");

  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
  });
});