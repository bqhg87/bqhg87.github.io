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
let currentChapter;
let chaptersPushNext;
let storiesPushNext;
let variablePushNext;
let pushTopContextDuration;
window.currentLearnMoreArticle = null;
window.learnMoreVisible = false;

let textPart;

function loadDialoguePart(story, gamemode, chapter, npc, part) {
  console.log(`${story}, ${gamemode}, ${chapter}, ${npc}, ${part}`)
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
        currentChapter = chapter;

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

        if (dialogues[0].topContextDuration) {
          pushTopContextDuration = dialogues[0].topContextDuration;
        } else {
          pushTopContextDuration = null;
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

        if (dialogues[0].updateChapters) {// closing the line completes the task (ends)
          chaptersPushNext = dialogues[0].updateChapters;
        } else {
          chaptersPushNext = null
        }

        if (dialogues[0].updateStories) {
          storiesPushNext = dialogues[0].updateStories
        } else {
          storiesPushNext = null
        }

        if (dialogues[0].updateInventory) {
          for (const [itemId, quantity] of Object.entries(dialogues[0].updateInventory)) {
            const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
              const itemToUpdate = inventory.find(item => item.item === itemId);
              if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
                localStorage.setItem("inventory", JSON.stringify(inventory));
                window.inventory = inventory;  
                updateInventory(window.inventory);
              }
          }
        }

        if (dialogues[0].variableUpdates) {
          variablePushNext = dialogues[0].variableUpdates
        } else {
          variablePushNext = null
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
    updateStory(unlockCharNext, unlockStory);
    unlockCharNext = null;
  }

  if (topContextNext) {
    let topContextTime = 4000
    //its a task!
    if (pushTopContextDuration) {
      topContextTime = pushTopContextDuration;
    }
    
    broadcastTopContextMessage(topContextNext, topContextTime, 'task');
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

    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    if (taskPushNext === "bh_library" ) {
      const lhcPaper = inventory.find(item => item.item === "lhcPaper");
      if (lhcPaper && lhcPaper.quantity === 0) {
        createItem({ x: 240, y: -60, spriteX: 0, spriteY: 1, visible: true });
      }
    }
    if (taskPushNext === "micro_beans") {
      const beans = inventory.find(item => item.item === "beans");
      if (beans && beans.quantity === 0) {
        beans.quantity = 1;
        localStorage.setItem("inventory", JSON.stringify(inventory));
        window.inventory = inventory;  
        updateInventory(window.inventory);
      }
    }



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
    completeStory(currentStory);

    if (currentStory === "blackHole") {
      const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
      const lhcPaper = inventory.find(item => item.item === "lhcPaper");

      console.log(lhcPaper)

      if (lhcPaper && lhcPaper.quantity > 0) {
        updateDelMeter(-10, false, true);
        lhcPaper.quantity = 0;
        localStorage.setItem("inventory", JSON.stringify(inventory));
        window.inventory = inventory;  
        updateInventory(window.inventory);
      }
    }

    if (currentStory === "microwaves") {
      updateDelMeter(-10, false, true);
    }

    completeStoryNext = null;
  }

  function completeStory(storyToComplete) {
    const currentStories = JSON.parse(localStorage.getItem("currentStories")) || [];
    currentStories.forEach(character => {
      console.log(currentStory)
      console.log(character.story)
      if (character.story === storyToComplete) {
        updateStory(character.name, "complete");
        updateChapter(character.name, 1);
        updateNPCIndicator(character.name, 4);
      }
    });
  }

  if (chaptersPushNext) {
    for (const [name, chapter] of Object.entries(chaptersPushNext)) {
      updateChapter(name, chapter);
    }
    chaptersPushNext = null;
  }

  if (storiesPushNext) {
    for (const [name, story] of Object.entries(storiesPushNext)) {
      updateStory(name, story);
    }
    storiesPushNext = null;
  }

  if (variablePushNext) {
    for (const [variableName, value] of Object.entries(variablePushNext)) {

      if (variableName === "qhTracker") {
        const qhTracker = JSON.parse(localStorage.getItem("qhTracker")) || [];
        const taskStates = JSON.parse(localStorage.getItem("taskStates")) || {};
        // Check if the value already exists
        if (!qhTracker.includes(value)) {
          qhTracker.push(value); // Append new value
          localStorage.setItem("qhTracker", JSON.stringify(qhTracker)); // Save updated array
        }

        if (qhTracker.length === 3 && taskStates.qh_explain === "visible") {
          toggleTaskCompletion('qh_explain', true);
          completeStory('quantumHealing');
          updateDelMeter(-10, false, true);
        }
        return;
      }



        window[variableName] = value;
    }


    variablePushNext = null;
}

  currentPart++;
  window.currentPart = currentPart;
}
