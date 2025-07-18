function calculateWindChill(temp, speed) {
  return temp <= 50 && speed > 3
    ? `${Math.round(35.74 + 0.6215 * temp - 35.75 * speed ** 0.16 + 0.4275 * temp * speed ** 0.16)}°F`
    : "N/A";
}

const temp = parseFloat(document.getElementById("temp").textContent);
const speed = parseFloat(document.getElementById("speed").textContent);
const output = document.getElementById("windChillOutput");

if (temp <= 50 && speed > 3) {
  output.textContent = `Wind Chill: ${calculateWindChill(temp, speed)}`;
}
