document.addEventListener("DOMContentLoaded", () => {
  // Set the current year
  document.querySelector("#year").textContent = new Date().getFullYear();

  // Set the last modified date and time
  const lastModified = new Date(document.lastModified);
  document.querySelector("#lastModified").textContent = lastModified.toLocaleString();

  // Toggle mobile menu
  const menuButton = document.getElementById("menu");
  const navigation = document.querySelector(".navigation");

  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
  });
});
