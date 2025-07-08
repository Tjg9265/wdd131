const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();
const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;

