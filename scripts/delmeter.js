let meter = window.delMeter;
const meterFG = document.getElementById("meterFG");
const meterLabel = document.getElementById("meterLabel");
const meterBG = document.getElementById("meterBG");
window.updateDelMeter = function (increment, explicit = false, display = false, time = 3000) {
  let startMeter = window.delMeter;
  let targetMeter = explicit ? increment : window.delMeter + increment;
  targetMeter = Math.max(0, Math.min(100, targetMeter)); 
  window.delMeter = targetMeter; 
  localStorage.setItem("delMeter", window.delMeter);
  if (display) {
    handleButtonClick("meterToggle")
    window.blockButtonClick = true;
    setTimeout(() => {
      window.blockButtonClick = false;
      handleButtonClick("meterToggle")
    }, (time + 600))
  }
  let startTime = performance.now();
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2; 
  }
  function animate(currentTime) {
    let elapsed = currentTime - startTime;
    let progress = Math.min(elapsed / time, 1); 
    let easedProgress = easeInOutCubic(progress);
    meter = startMeter + (targetMeter - startMeter) * easedProgress; 
    updateMeterDisplay(); 
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
};
function updateMeterDisplay() {
    meterFG.style.width = meter + "%";
    meterLabel.innerText = `Delusion Meter (${meter.toFixed(0)}%)`;
    const bgColor = getHSLColor(meter, 80, 95, 37, 10, 90, 44, 0.3);
    const fgColor = getHSLColor(meter, 80, 97, 48, 0, 90, 47, 1);
    const shadowColor = getHSLColor(meter, 80, 70, 40, 10, 70, 40, 1);
    meterBG.style.backgroundColor = bgColor;
    meterFG.style.backgroundColor = fgColor; 
    meterBG.style.boxShadow = `
      calc(var(--pixelScale) * -1 * var(--pxScaleMultiplier)) 0 0 ${shadowColor}, 
      calc(var(--pixelScale) * 1 * var(--pxScaleMultiplier)) 0 0 ${shadowColor}, 
      0 calc(var(--pixelScale) * -1 * var(--pxScaleMultiplier)) 0 ${shadowColor}, 
      0 calc(var(--pixelScale) * 1 * var(--pxScaleMultiplier)) 0 ${shadowColor} 
    `;
    updateMeterIndicator(fgColor, shadowColor);
}
function updateMeterIndicator(bgColor, fgColor) {
  const bgElements = document.querySelectorAll('.cls-b');
  const fgElements = document.querySelectorAll('.cls-f');
  bgElements.forEach(element => {
      element.style.fill = bgColor;
  });
  fgElements.forEach(element => {
      element.style.fill = fgColor;
  });
}
function getHSLColor(meter, h0, s0, l0, hf, sf, lf, a) {
  const hue = Math.round(h0 + (meter * (hf - h0)) / 100); 
  const saturation = Math.round(s0 + (meter * (sf - s0)) / 100); 
  const lightness = Math.round(l0 + (meter * (lf - l0)) / 100); 
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${a})`;
}
updateMeterDisplay();