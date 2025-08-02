document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("productName");

  // Populate product select options dynamically
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;        // Use product id as value
    option.textContent = product.name; // Display product name
    select.appendChild(option);
  });
});