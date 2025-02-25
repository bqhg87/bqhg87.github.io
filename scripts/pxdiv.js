// Function to apply styles to .pxDivWrapper elements
window.applyPxDivStyling = function() {
  document.querySelectorAll('.pxDivWrapper:not(.styled)').forEach((wrapper) => {
      // Mark it as styled to avoid duplicate styling
      wrapper.classList.add('styled');

      // Add background div
      const bgDiv = document.createElement('div');
      bgDiv.className = 'pxDivBG';
      wrapper.appendChild(bgDiv);

      // Add corners
      ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((corner) => {
          const cornerDiv = document.createElement('div');
          cornerDiv.className = `corner ${corner}`;
          wrapper.appendChild(cornerDiv);
      });
  });
}

// Run on initial page load
document.addEventListener('DOMContentLoaded', applyPxDivStyling);