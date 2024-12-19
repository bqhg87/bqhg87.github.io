document.addEventListener("DOMContentLoaded", () => {
  const buttonsContainer = document.getElementById('bottomIslandButtonsUI');
  let activeElement = null;  // Track the currently active element
  let isMousePressed = false; // Track if the mouse is pressed
  
  // Event delegation for hover and active effects
  buttonsContainer.addEventListener('mouseenter', (event) => {
    if (!isMousePressed && event.target.closest('.buttonWrapper')) {
      const wrapper = event.target.closest('.buttonWrapper');
      const shadowButton = wrapper.querySelector('.shadowButton');
      const button = wrapper.querySelector('button');
      shadowButton.classList.add('hover');
      button.classList.add('hover');
    }
  }, true);
  
  buttonsContainer.addEventListener('mouseleave', (event) => {
    if (!isMousePressed && event.target.closest('.buttonWrapper')) {
      const wrapper = event.target.closest('.buttonWrapper');
      const shadowButton = wrapper.querySelector('.shadowButton');
      const button = wrapper.querySelector('button');
      shadowButton.classList.remove('hover');
      button.classList.remove('hover');
    }
  }, true);
  
  buttonsContainer.addEventListener('mousedown', (event) => {
    if (event.target.closest('.buttonWrapper')) {
      isMousePressed = true;
      activeElement = event.target.closest('.buttonWrapper');
      const shadowButton = activeElement.querySelector('.shadowButton');
      const button = activeElement.querySelector('button');
      shadowButton.classList.remove('hover');
      button.classList.remove('hover');
      shadowButton.classList.add('active');
      button.classList.add('active');
    }
  });
  
  buttonsContainer.addEventListener('mouseup', (event) => {
    if (activeElement && isMousePressed) {
      isMousePressed = false;
      const shadowButton = activeElement.querySelector('.shadowButton');
      const button = activeElement.querySelector('button');
      shadowButton.classList.remove('active');
      button.classList.remove('active');
  
      // Check if the mouse is still over the element and re-add hover class
      if (activeElement.matches(':hover')) {
        shadowButton.classList.add('hover');
        button.classList.add('hover');
      }
      activeElement = null;
    }
  });
  
  // For mobile touch events
  buttonsContainer.addEventListener('touchstart', (event) => {
    if (event.target.closest('.buttonWrapper')) {
      isMousePressed = true;
      activeElement = event.target.closest('.buttonWrapper');
      const shadowButton = activeElement.querySelector('.shadowButton');
      const button = activeElement.querySelector('button');
      shadowButton.classList.remove('hover');
      button.classList.remove('hover');
      shadowButton.classList.add('active');
      button.classList.add('active');
    }
  });
  
  buttonsContainer.addEventListener('touchend', (event) => {
    if (activeElement) {
      isMousePressed = false;
      const shadowButton = activeElement.querySelector('.shadowButton');
      const button = activeElement.querySelector('button');
      shadowButton.classList.remove('active');
      button.classList.remove('active');
      activeElement = null;
    }
  });
});

function showButtons(buttonTexts, buttonFunctions) {
  const buttonsContainer = document.getElementById('bottomIslandButtonsUI');

  // Clear any existing buttons
  buttonsContainer.innerHTML = '';

  // Create new buttons based on the input arrays
  buttonTexts.forEach((text, index) => {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('buttonWrapper');

    const shadowButton = document.createElement('div');
    shadowButton.classList.add('shadowButton');

    const button = document.createElement('button');
    button.innerHTML = `<h3 class="buttonText">${text}</h3>`;
    button.addEventListener('click', buttonFunctions[index]);

    // Nest the button inside shadowButton
    shadowButton.appendChild(button);

    // Append shadowButton to the buttonWrapper
    buttonWrapper.appendChild(shadowButton);

    // Append buttonWrapper to the buttons container
    buttonsContainer.appendChild(buttonWrapper);
  });

  // Fade in the container
  buttonsContainer.style.opacity = '0';
  buttonsContainer.style.display = 'flex'; // Ensure it's visible before fading
  setTimeout(() => {
    buttonsContainer.style.transition = 'opacity 0.3s ease';
    buttonsContainer.style.opacity = '1';
  }, 10); // Timeout ensures the transition works properly
}

function closeButtons(fade = true) {
  const buttonsContainer = document.getElementById('bottomIslandButtonsUI');

  if (fade) {
    // Fade out the container
    buttonsContainer.style.transition = 'opacity 0.3s ease';
    buttonsContainer.style.opacity = '0';

    // Hide after transition ends
    buttonsContainer.addEventListener(
      'transitionend',
      () => {
        buttonsContainer.style.display = 'none';
      },
      { once: true }
    );
  } else {
    // Instantly hide the container
    buttonsContainer.style.transition = 'none';
    buttonsContainer.style.opacity = '0';
    buttonsContainer.style.display = 'none';
  }
}

window.showButtons = showButtons;
window.closeButtons = closeButtons;