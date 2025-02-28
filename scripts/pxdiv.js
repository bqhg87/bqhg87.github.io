window.applyPxDivStyling = function() {
  document.querySelectorAll('.pxDivWrapper:not(.styled)').forEach((wrapper) => {
      wrapper.classList.add('styled');
      const bgDiv = document.createElement('div');
      bgDiv.className = 'pxDivBG';
      wrapper.appendChild(bgDiv);
      ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((corner) => {
          const cornerDiv = document.createElement('div');
          cornerDiv.className = `corner ${corner}`;
          wrapper.appendChild(cornerDiv);
      });
  });
}
document.addEventListener('DOMContentLoaded', applyPxDivStyling);