document.addEventListener("DOMContentLoaded", () => {
  // --------- Hamburger menu toggle with aria-expanded ---------
  const menuButton = document.getElementById('menu');
  const navigation = document.querySelector('.navigation');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      navigation.classList.toggle('open');
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', (!expanded).toString());
      this.textContent = navigation.classList.contains('open') ? '✖' : '☰';
    });
  }

  // --------- Footer dates: current year and last modified ---------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = document.lastModified;
  }

  // --------- Wind chill calculation ---------
  const tempEl = document.getElementById("temp");
  const speedEl = document.getElementById("speed");
  const windChillEl = document.getElementById("windchill");
  if (tempEl && speedEl && windChillEl) {
    const temp = parseFloat(tempEl.textContent);
    const speed = parseFloat(speedEl.textContent);
    if (!isNaN(temp) && !isNaN(speed)) {
      if (temp <= 50 && speed > 3) {
        const chill =
          35.74 +
          0.6215 * temp -
          35.75 * Math.pow(speed, 0.16) +
          0.4275 * temp * Math.pow(speed, 0.16);
        windChillEl.textContent = `${chill.toFixed(1)} °F`;
      } else {
        windChillEl.textContent = "N/A";
      }
    }
  }

  // --------- Temple JSON fetch, grouping, displaying & filtering ---------
  const url = "../wdd131/data/temples.json";
  let allTemples = [];

  // Fetch temple data and initialize
  fetch("data/temples.json")
  .then(res => res.json())
  .then(data => {
    // your code to handle data here
  })
  .catch(error => console.error("Error fetching temples data:", error));
  // Group temples by name and aggregate images
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
    return Object.values(grouped);
  }

  // Display temple cards with image gallery
  function outputTemples(temples) {
    const container = document.querySelector(".temple-grid");
    if (!container) return;
    container.innerHTML = "";

    temples.forEach(temple => {
      const card = document.createElement("div");
      card.classList.add("temple-card");

      const imagesHTML = temple.images.map(src =>
        `<img src="${src}" alt="Image of ${temple.templeName}" loading="lazy" tabindex="0">`
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

  // Filter temples and update display
  function filterTemples(filter) {
    let filtered = allTemples;
    switch (filter) {
      case 'old':
        filtered = allTemples.filter(t => new Date(t.dedicated) < new Date('1950-01-01'));
        break;
      case 'new':
        filtered = allTemples.filter(t => new Date(t.dedicated) > new Date('2000-01-01'));
        break;
      case 'large':
        filtered = allTemples.filter(t => t.area > 90000);
        break;
      case 'small':
        filtered = allTemples.filter(t => t.area < 10000);
        break;
      case 'all':
      default:
        filtered = allTemples;
    }
    outputTemples(filtered);
  }

  // Attach event listeners to filter buttons by ID
  function setupFilterButtons() {
    const filters = ['all', 'old', 'new', 'large', 'small'];
    filters.forEach(filter => {
      const btn = document.getElementById(filter);
      if (btn) {
        btn.addEventListener('click', () => filterTemples(filter));
      }
    });
  }
});


