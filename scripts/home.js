document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const menuButton = document.getElementById("menu");
  const nav = document.querySelector(".navigation");

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !expanded);
  });

  // Sample object + array
  const items = [
    { title: "Item 1", description: "First item" },
    { title: "Item 2", description: "Second item" }
  ];

  // Dynamic output using template literals
  const outputSection = document.getElementById("dynamic-content");
  if (outputSection) {
    outputSection.innerHTML = items.map(item => `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');
  }

  // Form handling with localStorage
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const message = form.message.value;
      localStorage.setItem("contact", JSON.stringify({ name, email, message }));
      alert("Message saved locally!");
      form.reset();
    });
  }

  // Conditional logic
  if (items.length > 0) {
    console.log("Items loaded successfully.");
  }
});
