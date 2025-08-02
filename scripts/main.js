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
  const temples = [
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah",
    dedicated: "1893-04-06",
    area: 253015,
    images: [
      "../wdd131/images/salt_lake_temple_1.webp",
      "../wdd131/images/salt_lake_temple_2.webp"
    ]
  },
  {
    templeName: "Los Angeles California Temple",
    location: "Los Angeles, California",
    dedicated: "1956-03-11",
    area: 89000,
    images: [
      "../wdd131/images/los_angeles_temple_1.webp",
      "../wdd131/images/los_angeles_temple_2.png"
    ]
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 58000,
    images: [
      "../wdd131/images/rome_italy_temple_1.webp",
      "../wdd131/images/rome_italy_temple_2.jpg"
    ]
  },
  {
    templeName: "Tokyo Japan Temple",
    location: "Tokyo, Japan",
    dedicated: "1980-10-27",
    area: 54000,
    images: [
      "../wdd131/images/tokyo_japan_temple_1.webp",
      "../wdd131/images/tokyo_japan_temple_2.jpg"
    ]
  },
  {
    templeName: "Mexico City Mexico Temple",
    location: "Mexico City, Mexico",
    dedicated: "1983-12-02",
    area: 70000,
    images: [
      "../wdd131/images/mexico_city_temple_1.webp",
      "../wdd131/images/mexico_city_temple_2.jpg"
    ]
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004-01-11",
    area: 35000,
    images: [
      "../wdd131/images/accra_ghana_temple_1.jpeg",
      "../wdd131/images/accra_ghana_temple_2.jpeg"
    ]
  },
  {
    templeName: "Mount Timpanogos Temple",
    location: "American Fork, Utah",
    dedicated: "1996-09-21",
    area: 95000,
    images: [
      "../wdd131/images/mount_timpanogos_temple_1.webp",
      "../wdd131/images/mount_timpanogos_temple_2.jpg"
    ]
  },
  {
    templeName: "Kansas City Temple",
    location: "Kansas City, Missouri",
    dedicated: "2012-08-30",
    area: 45000,
    images: [
      "../wdd131/images/kansas-city-1.jpg",
      "../wdd131/images/kansas-city-2.jpg",
      "../wdd131/images/kansas-city-3.jpg",
      "../wdd131/images/kansas-city-4.jpg",
      "../wdd131/images/kansas-city-5.jpg",
      "../wdd131/images/kansas-city-6.jpg",
      "../wdd131/images/kansas-city-7.jpg",
      "../wdd131/images/kansas-city-8.jpg",
      "../wdd131/images/kansas-city-9.jpg",
      "../wdd131/images/kansas-city-10.jpg"
    ]
  }
];

function displayTemples(temples) {
  const container = document.querySelector("#temples");

  temples.forEach(temple => {
    const card = document.createElement("section");

    const title = document.createElement("h2");
    title.textContent = temple.templeName;

    const location = document.createElement("p");
    location.textContent = `Location: ${temple.location}`;

    const dedication = document.createElement("p");
    dedication.textContent = `Dedicated: ${temple.dedicated}`;

    const area = document.createElement("p");
    area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;

    const imageGallery = document.createElement("div");
    imageGallery.classList.add("temple-gallery");

    temple.images.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = `${temple.templeName} photo`;
      img.loading = "lazy";
      img.onerror = () => {
        console.error("Image failed to load:", url);
      };
      imageGallery.appendChild(img);
    });

    card.appendChild(title);
    card.appendChild(location);
    card.appendChild(dedication);
    card.appendChild(area);
    card.appendChild(imageGallery);
    container.appendChild(card);
  });
}
// Call renderTemples on page load
renderTemples(temples);

document.addEventListener("DOMContentLoaded", () => {
  displayTemples(temples);
});

  // Fetch temple data and initialize
  fetch("data/temples.json")
  .then(res => res.json())
  .then(data => {
    // Group temples by name and images
    allTemples = groupTemplesByName(data);

    // Show all temples initially
    outputTemples(allTemples);

    // Setup filter buttons
    setupFilterButtons();
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

  function updateAriaPressed(clickedButton) {
    document.querySelectorAll('.filters button').forEach(btn => {
      btn.setAttribute('aria-pressed', btn === clickedButton ? 'true' : 'false');
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
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
});


