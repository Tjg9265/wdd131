const url = "../wdd131/data/temples.json";

fetch(url)
  .then(res => res.json())
  .then(data => {
    const groupedTemples = groupTemplesByName(data);
    outputTemples(groupedTemples);
  })
  .catch(error => console.error("Error fetching temples data:", error));

function groupTemplesByName(temples) {
  const grouped = {};

  temples.forEach(temple => {
    if (!grouped[temple.templeName]) {
      grouped[temple.templeName] = {
        templeName: temple.templeName,
        location: temple.location,
        dedicated: temple.dedicated || "N/A",
        area: temple.area || 0,
        images: []
      };
    }
    grouped[temple.templeName].images.push(temple.imageUrl);
  });

  // Convert grouped object to array
  return Object.values(grouped);
}

function outputTemples(temples) {
  const container = document.querySelector(".temple-grid");
  container.innerHTML = "";

  temples.forEach(temple => {
    const card = document.createElement("div");
    card.classList.add("temple-card");

    // Create image gallery HTML for all images
    const imagesHTML = temple.images.map(src => 
      `<img src="${src}" alt="Image of ${temple.templeName}" loading="lazy">`
    ).join("");

    card.innerHTML = `
      <div class="temple-info">
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area ? temple.area.toLocaleString() + ' sq ft' : 'N/A'}</p>
      </div>
      <div class="temple-images">
        ${imagesHTML}
      </div>
    `;

    container.appendChild(card);
  });
}
