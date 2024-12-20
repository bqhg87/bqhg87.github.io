function openTextInput() {
    const form = document.getElementById('textInput');
    form.style.visibility = 'visible'; // Ensure it's visible
    form.style.opacity = '1'; // Fade in
  }
  
function closeTextInput() {
const form = document.getElementById('textInput');
form.style.opacity = '0'; // Fade out
// Delay setting visibility to hidden until fade-out completes
setTimeout(() => {
    form.style.visibility = 'hidden';
}, 300); // Matches the transition duration
}

window.openTextInput = openTextInput;
window.closeTextInput = closeTextInput;


document.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
      event.preventDefault(); // Prevents zooming via trackpad or mouse
    }
  }, { passive: false });
  
  document.addEventListener('gesturestart', (event) => {
    event.preventDefault(); // Prevents gesture-based zoom (like on Safari)
  });