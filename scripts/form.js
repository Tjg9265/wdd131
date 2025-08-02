document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("reviewForm");

  // Populate product select options dynamically
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;        // Use product id as value
    option.textContent = product.name; // Display product name
    select.appendChild(option);
  });
});

 form.addEventListener("submit"), (event) => {
    const checkboxes = form.querySelectorAll('input[name="features"]:checked');

     // Just logging the count (you can do more with this)
    console.log(`You selected ${checkboxes.length} features.`);
 }