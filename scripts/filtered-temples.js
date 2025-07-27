const temples = [
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah",
    dedicated: "1893-04-06",
    area: 253015,
    imageUrl: "images/salt-lake-temple.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 40000,
    imageUrl: "images/rome-temple.jpg"
  },
  // Add 8 more temples (7 provided + 3 new ones you pick)
];

function outputTemples(temples) {
  const container = document.querySelector("#temples");
  container.innerHTML = ""; // clear

  temples.forEach((temple) => {
    const card = document.createElement("section");
    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p>Location: ${temple.location}</p>
      <p>Dedicated: ${temple.dedicated}</p>
      <p>Area: ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="Image of ${temple.templeName}" loading="lazy">
    `;
    container.appendChild(card);
  });
}

const url = "../wdd131/data/temples.json";

fetch(url)
  .then(res => res.json())
  .then(data => {
    displayTemples(data);
  });

function displayTemples(temples) {
  const container = document.querySelector(".temple-grid");
  container.innerHTML = "";

  temples.forEach((temple) => {
    const card = document.createElement("div");
    card.classList.add("temple-card");
    card.innerHTML = `
      <h3>${temple.name}</h3>
      <img src="${temple.imageUrl}" alt="${temple.altText}">
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicationDate}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    `;
    container.appendChild(card);
  });
}