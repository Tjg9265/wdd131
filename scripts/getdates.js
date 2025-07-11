document.querySelector("#year").textContent = new Date().getFullYear();

const lastModified = new Date(document.lastModified);
document.querySelector("#lastModified").textContent =
  "Last Modified: " + lastModified.toLocaleString();
