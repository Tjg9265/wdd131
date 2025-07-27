const url = "../wdd131/data/temples.json";

fetch(url)
  .then(res => res.json())
  .then(data => {
    outputTemples(data);
  });

function outputTemples(temples) {
  const container = document.querySelector(".temple-grid");
  container.innerHTML = "";

  temples.forEach((temple) => {
    const card = document.createElement("div");
    card.classList.add("temple-card");

    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <img src="${temple.imageUrl}" alt="Image of ${temple.templeName}" loading="lazy">
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    `;

    container.appendChild(card);
  });
}