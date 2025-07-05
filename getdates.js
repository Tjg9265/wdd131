const yearSpan = document.getElementById("currentyear");
yearSpan.textcontent = new Date().getFullYear();
const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;
