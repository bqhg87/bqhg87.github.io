document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.pxDivWrapper'); // Select all elements with the class 'pxDivWrapper'

  wrappers.forEach((wrapper) => {
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
});