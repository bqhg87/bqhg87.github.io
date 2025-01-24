let meter = window.delMeter;

// Sinusoidal delMeter update function
 let time = 0; // Time variable for smooth sinusoidal movement
 function updateDelMeter() {
    meter = 50 + 50 * Math.sin(time); // Oscillates between -50 and 50, then shifted to 0-100
    time += 0.05; // Increment time for the next frame
    updateMeterDisplay();
    requestAnimationFrame(updateDelMeter);
}

// Function to update the meter display in the DOM
function updateMeterDisplay() {
    // Set the width of the foreground meter bar
    meterFG.style.width = meter + "%";
  
    // Update the label text with the current meter value
    meterLabel.innerText = `Delusion Meter (${meter.toFixed(0)}%)`;
  
    // Update the background and foreground colors based on the meter value
    const bgColor = getHSLColor(meter, 80, 95, 37, 10, 90, 44, 0.3);
    const fgColor = getHSLColor(meter, 80, 97, 48, 0, 90, 47, 1);
    const shadowColor = getHSLColor(meter, 80, 70, 40, 10, 70, 40, 1);
  
    meterBG.style.backgroundColor = bgColor;
    meterFG.style.backgroundColor = fgColor; // Update foreground color
    meterBG.style.boxShadow = `
      calc(var(--pixelScale) * -1 * var(--pxScaleMultiplier)) 0 0 ${shadowColor}, /* Left */
      calc(var(--pixelScale) * 1 * var(--pxScaleMultiplier)) 0 0 ${shadowColor}, /* Right */
      0 calc(var(--pixelScale) * -1 * var(--pxScaleMultiplier)) 0 ${shadowColor}, /* Top */
      0 calc(var(--pixelScale) * 1 * var(--pxScaleMultiplier)) 0 ${shadowColor} /* Bottom */
    `;
}

// Function to calculate the HSL color for the gradient based on the meter value
function getHSLColor(meter, h0, s0, l0, hf, sf, lf, a) {
  // Interpolate the HSL values based on meter (which is 0 to 100) and scale them accordingly
  const hue = Math.round(h0 + (meter * (hf - h0)) / 100); // Hue now scales between 0 and 360
  const saturation = Math.round(s0 + (meter * (sf - s0)) / 100); // Saturation scales between 0 and 255
  const lightness = Math.round(l0 + (meter * (lf - l0)) / 100); // Lightness scales between 0 and 255

  // Return the interpolated HSL value
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${a})`;
}

const meterFG = document.getElementById("meterFG");
const meterLabel = document.getElementById("meterLabel");
const meterBG = document.getElementById("meterBG");

updateMeterDisplay();
 updateDelMeter(); // Loop (for testing)