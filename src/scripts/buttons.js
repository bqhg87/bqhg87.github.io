document.addEventListener("DOMContentLoaded", () => {
  const buttonsContainer = document.getElementById('bottomIslandButtonsUI');
  let activeElement = null;  // Track the currently active element
  let isMousePressed = false; // Track if the mouse is pressed
  
  // Helper function to reset button states
  function resetButtonState(buttonWrapper) {
    const shadowButton = buttonWrapper.querySelector('.shadowButton');
    const button = buttonWrapper.querySelector('button');
    shadowButton.classList.remove('hover', 'active');
    button.classList.remove('hover', 'active');
  }

  // When mouse enters a button wrapper (including shadowButton and button)
  buttonsContainer.addEventListener('mouseenter', (event) => {
    const wrapper = event.target.closest('.buttonWrapper');
    if (wrapper && !isMousePressed) {
      const shadowButton = wrapper.querySelector('.shadowButton');
      const button = wrapper.querySelector('button');
      shadowButton.classList.add('hover');
      button.classList.add('hover');
    }
  }, true);
  
  // When mouse leaves a button wrapper (reset everything if leaving)
  buttonsContainer.addEventListener('mouseleave', (event) => {
    const wrapper = event.target.closest('.buttonWrapper');
    if (wrapper) {
      resetButtonState(wrapper); // Reset hover and active states when leaving
      isMousePressed = false; // Ensure mouse pressed state is reset when leaving
    }
  }, true);
  
  // When mouse is pressed on a button wrapper (including shadowButton and button)
  buttonsContainer.addEventListener('mousedown', (event) => {
    const wrapper = event.target.closest('.buttonWrapper');
    if (wrapper) {
      isMousePressed = true;
      activeElement = wrapper;
      resetButtonState(wrapper); // Reset hover on mousedown
      const shadowButton = wrapper.querySelector('.shadowButton');
      const button = wrapper.querySelector('button');
      shadowButton.classList.add('active');
      button.classList.add('active');
    }
  });
  
  // When mouse is released
  buttonsContainer.addEventListener('mouseup', (event) => {
    if (activeElement && isMousePressed) {
      isMousePressed = false;
      const shadowButton = activeElement.querySelector('.shadowButton');
      const button = activeElement.querySelector('button');
      shadowButton.classList.remove('active');
      button.classList.remove('active');

      // Trigger the button function on mouse up
      const buttonFunction = activeElement.querySelector('button').onclick;
      if (buttonFunction) {
        buttonFunction(); // Trigger the function
      }

      // Reapply hover if mouse is still over the element
      if (activeElement.matches(':hover')) {
        shadowButton.classList.add('hover');
        button.classList.add('hover');
      }

      activeElement = null; // Reset the active element
    }
  });

  // For mobile touch events
  buttonsContainer.addEventListener('touchstart', (event) => {
    const wrapper = event.target.closest('.buttonWrapper');
    if (wrapper) {
      isMousePressed = true;
      activeElement = wrapper;
      resetButtonState(wrapper); // Reset hover on touchstart
      const shadowButton = wrapper.querySelector('.shadowButton');
      const button = wrapper.querySelector('button');
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

function closeButtons(fade) {
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