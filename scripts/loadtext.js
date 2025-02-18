window.currentPart = 1;

let finalPart = false; // Global variable to track if it's the final part (default is false)
window.finalPart = finalPart;
let isNpcSpeaking = false;
window.isNpcSpeaking = isNpcSpeaking;
let unlockCharNext;
let unlockText;
let unlockStory;
let topContextNext;

let textPart;

function loadDialoguePart(story, gamemode, chapter, npc, part) {
  fetch('./scripts/dialogue.json')
    .then(response => response.json())
    .then(data => {
      // Filter dialogues based on the story, gamemode, chapter, and part
      const dialogues = data.dialogue.filter(d => 
        d.story === story && d.gamemode === gamemode && d.chapter === chapter  && d.npc === npc && d.part === part
      );
      
      // If we have matching dialogues, update the #dialogue element
      if (dialogues.length > 0) {
        // Animate the text letter by letter
        animateText(dialogues[0].text);

        textPart = dialogues[0].text;

        // Update the global finalPart variable based on the dialogue's finalPart
        finalPart = dialogues[0].finalPart;
        window.finalPart = finalPart;
        
        isNpcSpeaking = dialogues[0].isNpcSpeaking;
        window.isNpcSpeaking = isNpcSpeaking;

        if (dialogues[0].unlock) { // unlock a character
          unlockCharNext = dialogues[0].unlock;
          unlockText = dialogues[0].unlockText;
          unlockStory = dialogues[0].unlockStory;
        } else {
          unlockCharNext = null;
        }

        if (dialogues[0].topContext) {
          topContextNext = dialogues[0].topContext;
        } else {
          topContextNext = null
        }
      }

      const dialogueLoadedEvent = new Event('dialogueLoaded');
      window.dispatchEvent(dialogueLoadedEvent);
    })
    .catch(error => {
      console.error('Error loading dialogue:', error);
    });
};

let isTextAnimating = false;
let typingTimeout;

const typeLetterEvent = new Event('typeLetter');

function animateText(text) {
  const dialogueElement = document.getElementById('dialogue');
  dialogueElement.textContent = ""; // Clear existing text
  isTextAnimating = true;
  window.isTextAnimating = isTextAnimating;
  
  let i = 0;
  
  function typeNextLetter() {
    if (i < text.length) {
      dialogueElement.textContent += text[i];
      i++;
      window.dispatchEvent(typeLetterEvent);
      typingTimeout = setTimeout(typeNextLetter, 30); // Adjust speed here (milliseconds per letter)
    } else {
      isTextAnimating = false;
      window.isTextAnimating = isTextAnimating;
    }
  }
  
  typeNextLetter();
}

// Create the skipDialogue function
window.skipDialogue = function() {
  if (isTextAnimating) {
    clearTimeout(typingTimeout); // Stop the ongoing text animation
    const dialogueElement = document.getElementById('dialogue');

    dialogueElement.textContent = textPart;
    window.dispatchEvent(typeLetterEvent);
    isTextAnimating = false;
    window.isTextAnimating = isTextAnimating;
  }
}

window.bypassMovementCheck = false;

// Function to load the next part
window.loadDialogue = function(story, chapter, bla) {
  currentPart = window.currentPart;
  const gamemode = window.gamemode;

  autoClose(2000);
  window.bypassMovementCheck = true;
  loadDialoguePart(story, gamemode, chapter, bla, currentPart);
  

  if (unlockCharNext) {
    broadcastTopContextMessage(`${unlockText} ${unlockCharNext}`, 4000);
    updateStories(unlockCharNext, unlockStory);
    unlockCharNext = null;
  }

  if (topContextNext) {
    broadcastTopContextMessage(topContextNext, 4000);
    topContextNext = null;
  }

  currentPart++;
  window.currentPart = currentPart;
}
