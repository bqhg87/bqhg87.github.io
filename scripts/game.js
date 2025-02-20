window.console.info("Booting HarmOS...");

const canvas = document.getElementById('game');
const c = canvas.getContext('2d');
window.delMeter = 0;
window.gamemode = "inform"; // inform or mislead

// Use a single image for all character parts, and draw different sections.
const charSheet = new Image();
charSheet.src = './assets/char/base.png';
const npcIndicators = new Image();
npcIndicators.src = './assets/npcIndicators.png';
const groundImage = new Image();
groundImage.src = './assets/ground2.png';
const collisionMap = new Image();
collisionMap.src = './assets/collisionMap2.png';
const overlap = new Image();
overlap.src = './assets/overlap.png';
const pearTree = new Image();
pearTree.src = './assets/pearTree1.png';
const exampleHouse = new Image();
exampleHouse.src = './assets/buildings/hsst1a.png';
const mdar1 = new Image();
mdar1.src = './assets/buildings/mdar1.png';
const shadow = new Image();
shadow.src = './assets/char/shadow.png';
const blush = new Image();
blush.src = './assets/char/blush.png';
const eyes = new Image();
eyes.src = './assets/char/eyes.png';

const objectsToDraw = [
  {
    image: charSheet,
    x: 40,
    y: -94,
    frameX: 0,
    frameY: 0,
    frameWidth: 32,
    frameHeight: 32,
    feet: 5,
    zIndex: 2,
  },
  {
    image: groundImage,
    x: -1024,
    y: -1024,
    zIndex: -1000
  },
  {
    image: collisionMap,
    x: -1024,
    y: -1024,
    zIndex: -900
  },
  {
    image: exampleHouse,
    x: -206,
    y: -156,
    frameWidth: 38,
    frameHeight: 38,
    feet: 1,
    zIndex: 1
  },
  {
    image: mdar1,
    x: -43,
    y: 226,
    frameWidth: 85,
    frameHeight: 94,
    feet: 4,
    zIndex: 1
  },
  {
    image: overlap,
    x: -1024,
    y: -1024,
    zIndex: 9009
  },
  {
    image: pearTree,
    x: 339,
    y: -12,
    frameWidth: 24,
    frameHeight: 31,
    feet: 0,
    zIndex: 1
  }
];
const char = objectsToDraw[0]; // this is the character
const collisionMapOffset = objectsToDraw[2];

// Consolidated image loading
const images = [charSheet, npcIndicators, groundImage, collisionMap, exampleHouse, shadow, blush, eyes];
let imagesLoaded = 0;
const totalImages = images.length;

function onImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        adjustForRetina();
        draw();
    }
}

images.forEach(img => img.onload = onImageLoad);


///////////////////
// CHAR SETTINGS //
///////////////////

// Character appearance properties with defaults
let charAppearance = {
  skinTone: 0,
  eyes: 8, // (auto)
  blush: false,
  beard: false,
  glasses: false,
  hair: 'bob',
  hairType: 10,
  clothingTop: 'skull',
  topType: 3,
  clothingBottom: 'trousers',
  bottomType: 8,
  shadow: false,
};

// Load from cache or set defaults
const cachedAppearance = JSON.parse(localStorage.getItem('charAppearance'));
if (cachedAppearance) {
  charAppearance = cachedAppearance;
} else {
  localStorage.setItem('charAppearance', JSON.stringify(charAppearance));
}

// Function to update character appearance and save to cache
window.updateCharAppearance = function(newProperties) {
  Object.assign(charAppearance, newProperties); // Merge new properties
  localStorage.setItem('charAppearance', JSON.stringify(charAppearance));
  updateDisplayedCharSettings();
  draw(); // Redraw the character
}

// Function to randomise character appearance (except shadow)
window.randomiseCharAppearance = function() {
  const skinTones = 8; // Number of skin tones
  const hairTypes = 14; // Number of hair types (0-13)
  const topTypes = 10; // Number of top types (0-9)
  const bottomTypes = 10; // Number of bottom types (0-9)
  const hairs = Object.keys(hair);
  const topsNames = Object.keys(tops);
  const bottomsNames = Object.keys(bottoms);

  let newEyes;

  if (charAppearance.eyes === 8) {
    newEyes = 8 // stays auto if already auto
  } else {
    newEyes = Math.floor(Math.random() * 8); // random except won't set to auto
  }

  updateCharAppearance({
    skinTone: Math.floor(Math.random() * skinTones),
    eyes: newEyes, // (keep auto when randomising)
    blush: Math.random() < 0.5, // 50% chance of blush
    beard: Math.random() < 0.5, // 50% chance of beard
    glasses: Math.random() < 0.5, // 50% chance of glasses
    hair: hairs[Math.floor(Math.random() * hairs.length)],
    hairType: Math.floor(Math.random() * hairTypes),
    clothingTop: topsNames[Math.floor(Math.random() * topsNames.length)],
    topType: Math.floor(Math.random() * topTypes),
    clothingBottom: bottomsNames[Math.floor(Math.random() * bottomsNames.length)],
    bottomType: Math.floor(Math.random() * bottomTypes),
  });
}

window.tops = {
  floral: new Image(),
  basic: new Image(),
  skull: new Image(),
};
tops.floral.src = './assets/char/floral.png';
tops.basic.src = './assets/char/basic.png';
tops.skull.src = './assets/char/skull.png';

window.bottoms = {
  trousers: new Image(),
  skirt: new Image(),
};
bottoms.trousers.src = './assets/char/trousers.png';
bottoms.skirt.src = './assets/char/skirt.png';

window.hair = {
  bob: new Image(),
  braids: new Image(),
  buzzcut: new Image(),
};
hair.bob.src = './assets/char/bob.png';
hair.braids.src = './assets/char/braids.png';
hair.buzzcut.src = './assets/char/buzzcut.png';


//////////////////
// NPC SETTINGS //
//////////////////

const npcImages = {}; // Store NPC image data

// Function to create a new NPC
function createNPC(npcData) {
  let npc = {
    ...npcData, // Spread the provided data
    image: new Image(),
    frameWidth: 32,
    frameHeight: 32,
    feet: 5,
    zIndex: 1,
    frameX: npcData.frameX || 0,
    frameY: npcData.frameY || 0,
    indicator: { // NPC Indicator Data
      spriteX: 0,
      spriteY: 0,
      offsetX: npcData.indicatorOffsetX || 13.5, // Default offset if not provided
      offsetY: npcData.indicatorOffsetY || -1,
      animate: npcData.indicatorAnimate !== undefined ? npcData.indicatorAnimate : true, // Default to true if not specified
      sinDistance: npcData.indicatorSinDistance || 5,
      sinSpeed: npcData.indicatorSinSpeed || 4.4,
      sinOffset: npcData.indicatorSinOffset || 0,
      visible: npcData.indicatorVisible !== undefined ? npcData.indicatorVisible : true, // Set visibility property
    },
    appearance: { // NPC Appearance Data
      skinTone: npcData.skinTone || 0,
      eyes: npcData.eyes || 9,
      blush: npcData.blush || false,
      beard: npcData.beard || false,
      glasses: npcData.glasses || false,
      hair: npcData.hair || 'bob',
      hairType: npcData.hairType || 10,
      clothingTop: npcData.clothingTop || 'skull',
      topType: npcData.topType || 3,
      clothingBottom: npcData.clothingBottom || 'trousers',
      bottomType: npcData.bottomType || 8,
      shadow: npcData.shadow || true,
    },
  };

  npc.image.src = `./assets/char/base.png`; // All NPCs use the same base
  npc.tops = { ...tops }; // Clone tops
  npc.bottoms = { ...bottoms }; // Clone bottoms
  npc.hair = { ...hair }; // Clone hair

  npc.image.onload = onImageLoad; // Call onImageLoad when NPC image loads

  return npc;
}

window.npcs = [
  createNPC({
    name: 'Tibbert',
    x: 100,
    y: -10,
    hair: 'buzzcut',
    clothingTop: 'skull',
    clothingBottom: 'trousers',
    skinTone: 4,
    topType: 5,
    bottomType: 5,
    hairType: 5,
    indicatorSinSpeed: 6,
    indicatorSinOffset: 20,
  }),
  createNPC({
    name: 'Astronomer',
    x: -202.5,
    y: -130,
    hair: 'bob',
    clothingTop: 'basic',
    clothingBottom: 'skirt',
    skinTone: 1,
    topType: 4,
    bottomType: 2,
    hairType: 7,
    indicatorSinSpeed: 3,
    indicatorSinOffset: 80,
  }),
];


window.currentChapters = {
  "default": 1,
  "blackHole": 1,
};

window.currentStories = [ // Default
  {
    name: 'Tibbert',
    story: 'blackHole',
  },
  {
    name: 'Astronomer',
    story: 'default',
  }
];

// Load from cache or set defaults
const cachedStories = JSON.parse(localStorage.getItem('currentStories'));
if (cachedStories && !(1 === 1)) { // bypassing so it resets every time
  currentStories = cachedStories;
} else {
  localStorage.setItem('currentStories', JSON.stringify(currentStories));
}

// Function to update a story
window.updateStories = function(name, newStory) {
  const storyToUpdate = currentStories.find(story => story.name === name);
  if (storyToUpdate) {
    storyToUpdate.story = newStory;
    localStorage.setItem('currentStories', JSON.stringify(currentStories));
  }
}

///////////////
// RENDERING //
///////////////

window.addEventListener('resize', adjustForRetina);
let canvasWidth, canvasHeight;

function updateCanvasDimensions() {
  canvasWidth = canvas.width / dpr;
  canvasHeight = canvas.height / dpr;
}

function drawCharacterWithClothing() {
  const { x, y, frameWidth, frameHeight, scale = 1 } = char;

  const scaledX = (x * scale * globalScale) + translationX;
  const scaledY = (y * scale * globalScale) + translationY;
  const scaledWidth = frameWidth * scale * globalScale;
  const scaledHeight = frameHeight * scale * globalScale;

  const skinToneOffsetX = charAppearance.skinTone * 8;
  const topOffsetX = charAppearance.topType * 8;
  const bottomOffsetX = charAppearance.bottomType * 8;
  const hairOffsetX = charAppearance.hairType * 8;
  const eyesOffsetX = charAppearance.eyes * 8;

  // Draw character shadow
  if (charAppearance.shadow) {
    c.drawImage(shadow, 0, 0, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  // Draw base character
  c.drawImage(charSheet, (char.frameX + skinToneOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  c.drawImage(eyes, (char.frameX + eyesOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  if (charAppearance.blush) {
    c.drawImage(blush, (char.frameX + skinToneOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  let selectedTop = tops[charAppearance.clothingTop];
  if (selectedTop) {
    c.drawImage(selectedTop, (char.frameX + topOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  let selectedBottom = bottoms[charAppearance.clothingBottom];
  if (selectedBottom) {
    c.drawImage(selectedBottom, (char.frameX + bottomOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  let selectedHair = hair[charAppearance.hair];
  if (selectedHair) {
    c.drawImage(selectedHair, (char.frameX + hairOffsetX) * frameWidth, char.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }
}

function drawNPC(npc) {
  const { x, y, frameWidth, frameHeight, scale = 1 } = npc;

  const scaledX = (x * scale * globalScale) + translationX;
  const scaledY = (y * scale * globalScale) + translationY;
  const scaledWidth = frameWidth * scale * globalScale;
  const scaledHeight = frameHeight * scale * globalScale;

  const skinToneOffsetX = npc.appearance.skinTone * 8;
  const topOffsetX = npc.appearance.topType * 8;
  const bottomOffsetX = npc.appearance.bottomType * 8;
  const hairOffsetX = npc.appearance.hairType * 8;
  const eyesOffsetX = npc.appearance.eyes * 8;

  // Draw character shadow
  if (npc.appearance.shadow) {
    c.drawImage(shadow, 0, 0, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  // Draw base character - Use npc.frameX and npc.frameY
  c.drawImage(npc.image, (npc.frameX + skinToneOffsetX) * frameWidth, npc.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  c.drawImage(eyes, (npc.frameX + eyesOffsetX) * frameWidth, npc.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  
  if (npc.appearance.blush) {
    c.drawImage(blush, (npc.frameX + skinToneOffsetX) * frameWidth, npc.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  let selectedTop = npc.tops[npc.appearance.clothingTop];
  if (selectedTop) {
    c.drawImage(selectedTop, (npc.frameX + topOffsetX) * frameWidth, npc.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  let selectedBottom = npc.bottoms[npc.appearance.clothingBottom];
  if (selectedBottom) {
    c.drawImage(selectedBottom, (npc.frameX + bottomOffsetX) * frameWidth, npc.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }

  let selectedHair = npc.hair[npc.appearance.hair];
  if (selectedHair) {
    c.drawImage(selectedHair, (npc.frameX + hairOffsetX) * frameWidth, npc.frameY * frameHeight, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }
}

// Draw all objects
function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  centerCamera();
  updateFootButtonsVisibility();

  const sortedObjects = [...objectsToDraw, ...npcs].sort((a, b) => {
    const charFeet = char.y + char.frameHeight - char.feet;
    const aFeet = (a.y || 0) + (a.frameHeight || 0) - (a.feet || 0);
    const bFeet = (b.y || 0) + (b.frameHeight || 0) - (b.feet || 0);

    if (charFeet < aFeet) {
      return 1;
    }
    if (charFeet < bFeet) {
      return -1;
    }
    return (a.zIndex || 0) - (b.zIndex || 0);
  });

  sortedObjects.forEach(obj => {
    if (obj === char) {
      drawCharacterWithClothing();
      return
    } if (obj.name) { // If it's an NPC, draw it with clothing/hair
      drawNPC(obj);
      return
    } else if (obj.image === collisionMap) {
      return
    } else if (obj.image) {
      const { image, x, y, opacity = 1, scale = 1 } = obj;
      const scaledX = (x * scale * globalScale) + translationX;
      const scaledY = (y * scale * globalScale) + translationY;

      c.globalAlpha = opacity;
      
      const scaledImgWidth = image.width * scale * globalScale;
      const scaledImgHeight = image.height * scale * globalScale;
      c.drawImage(image, scaledX, scaledY, scaledImgWidth, scaledImgHeight);

      c.globalAlpha = 1;
    }
  });

  // Draw NPC indicators
  npcs.forEach(npc => {
    const indicatorData = npc.indicator;

    if (indicatorData.visible) {
      const baseIndicatorX = ((npc.x + indicatorData.offsetX) * globalScale) + translationX;
      let baseIndicatorY = ((npc.y + indicatorData.offsetY) * globalScale) + translationY;

      if (indicatorData.animate) {
        const time = Date.now() / 1000;
        baseIndicatorY += indicatorData.sinDistance * Math.sin(time * indicatorData.sinSpeed + indicatorData.sinOffset);
      }

      const spriteX = indicatorData.spriteX * 4;
      const spriteY = indicatorData.spriteY * 4;

      c.drawImage(npcIndicators, spriteX, spriteY, 4, 4, baseIndicatorX, baseIndicatorY, 4 * globalScale, 4 * globalScale);
    }
  });
}

////////////
// CAMERA //
////////////

let lowCamera = false;

let centerOnLoad = false; // Initially not centered (Variable to track it only centers on load)
let globalScale = 4; // Set this scale globally, it will affect size and positioning
const dpr = window.devicePixelRatio || 1;

let translationX = 0;
let translationY = 0;

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
let zoomStartTime = null;
let zoomStartScale = globalScale;
let zoomTargetScale = globalScale;
let zoomDuration = 500; // Duration for zoom animation in milliseconds
let zoomProgress = 0; // Progress of zoom (0 to 1)

let zoomingInProgress = false; // Flag to check if zooming is currently in progress

function animateZoom() {
  const currentTime = Date.now();
  
  // If no start time, initialize it
  if (!zoomStartTime) zoomStartTime = currentTime;

  const elapsedTime = currentTime - zoomStartTime;
  const progress = Math.min(elapsedTime / zoomDuration, 1); // Progress ranges from 0 to 1

  // Apply easing function to smooth the transition
  const easedProgress = easeInOut(progress);

  // Update the global scale based on the easing progress
  globalScale = zoomStartScale + (zoomTargetScale - zoomStartScale) * easedProgress;
  lerpLowCamera = lowCameraOffsetHistory + (lowCameraOffset - lowCameraOffsetHistory) * easedProgress;

  draw(); // Redraw the canvas with the updated scale

  // If the zoom animation is not complete, request the next frame
  if (progress < 1) {
    requestAnimationFrame(animateZoom);
  } else {
    zoomingInProgress = false; // Animation is complete
    zoomStartTime = null; // Reset start time for the next animation
    lowCameraOffsetHistory = lowCameraOffset;
  }
}

let blockMotion;
let blockDirectionUpdate = false;
let blockSpaceDialogueToggle = false;
window.charMenuOpen = false;

const charSettingsWrapper = document.getElementById('charSettingsWrapper');
const randomiseCharButton = document.getElementById('randomiseCharToggle');
const hairPairToggles = document.getElementById('charPairArrowsHair');
const topsPairToggles = document.getElementById('charPairArrowsTops');
const bottomsPairToggles = document.getElementById('charPairArrowsBottoms');
const charMenuButtonPairs = document.getElementsByClassName('charSelectorArrowsPairWrapper')

window.updateArrowPairVisibility = function(override) {
  if (override === false) {
    hairPairToggles.classList.remove('show'); // hide them all
    topsPairToggles.classList.remove('show'); // hide them all
    bottomsPairToggles.classList.remove('show'); // hide them all
    return
  }
  if (override || charMenuOpen) {
    if (currentCharMenuTitle === 'Body Settings') {
      hairPairToggles.classList.add('show');
      topsPairToggles.classList.remove('show');
      bottomsPairToggles.classList.remove('show');
    } else {
      hairPairToggles.classList.remove('show');
    }
    if (currentCharMenuTitle === 'Wardrobe') {
      topsPairToggles.classList.add('show');
      bottomsPairToggles.classList.add('show');
      hairPairToggles.classList.remove('show');
    } else {
      topsPairToggles.classList.remove('show');
      bottomsPairToggles.classList.remove('show');
    }
  }
}

const dialogueContextWrapper = document.getElementById('dialogueContextWrapper');

window.addEventListener('openCharMenu', () => {
  Array.from(charMenuButtonPairs).forEach(pair => {pair.style.transition = 'opacity 0.5s ease';});
  charSettingsWrapper.classList.add('show');
  randomiseCharButton.classList.add('show');
  updateArrowPairVisibility(true);
  lowCamera = false;
  blockSpaceDialogueToggle = true;
  updateLowCamera();
  char.frameY = updateCharDirection(Math.PI / 2);
  if (zoomingInProgress && zoomTargetScale === 4) {
    // If zooming is in progress and we're zooming out, reverse the zoom direction
    zoomStartScale = globalScale;
    zoomTargetScale = 6; // Zoom in
    zoomStartTime = null; // Reset start time to handle the smooth reverse
    setTimeout(() => {
      blockMotion = true;
      blockDirectionUpdate = true;
      bottomLabelWrapper.classList.remove('show');
      dialogueToggle.classList.remove('show');
      dialogueContextWrapper.classList.add('hidden');
    }, (zoomDuration))
  } else if (!zoomingInProgress) {
    // If no zooming is in progress, start the zoom-in transition
    zoomStartScale = globalScale;
    zoomTargetScale = 6; // Zoom in
    zoomingInProgress = true; // Set zooming in progress
    animateZoom();
    setTimeout(() => {
      blockMotion = true;
      blockDirectionUpdate = true;
      bottomLabelWrapper.classList.remove('show');
      dialogueToggle.classList.remove('show');
      dialogueContextWrapper.classList.add('hidden');
    }, (0)) // Will be better once i code the character movement better with decelertation
  }
  setTimeout(() => {
    window.charMenuOpen = true;
    Array.from(charMenuButtonPairs).forEach(pair => {pair.style.transition = '';}); // Remove the transition
  }, (zoomDuration))
});

window.addEventListener('closeCharMenu', () => {
  Array.from(charMenuButtonPairs).forEach(pair => {pair.style.transition = 'opacity 0.5s ease';});
  charSettingsWrapper.classList.remove('show');
  randomiseCharButton.classList.remove('show');
  updateArrowPairVisibility(false);
  refreshCheckNPC();
  checkNPCs();
  blockMotion = false;
  blockSpaceDialogueToggle = false;
  window.charMenuOpen = false;

  if (zoomingInProgress && zoomTargetScale === 6) {
    // If zooming is in progress and we're zooming in, reverse the zoom direction
    zoomStartScale = globalScale;
    zoomTargetScale = 4; // Zoom out
    zoomStartTime = null; // Reset start time to handle the smooth reverse
    setTimeout(() => {
      blockMotion = false;
      blockDirectionUpdate = false;
    }, (0)) 
  } else if (!zoomingInProgress) {
    // If no zooming is in progress, start the zoom-out transition
    zoomStartScale = globalScale;
    zoomTargetScale = 4; // Zoom out
    zoomingInProgress = true; // Set zooming in progress
    animateZoom();
    setTimeout(() => {
      blockMotion = false;
      blockDirectionUpdate = false;
    }, (zoomDuration))
  }
});

// Adjust canvas for Retina scaling and fit the viewport
function adjustForRetina() {

  // Set canvas size to match the window's inner width and height
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  // Set CSS size to match the canvas size (so it scales appropriately)
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  // Scale the drawing context to match the device pixel ratio
  c.scale(dpr, dpr);

  if (!centerOnLoad) {
    centerCamera();
    centerOnLoad = true;
  }

  // Disable image smoothing for sharp rendering
  c.imageSmoothingEnabled = false;

  draw();  // Redraw images after resizing
}

let lerpLowCamera = 0;
let lowCameraOffset = 0;
let lowCameraOffsetHistory = 0;

function centerCamera() {
    // Ensure the character is always centered by adjusting translation
    const charWidth = (char.frameWidth) * globalScale;
    const charHeight = (char.frameHeight) * globalScale;
  
    // Calculate the center of the canvas in world coordinates
    const canvasCenterX = canvas.width / 2 / dpr;
    const canvasCenterY = canvas.height / 2 / dpr;
  
    translationX = canvasCenterX - (round(char.x, 8) * globalScale + charWidth / 2) + 4;
    if (!zoomingInProgress) {
      lerpLowCamera = lowCameraOffset
    }
    translationY = canvasCenterY - (round(char.y, 8) * globalScale + charHeight / 2 - lerpLowCamera);
}

function updateLowCamera() {
  const dialogueHeight = dialogueWrapper.offsetHeight; // Get the height of the dialogue element
  const windowHeight = window.innerHeight;

  const lowAngleAdjust = window.lowAngleAdjust;
  const wholeHeight = 100.5 - lowAngleAdjust * 4 * 2.5;

  if (!lowCamera) {
    lowCameraOffset = 0;
  } else if ((dialogueHeight + wholeHeight) >= (windowHeight * 0.3)) {
    lowCameraOffset = (dialogueHeight + wholeHeight - 38) / 2;
  } else {
    lowCameraOffset = (wholeHeight + 56) / 2;
  }

  window.lowCameraOffset = lowCameraOffset;
  centerCamera();
}

window.addEventListener('resize', updateLowCamera);
window.addEventListener('typeLetter', updateLowCamera);
window.addEventListener('dialogueLoaded', updateLowCamera);


//////////
// NPCS //
//////////

let toggleNPCs = {}; // Store states for multiple NPCs
const npcUpdateEvent = new Event('npcUpdate');
let dialogueToggled = false;
window.dialogueToggled = dialogueToggled;

const bottomLabel = document.getElementById('bottomLabel');
const bottomLabelWrapper = document.getElementById('bottomLabelWrapper');
const dialogueToggle = document.getElementById('dialogueToggle');

function checkNPC(npc, char, distance) {
  const distanceToNPC = proximityQuery(char, npc);
  const isNear = distanceToNPC <= distance;
  const wasNear = toggleNPCs[npc.name];

  if (isNear && !wasNear) {
    toggleNPCs[npc.name] = true;
    npc.indicator.spriteY = 1;  // Change spriteY when near
    bottomLabel.textContent = `Talk to ${npc.name}`;
    bottomLabelWrapper.classList.add('show');
    dialogueToggle.classList.add('show');
    dialogueContextWrapper.classList.remove('hidden');
    npcMemory = npc.name;
  } else if (!isNear && wasNear) {
    toggleNPCs[npc.name] = false;
    npc.indicator.spriteY = 0;  // Revert spriteY when far
    npc.frameY = updateCharDirection(Math.PI / 2);
    bottomLabelWrapper.classList.remove('show');
    dialogueToggle.classList.remove('show');
    dialogueContextWrapper.classList.add('hidden');
  }

  if (isNear !== wasNear) {
    window.dispatchEvent(npcUpdateEvent);
    updateFootButtonsVisibility();
  }
}

function refreshCheckNPC() {
  if (!npcMemory) {return}
  toggleNPCs[npcMemory] = false;
}

window.checkNPCs = function() {
  npcs.forEach((npc) => checkNPC(npc, char, 20));
}

let spaceHeld = false; // Flag to track whether Space is held

function spaceDialogueToggle(event) {
  if (event.code !== "Space" || spaceHeld || blockSpaceDialogueToggle) return; // Prevent repeated triggers

  spaceHeld = true; // Set flag to prevent retriggering

  if (window.isTextAnimating) {
    skipDialogue();
    return;
  }

  loadStory();

  handleStartEndDialogue();
}

// Reset the flag when the key is released
function resetSpaceHeld(event) {
  if (event.code === "Space") {
    spaceHeld = false;
  }
}

window.addEventListener("keydown", spaceDialogueToggle);
window.addEventListener("keyup", resetSpaceHeld); // Listen for key release

window.toggleDialogueOpen = function () {
  loadStory();
  handleStartEndDialogue();
}

function getStoryForNPC(name) {
  const npc = window.currentStories.find(npc => npc.name === name);
  return npc ? npc.story : null;  // Return the story or null if not found
}

function loadStory() {
  const npc = npcs.find(npc => npc.name === npcMemory);
  loadDialogue(getStoryForNPC(npc.name), currentChapters[getStoryForNPC(npc.name)], npc.name); // LOAD STORY
}

function clickDialogueToggle() {
  if (!dialogueToggled) {return}
  if (window.isTextAnimating) {
    skipDialogue();
    return
  };

  loadStory();

  for (let npcName in toggleNPCs) {
    if (toggleNPCs[npcName]) {
      if (window.finalPart === true) {
        window.finalPart = false;
        window.currentPart = 1;
        endDialogue(npcName);
      }
      break;
    }
  }
}
canvas.addEventListener("mousedown", clickDialogueToggle);
canvas.addEventListener("touchstart", clickDialogueToggle);

window.handleStartEndDialogue = function() {
  for (let npcName in toggleNPCs) {
    if (toggleNPCs[npcName]) {
      if (window.finalPart === false) {
        startDialogue(npcName);
      } else {
        window.finalPart = false;
        window.currentPart = 1;
        endDialogue(npcName);
      }
      break;
    }
  }
}

let npcMemory = false;

function startDialogue(npcName) {
  const npc = npcs.find(npc => npc.name === npcName);
  npcMemory = npc.name;
  const dialogueWrapper = document.getElementById('dialogueWrapper');
  bottomLabelWrapper.classList.remove('show');
  dialogueToggle.classList.remove('show');
  dialogueContextWrapper.classList.add('hidden');
  dialogueWrapper.classList.add('show');
  npc.indicator.spriteX = -1;
  char.frameY = updateCharDirection((-directionQuery(npc, char)) * Math.PI / 180);
  //loadDialogue("concept", 1, npcName);
  lowCameraOffsetHistory = lowCameraOffset;
  const direction = snapToValidDirection(directionQuery(char, npc));
  window.npcRelativeDirection = direction;
  teleportToNPC(npc, direction);
  blockDirectionUpdate = true;
  handleZoom(5);
  dialogueEnding = false;
  window.dialogueEnding = dialogueEnding;
  dialogueToggled = true;
  window.dialogueToggled = dialogueToggled;
  if (lowCamera === false) {
    lowCamera = true;
  }
}

let dialogueEnding = false;
window.dialogueEnding = dialogueEnding;

function endDialogue(npcName) {
  window.currentPart = 1;
  const npc = npcs.find(npc => npc.name === npcName);
  const dialogueWrapper = document.getElementById('dialogueWrapper');
  bottomLabelWrapper.classList.add('show');
  dialogueToggle.classList.add('show');
  dialogueContextWrapper.classList.remove('hidden');
  dialogueWrapper.classList.remove('show');
  npc.indicator.spriteX = 2;
  blockDirectionUpdate = false;
  lowCameraOffsetHistory = lowCameraOffset;
  handleZoom(4);
  lowCamera = false;
  dialogueEnding = true;
  window.dialogueEnding = dialogueEnding;
  dialogueToggled = false;
  window.dialogueToggled = dialogueToggled;
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape' && dialogueToggled) {
    breakDialogue(true);
  } 
})

window.breakDialogue = function(zoomOut) {
  window.currentPart = 1;
  console.log(npcMemory)
  const npc = npcs.find(npc => npc.name === npcMemory);
  npc.indicator.spriteX = 2;
  const dialogueWrapper = document.getElementById('dialogueWrapper');
  bottomLabelWrapper.classList.add('show');
  dialogueToggle.classList.add('show');
  dialogueContextWrapper.classList.remove('hidden');
  dialogueWrapper.classList.remove('show');
  lowCamera = false;
  blockDirectionUpdate = false;
  lowCameraOffsetHistory = lowCameraOffset;
  if(zoomOut) {handleZoom(4);}
  dialogueEnding = true;
  window.dialogueEnding = dialogueEnding;
  dialogueToggled = false;
  window.dialogueToggled = dialogueToggled;
}

function handleZoom(targetScale) {
  if (zoomingInProgress) {
    zoomTargetScale = targetScale;
    zoomStartScale = globalScale;
    zoomStartTime = null;
  } else {
    zoomStartScale = globalScale;
    zoomTargetScale = targetScale;
    zoomingInProgress = true;
    animateZoom();
  }

  setTimeout(() => blockMotion = (targetScale === 5), zoomDuration);
}

function teleportToNPC(npc, direction) {
  const teleportDistance = 3.5;
  const angleRad = direction * (Math.PI / 180);
  char.x = (npc.x + npc.frameWidth / 2) + Math.cos(angleRad) * teleportDistance * 5 - char.frameWidth / 2;
  char.y = (npc.y + npc.frameHeight / 2) - Math.sin(angleRad) * teleportDistance * 5 - char.frameHeight / 2;
  draw();
}

function snapToValidDirection(direction) {
  const validRanges = [
    { min: 150, max: 180 },
    { min: -180, max: -150 },
    { min: -30, max: 30 }
  ];

  // Check if direction is already in a valid range
  for (const range of validRanges) {
    if (direction >= range.min && direction <= range.max) {
      return direction; // Keep it as is
    }
  }

  // If not in a valid range, snap to the closest boundary
  let closestAngle = direction;
  let minDiff = Infinity;

  for (const range of validRanges) {
    for (const boundary of [range.min, range.max]) {
      const diff = Math.abs(direction - boundary);
      if (diff < minDiff) {
        minDiff = diff;
        closestAngle = boundary;
      }
    }
  }
  
  return closestAngle;
}

function proximityQuery(object1, object2) {
  const dx = object2.x + object2.frameWidth / 2 - (object1.x + object1.frameWidth / 2);
  const dy = object2.y + object2.frameHeight / 2 - (object1.y + object1.frameHeight / 2);
  return Math.sqrt(dx * dx + dy * dy);
}

function directionQuery(object1, object2) {
  const dx = object2.x + object2.frameWidth / 2 - (object1.x + object1.frameWidth / 2);
  const dy = object2.y + object2.frameHeight / 2 - (object1.y + object1.frameHeight / 2);
  return Math.atan2(dy, -dx) * (180 / Math.PI); // Convert to degrees
}



////////////////
// COLLISIONS //
////////////////

const collisionMapCanvas = document.createElement('canvas');
const c2 = collisionMapCanvas.getContext('2d');
let collisionMapData; // Store collision map data

// Initialize collision map data (do this ONCE when the image loads)
collisionMap.onload = () => {
    collisionMapCanvas.width = collisionMap.width;
    collisionMapCanvas.height = collisionMap.height;
    c2.drawImage(collisionMap, 0, 0);
    collisionMapData = c2.getImageData(0, 0, collisionMap.width, collisionMap.height).data;
};

function checkCollisions() {
    if (!collisionMapData) return { top: false, bottom: false, left: false, right: false }; // Return if data not loaded yet

    const charMapX = Math.floor((char.x + 16) - collisionMapOffset.x);
    const charMapY = Math.floor((char.y + 26) - collisionMapOffset.y);

    const requiredConsistency = 0.5;

    const collidingSides = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    };

    const checkSide = (side, startX, startY, endX, endY) => {
        let collisionCount = 0;
        let totalChecks = 0;

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                if (x >= 0 && x < collisionMap.width && y >= 0 && y < collisionMap.height) {
                    const pixelIndex = (y * collisionMap.width + x) * 4;
                    const a = collisionMapData[pixelIndex + 3];

                    if (a > 0) {
                        collisionCount++;
                    }
                    totalChecks++;
                }
            }
        }
        return totalChecks > 0 && collisionCount / totalChecks >= requiredConsistency;
    };


    collidingSides.top = checkSide("top", charMapX - 4, charMapY - 2, charMapX + 4, charMapY);
    collidingSides.bottom = checkSide("bottom", charMapX - 4, charMapY, charMapX + 4, charMapY + 2);
    collidingSides.left = checkSide("left", charMapX - 4, charMapY - 2, charMapX, charMapY + 2);
    collidingSides.right = checkSide("right", charMapX, charMapY - 2, charMapX + 4, charMapY + 2);

    return collidingSides;
}


//////////////
// MOVEMENT //
//////////////

let mouseRadius = 0;
let mouseAngle = 0;

let stoppedMoving = true;

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

let keysPressed = [];

document.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd' || event.key === 'W' || event.key === 'A' || event.key === 'S' || event.key === 'D' || event.shiftKey && event.key === 'W' || event.shiftKey && event.key === 'A' || event.shiftKey && event.key === 'S' || event.shiftKey && event.key === 'D' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    if (!keysPressed.includes(event.key)) {
      keysPressed.push(event.key);
    }
  }
  if (event.getModifierState('CapsLock') || event.shiftKey) {
    keysPressed = keysPressed.filter(word => !['w', 'a', 's', 'd'].includes(word));
  } else if (!event.shiftKey) {
    keysPressed = keysPressed.filter(word => !['W', 'A', 'S', 'D'].includes(word));
  }
})
document.addEventListener('keyup', (event) => {
  keysPressed = keysPressed.filter(word => word !== event.key);
  updateCharAngle();
})

canvas.addEventListener('mousedown', (event) => {
  if (event.button === 0) { // Left clicks only
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  }
});
canvas.addEventListener('touchstart', (event) => {
  event.preventDefault(); // Prevent default to avoid issues with scrolling or zooming
  isDragging = true;
  dragStartX = event.touches[0].clientX; // First touch point
  dragStartY = event.touches[0].clientY;
});
document.addEventListener('mouseup', () => {
  isDragging = false;
  blockMouse = false;
});
document.addEventListener('touchend', () => {
  isDragging = false;
});

canvas.addEventListener('mousemove', (event) => {updateMouseData(event)});
canvas.addEventListener('touchmove', (event) => {
  event.preventDefault(); // Prevent scrolling / zooming during touchmove
  updateMouseData(event);
});

function updateMouseData(event) {
  let mouseXInGameCoords, mouseYInGameCoords;

  if (event.type === "mousemove") {
    mouseXInGameCoords = (event.clientX - translationX) / globalScale;
    mouseYInGameCoords = (event.clientY - translationY) / globalScale;
  } else if (event.type === "touchmove" || event.type === "touchstart") {
    mouseXInGameCoords = (event.touches[0].clientX - translationX) / globalScale;
    mouseYInGameCoords = (event.touches[0].clientY - translationY) / globalScale;
  } else { // Handle other event types if necessary
    return;
  }

  const charCenterX = char.x + 15.5;
  const charCenterY = char.y + 19;

  const dx = mouseXInGameCoords - charCenterX;
  const dy = mouseYInGameCoords - charCenterY;

  mouseRadius = Math.sqrt(dx * dx + dy * dy);
  mouseAngle = Math.atan2(dy, dx);
}

let angle = 0;
let keyDominance;
let blockMouse = false;
let charSpeed = 0;

document.addEventListener('keydown', (event) => {
  if ((event.code === 'Space' || event.code === 'Escape' || keysPressed.length !== 0) && charMenuOpen) {
    const toggleCharMenuEvent = new Event('toggleCharMenu');
    window.dispatchEvent(toggleCharMenuEvent);
  } 
  if (event.code === 'Escape') {
    window.bypassMovementCheck = true;
    autoClose(0, true);
  }
})

function updateCharMovement() {
  if (blockDirectionUpdate) {
    char.frameX = 0;
    if (!dialogueToggled) {
      char.frameY = updateCharDirection(Math.PI / 2); // Look down
    }
    return;
  } else {
    npcs.forEach((npc) => {
      if (toggleNPCs[npc.name]) {
        npc.frameY = updateCharDirection((-directionQuery(char, npc)) * Math.PI / 180);
      }
    });
  }
  let maxSpeed = 1.1;
  if (keysPressed.length !== 0) {
    angle = updateCharAngle();
    keyDominance = true;
  } else if (blockMouse) {
    updateAnimation(80, true);
    return
  } else if (isDragging) {
    maxSpeed = limitCharMovement(mouseRadius, maxSpeed); // Adjust the 2nd argument to change the maximum speed
    angle = mouseAngle // limitAngle(mouseAngle, 8);
    keyDominance = false;
  }
  if (keyDominance && isDragging) {
    confirmBlockMouse(100);
  }
  const charAcceleration = 0.1;
  const charDeceleration = 0.25;

  let animationSpeed = 80 / (Math.max(0.6, maxSpeed) / 1.1)

  if ((isDragging || keysPressed.length !== 0) && maxSpeed >= 0.125 && !blockMotion) {
    moving(true);
    charSpeed += charAcceleration;
    charSpeed = Math.min(charSpeed, maxSpeed);
    char.frameY = updateCharDirection(angle);
    updateAnimation(animationSpeed, false);
  } else {
    moving(false);
    charSpeed -= charDeceleration;
    charSpeed = Math.max(charSpeed, 0);
    updateAnimation(animationSpeed, true);
    if (isDragging) {
      char.frameY = updateCharDirection(angle);
    }
  }

  const charCollisions = checkCollisions();

  if (!(keyDominance && (hKeys === 0))) {
    if (   !(((charSpeed * Math.cos(angle)) <= 0) && charCollisions.left)   &&   !(((charSpeed * Math.cos(angle)) >= 0) && charCollisions.right  )) {
      char.x += (charSpeed * Math.cos(angle));
    }
  }
  if (!(keyDominance && (vKeys === 0))) {
    if (   !(((charSpeed * Math.sin(angle)) <= 0) && charCollisions.top)   &&   !(((charSpeed * Math.sin(angle)) >= 0) && charCollisions.bottom  )) {
      char.y += (charSpeed * Math.sin(angle));
    }
  }

  // Constrain position to units of 0.25
  char.x = round(char.x, 100);
  char.y = round(char.y, 100);

  checkNPCs();
}

function round(input, div) {
  return Math.round(input * div) / div;
}

function confirmBlockMouse(time) {
  setTimeout(() => {
    if (keyDominance && isDragging) {
      blockMouse = true;
    }
  }, time);
}

function moving(isMoving) {
  if (isMoving === true) {
    stoppedMoving = false;
    window.stoppedMoving = stoppedMoving;
    let meterWrapper = document.getElementById('meterWrapper');
    let articleWrapper = document.getElementById('articleWrapper');
    let autoCloseInProgress = window.autoCloseInProgress;
    const mainGameMenuToggle = document.getElementById('mainGameMenuToggle');
    if ((meterWrapper.classList.contains('show') || articleWrapper.classList.contains('show') || (mainGameMenuToggle.dataset.toggled === 'true')) && !autoCloseInProgress) {
      const autoCloseEvent = new Event('autoClose');
      window.dispatchEvent(autoCloseEvent);
    }
  } else {
    stoppedMoving = true;
    window.stoppedMoving = stoppedMoving;
  }
}

function limitAngle(angle, divisions) {
  const choppedPi = Math.PI / divisions;
  return Math.round(angle / choppedPi) * choppedPi;
}

let lastUpdate = 0;

let charFrameX = 0; // Store frameX separately

function updateAnimation(speed, stop) {
  const now = performance.now();
  if (now - lastUpdate >= speed) {
    lastUpdate = now; // Update this first to avoid skipping frames

    if (stop) {
      if (charFrameX === 0 || charFrameX === 1 || charFrameX === 4 || charFrameX === 5) {
        charFrameX = 0;
      } else {
        charFrameX = (charFrameX + 1) % 8;
        if (charFrameX === 0 || charFrameX === 4) {
          charFrameX = 0;
          return;
        }
      }
    } else {
      charFrameX = (charFrameX + 1) % 8;
    }
    char.frameX = charFrameX; // Update char.frameX only once per animation frame
  }
}

function limitCharMovement(radius, maxSpeed) {
  let maxRadius = 60;
  let minRadius = 30;

  const leastVPDimension = Math.min(window.innerWidth, window.innerHeight);
  if (leastVPDimension <= 320) {
    maxRadius = minRadius;
  } else if (!(leastVPDimension >= 1000)) {
    maxRadius = minRadius + (maxRadius - minRadius) * ((leastVPDimension - 320) / (1000 - 320));
  }

  let limitFactor = Math.min(radius / maxRadius, 1);
  let limitedMaxSpeed = maxSpeed * limitFactor;
  return limitedMaxSpeed;
}

function updateCharDirection(angle) {
  angle = angle * (180 / Math.PI); // Convert to degrees
  if (angle <= -67.5 && angle >= -112.5) { // N
    return 1;
  } else if (angle >= -157.5 && angle <= -112.5) { // NW
    return 7;
  } else if (angle >= -67.5 && angle <= -22.5) { // NE
    return 6;
  } else if (angle >= 157.5 || angle <= -157.5) { // W
    return 5;
  } else if (angle >= -22.5 && angle <= 22.5) { // E
    return 4;
  } else if (angle >= 22.5 && angle <= 67.5) { // SE
    return 3;
  } else if (angle >= 67.5 && angle <= 112.5) { // S
    return 0;
  } else if (angle >= 112.5 && angle <= 157.5) { // SW
    return 2;
  }
}

let vKeys = 0;
let hKeys = 0;
let angleHistory = 0

function updateCharAngle() {
  const keyAcceleration = 0.1;
  const keyDeceleration = 0.2;
  let vBoth = false;
  let hBoth = false;
  let anyV = false;
  let anyH = false;

  if ((keysPressed.includes('w') || keysPressed.includes('W') || keysPressed.includes('ArrowUp')) && !((keysPressed.includes('s') || keysPressed.includes('S') || keysPressed.includes('ArrowDown')))) {
    if (vKeys < 0) {
      charSpeed = 0;
      vKeys = 0
    }
    anyV = true;
    vKeys = Math.min(vKeys + keyAcceleration, 1); // Up Exclusive
  } else if (!(keysPressed.includes('w') || keysPressed.includes('W') || keysPressed.includes('ArrowUp')) && ((keysPressed.includes('s') || keysPressed.includes('S') || keysPressed.includes('ArrowDown')))) {
    if (vKeys > 0) {
      charSpeed = 0;
      vKeys = 0
    }
    anyV = true
    vKeys = Math.max(vKeys - keyAcceleration, -1); // Down Exclusive
  } else {
    if (vKeys > 0) {
      vKeys = Math.max(vKeys - keyDeceleration, 0);
    } else if (vKeys < 0) {
      vKeys = Math.min(vKeys + keyDeceleration, 0);
    }
  }
  if ((keysPressed.includes('w') || keysPressed.includes('W') || keysPressed.includes('ArrowUp')) && ((keysPressed.includes('s') || keysPressed.includes('S') || keysPressed.includes('ArrowDown')))) {
    vBoth = true;
    anyV = true;
  }

  if ((keysPressed.includes('d') || keysPressed.includes('D') || keysPressed.includes('ArrowRight')) && !(keysPressed.includes('a') || keysPressed.includes('A') || keysPressed.includes('ArrowLeft'))) {
    if (hKeys < 0) {
      charSpeed = 0;
      hKeys = 0
    }
    anyH = true;
    hKeys = Math.min(hKeys + keyAcceleration, 1); // Right Exclusive
  } else if (!(keysPressed.includes('d') || keysPressed.includes('D') || keysPressed.includes('ArrowRight')) && (keysPressed.includes('a') || keysPressed.includes('A') || keysPressed.includes('ArrowLeft'))) {
    if (hKeys > 0) {
      charSpeed = 0;
      hKeys = 0
    }
    anyH = true;
    hKeys = Math.max(hKeys - keyAcceleration, -1); // Left Exclusive
  } else {
    if (hKeys > 0) {
      hKeys = Math.max(hKeys - keyDeceleration, 0);
    } else if (hKeys < 0) {
      hKeys = Math.min(hKeys + keyDeceleration, 0);
    }
  }
  if ((keysPressed.includes('d') || keysPressed.includes('D') || keysPressed.includes('ArrowRight')) && (keysPressed.includes('a') || keysPressed.includes('A') || keysPressed.includes('ArrowLeft'))) {
    hBoth = true;
    anyH = true;
  }

  if (keysPressed.length === 0) {
    vKeys = 0;
    hKeys = 0;
  }

  if ((vBoth && hBoth) || (vBoth && !anyH) || (hBoth && !anyV)) {
    charSpeed = 0;
    blockMotion = true;
    return angleHistory
  } else {
    blockMotion = false;
    angleHistory = Math.atan2(-vKeys, hKeys);
    return angleHistory;
  }
}

window.onload = function () {
  (function updateCharMovementLoop() {
    updateCharMovement();
    requestAnimationFrame(updateCharMovementLoop);
    draw();
  })();
};