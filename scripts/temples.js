// Hamburger menu
const menuButton = document.getElementById("menu"); // Make sure this ID matches your HTML
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
