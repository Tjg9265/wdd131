document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind chill calculation
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
        35.75 * speed ** 0.16 +
        0.4275 * temp * speed ** 0.16;
      windChillEl.textContent = `${chill.toFixed(1)} °F`;
    } else {
      windChillEl.textContent = "N/A";
    }
  }
}