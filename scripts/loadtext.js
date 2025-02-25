window.currentPart = 1;

let finalPart = false; // Global variable to track if it's the final part (default is false)
window.finalPart = finalPart;
let isNpcSpeaking = false;
window.isNpcSpeaking = isNpcSpeaking;
let unlockCharNext;
let unlockText;
let unlockStory;
let topContextNext;
let taskCompleteNext;
let taskPushNext;
let indicatorsPushNext;
let meterPushNext;
let completeStoryNext;
let currentNPC;
let currentStory;
window.currentLearnMoreArticle = null;
window.learnMoreVisible = false;

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
        currentStory = story;
        currentNPC = npc;

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

        if (dialogues[0].taskCompleteId) {// closing the line completes the task
          taskCompleteNext = dialogues[0].taskCompleteId;
        } else {
          taskCompleteNext = null
        }

        if (dialogues[0].taskPushId) {// closing the line completes the task
          taskPushNext = dialogues[0].taskPushId;
        } else {
          taskPushNext = null
        }

        if (dialogues[0].updateIndicators) {// closing the line completes the task
          indicatorsPushNext = dialogues[0].updateIndicators;
        } else {
          indicatorsPushNext = null
        }

        if (dialogues[0].updateDelMeter) {// closing the line completes the task
          meterPushNext = dialogues[0].updateDelMeter;
        } else {
          meterPushNext = null
        }

        if (dialogues[0].completeStory) {// closing the line completes the task (ends)
          completeStoryNext = dialogues[0].completeStory;
        } else {
          completeStoryNext = null
        }

        if (dialogues[0].learnMore) {
          window.currentLearnMoreArticle = dialogues[0].learnMore;
          window.learnMoreVisible = true;
          updateFootButtonsVisibility();
        } else {
          window.learnMoreVisible = false;
          window.currentLearnMoreArticle = null;
          updateFootButtonsVisibility();
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

  //autoClose(2000);
  window.bypassMovementCheck = true;
  loadDialoguePart(story, gamemode, chapter, bla, currentPart);
  

  if (unlockCharNext) {
    addTask(`char_ul_${unlockCharNext.toLowerCase().replace(/\s+/g, '_')}`)
    broadcastTopContextMessage(`${unlockText} ${unlockCharNext}`, 4000, 'task');
    updateStories(unlockCharNext, unlockStory);
    unlockCharNext = null;
  }

  if (topContextNext) {
    //its a task!
    
    broadcastTopContextMessage(topContextNext, 4000, 'task');
    topContextNext = null;
  }

  if (taskCompleteNext) {
    // mark task as completed

    toggleTaskCompletion(taskCompleteNext, true);
    updateTaskList();
    taskCompleteNext = null;
  }

  if (taskPushNext) {
    addTask(taskPushNext);
    updateTaskList();
    taskPushNext = null;
  }

  if (indicatorsPushNext) {
    for (const [npc, indicator] of Object.entries(indicatorsPushNext)) {
      updateNPCIndicator(npc, indicator);
    }
    indicatorsPushNext = null;
  }

  if (meterPushNext) {
    updateDelMeter(meterPushNext, false, true)
    meterPushNext = null;
  }

  if (completeStoryNext) {
    const currentStories = JSON.parse(localStorage.getItem("currentStories")) || [];
    currentStories.forEach(character => {
      console.log(currentStory)
      console.log(character.story)
      if (character.story === currentStory) {
        updateStories(character.name, "complete");
        updateNPCIndicator(character.name, 4);
      }
    });
    console.log(currentStories)
  }

  currentPart++;
  window.currentPart = currentPart;
}
