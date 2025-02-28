window.console.info("Booting HarmOS...");
const canvas = document.getElementById('game');
const c = canvas.getContext('2d');
window.delMeter = Number(localStorage.getItem("delMeter")) || 100;
function refreshGamemode() {
  if (localStorage.getItem("gamemode") === null) {
    localStorage.setItem("gamemode", "inform");
  }
  window.gamemode = localStorage.getItem("gamemode");
}
document.addEventListener("DOMContentLoaded", refreshGamemode);
const charSheet = new Image();
charSheet.src = './assets/char/base.png';
const npcIndicators = new Image();
npcIndicators.src = './assets/npcIndicators.png';
const groundImage = new Image();
groundImage.src = './assets/ground.png';
const collisionMap = new Image();
collisionMap.src = './assets/collisions.png';
const overlap = new Image();
overlap.src = './assets/overlap.png';
const pearTree = new Image();
pearTree.src = './assets/pearTree1.png';
const exampleHouse = new Image();
exampleHouse.src = './assets/buildings/hsst2a.png';
const hswd3a = new Image();
hswd3a.src = './assets/buildings/hswd3a.png'
const mdar1 = new Image();
mdar1.src = './assets/buildings/mdar1.png';
const mdtw2 = new Image();
mdtw2.src = './assets/buildings/mdtw2.png';
const mdel1 = new Image();
mdel1.src = './assets/buildings/mdel1.png';
const mdel2 = new Image();
mdel2.src = './assets/buildings/mdel2.png';
const wellSand = new Image();
wellSand.src = './assets/buildings/wellSand.png';
const mkst1 = new Image();
const mkst2 = new Image();
const mkst3 = new Image();
const mkst4 = new Image();
const mkst5 = new Image();
const mkst6 = new Image();
const mkst7 = new Image();
const mkst8 = new Image();
const mkst9 = new Image();
const mkst10 = new Image();
const mkst11 = new Image();
mkst1.src = './assets/buildings/mkst1.png';
mkst2.src = './assets/buildings/mkst2.png';
mkst3.src = './assets/buildings/mkst3.png';
mkst4.src = './assets/buildings/mkst4.png';
mkst5.src = './assets/buildings/mkst5.png';
mkst6.src = './assets/buildings/mkst6.png';
mkst7.src = './assets/buildings/mkst7.png';
mkst8.src = './assets/buildings/mkst8.png';
mkst9.src = './assets/buildings/mkst9.png';
mkst10.src = './assets/buildings/mkst10.png';
mkst11.src = './assets/buildings/mkst11.png';
const mdst1 = new Image();
mdst1.src = './assets/buildings/mdst1.png';
const mdtw3 = new Image();
mdtw3.src = './assets/buildings/mdtw3.png';
const mdrg1 = new Image();
mdrg1.src = './assets/buildings/mdrg1.png';
const mdel3 = new Image();
mdel3.src = './assets/buildings/mdel3.png';
const mdel4 = new Image();
mdel4.src = './assets/buildings/mdel4.png';
const lb1 = new Image();
lb1.src = './assets/buildings/lb1.png';
const th1 = new Image();
th1.src = './assets/buildings/th1.png';
const shadow = new Image();
shadow.src = './assets/char/shadow.png';
const blush = new Image();
blush.src = './assets/char/blush.png';
const eyes = new Image();
eyes.src = './assets/char/eyes.png';
const cowbrown = new Image();
cowbrown.src = './assets/animated/cowbrown.png';
const cowlight = new Image();
cowlight.src = './assets/animated/cowlight.png';
const cowpink = new Image();
cowpink.src = './assets/animated/cowpink.png';
const cowpurple = new Image();
cowpurple.src = './assets/animated/cowpurple.png';
const boat = new Image();
boat.src = './assets/animated/boat.png';
const tower5g = new Image();
tower5g.src = './assets/animated/5gtower.png';
const itemsSheet = new Image();
itemsSheet.src = './assets/items.png';
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
    zIndex: 1,
    opacity: 0
  },
  {
    image: hswd3a,
    x: 340,
    y: 209,
    frameWidth: 62,
    frameHeight: 63,
    feet: 1,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 25,
    fadeHead: 48,
    fadeLeft: 20,
    fadeRight: 10
  },
  {
    image: mdar1,
    x: -43,
    y: 226,
    frameWidth: 85,
    frameHeight: 94,
    feet: 4,
    zIndex: 6,
    fadeBehind: true,
    fadeFeet: 15,
    fadeHead: 71,
    fadeLeft: 34,
    fadeRight: 34
  },
  {
    image: mdtw2,
    x: -98,
    y: 217,
    frameWidth: 54,
    frameHeight: 104,
    feet: 4,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 15,
    fadeHead: 88,
    fadeLeft: 23,
    fadeRight: 24
  },
  {
    image: mdel1,
    x: 20,
    y: 185,
    frameWidth: 109,
    frameHeight: 71,
    feet: 20,
    zIndex: 1,
  },
  {
    image: cowbrown,
    x: -286,
    y: 590,
    frameX: 0,
    frameY: 0,
    frameWidth: 32,
    frameHeight: 32,
    animationSpeed: 400,
    animationOffset: 2,
    animationFrames: 8,
    feet: 1,
    zIndex: 1
  },
  {
    image: cowlight,
    x: -186,
    y: 622,
    frameX: 0,
    frameY: 4,
    frameWidth: 32,
    frameHeight: 32,
    animationSpeed: 600,
    animationOffset: 0,
    animationFrames: 4,
    feet: 1,
    zIndex: 1
  },
  {
    image: cowpink,
    x: -35,
    y: 538,
    frameX: 0,
    frameY: 5,
    frameWidth: 32,
    frameHeight: 32,
    animationSpeed: 200,
    animationOffset: 1,
    animationFrames: 20,
    feet: 1,
    zIndex: 1
  },
  {
    image: cowpurple,
    x: -148,
    y: 508,
    frameX: 0,
    frameY: 6,
    frameWidth: 32,
    frameHeight: 32,
    animationSpeed: 200,
    animationOffset: 5,
    animationFrames: 4,
    feet: 1,
    zIndex: 1
  },
  {
    image: boat,
    x: 125,
    y: 603,
    frameX: 0,
    frameY: 0,
    frameWidth: 48,
    frameHeight: 32,
    animationSpeed: 1000,
    animationOffset: 0,
    animationFrames: 1,
    feet: 1,
    zIndex: 1
  },
  {
    image: tower5g,
    x: -300,
    y: 450,
    frameX: 0,
    frameY: 0,
    frameWidth: 54,
    frameHeight: 96,
    animationSpeed: 200,
    animationOffset: 0,
    animationFrames: 10,
    feet: -1,
    zIndex: 1
  },
  {
    image: mdel2,
    x: 33,
    y: 91,
    frameWidth: 57,
    frameHeight: 77,
    feet: 51,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 51,
    fadeHead: 61,
    fadeLeft: 16,
    fadeRight: 27
  },
  {
    image: wellSand,
    x: 48,
    y: 241,
    frameWidth: 31,
    frameHeight: 29,
    feet: 2,
    zIndex: 1,
  },
  {
    image: mkst1,
    x: 96,
    y: 104,
    frameWidth: 49,
    frameHeight: 48,
    feet: 2,
    zIndex: 1,
  },
  {
    image: mkst2,
    x: 158,
    y: 173,
    frameWidth: 49,
    frameHeight: 43,
    feet: 2,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 18,
    fadeHead: 32,
    fadeLeft: 24,
    fadeRight: 24
  },
  {
    image: mkst3,
    x: 165,
    y: 128,
    frameWidth: 90,
    frameHeight: 43,
    feet: 2,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 18,
    fadeHead: 30,
    fadeLeft: 45,
    fadeRight: 45
  },
  {
    image: mkst4,
    x: 181,
    y: 223,
    frameWidth: 44,
    frameHeight: 67,
    feet: 2,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 37,
    fadeHead: 55,
    fadeLeft: 15,
    fadeRight: 24
  },
  {
    image: mkst5,
    x: 250,
    y: 157,
    frameWidth: 49,
    frameHeight: 48,
    feet: 2,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 18,
    fadeHead: 36,
    fadeLeft: 24,
    fadeRight: 24
  },
  {
    image: mkst6,
    x: 272,
    y: 112,
    frameWidth: 49,
    frameHeight: 48,
    feet: 2,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 18,
    fadeHead: 36,
    fadeLeft: 24,
    fadeRight: 24
  },
  {
    image: mkst7,
    x: 323,
    y: 128,
    frameWidth: 74,
    frameHeight: 96,
    feet: 2,
    zIndex: 1,
  },
  {
    image: mkst8,
    x: 304,
    y: 60,
    frameWidth: 49,
    frameHeight: 43,
    feet: 2,
    zIndex: 1,
  },
  {
    image: mkst9,
    x: 426,
    y: 128,
    frameWidth: 49,
    frameHeight: 43,
    feet: 2,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 18,
    fadeHead: 32,
    fadeLeft: 24,
    fadeRight: 24
  },
  {
    image: mkst10,
    x: 405,
    y: 21,
    frameWidth: 44,
    frameHeight: 71,
    feet: 2,
    zIndex: 1,
  },
  {
    image: mkst11,
    x: 192,
    y: 34,
    frameWidth: 44,
    frameHeight: 83,
    feet: 2,
    zIndex: 1,
  },
  {
    image: mdtw3,
    x: -274,
    y: 159,
    frameWidth: 52,
    frameHeight: 112,
    feet: 1,
    zIndex: 1,
    fadeBehind: true,
    fadeFeet: 17,
    fadeHead: 99,
    fadeLeft: 24,
    fadeRight: 24
  },
  {
    image: mdst1,
    x: -243,
    y: 205,
    frameWidth: 128,
    frameHeight: 101,
    feet: 1,
    zIndex: 10,
    fadeBehind: true,
    fadeFeet: 25,
    fadeHead: 90,
    fadeLeft: 50,
    fadeRight: 45
  },
  {
    image: mdrg1,
    x: -240,
    y: 116,
    frameWidth: 106,
    frameHeight: 77,
    feet: 1,
    zIndex: 10,
    fadeBehind: true,
    fadeFeet: 17,
    fadeHead: 64,
    fadeLeft: 50,
    fadeRight: 50
  },
  {
    image: mdel3,
    x: -127,
    y: 99,
    frameWidth: 109,
    frameHeight: 71,
    feet: 1,
    zIndex: 10,
    fadeBehind: true,
    fadeFeet: 10,
    fadeHead: 60,
    fadeLeft: 50,
    fadeRight: 50
  },
  {
    image: mdel4,
    x: -223,
    y: 329,
    frameWidth: 57,
    frameHeight: 71,
    feet: 1,
    zIndex: 10,
    fadeBehind: true,
    fadeFeet: 51,
    fadeHead: 61,
    fadeLeft: 20,
    fadeRight: 27
  },
  {
    image: lb1,
    x: 166,
    y: -236,
    frameWidth: 166,
    frameHeight: 137,
    feet: 1,
    zIndex: 10,
  },
  {
    image: th1,
    x: -75,
    y: -300,
    frameWidth: 162,
    frameHeight: 157,
    feet: 1,
    zIndex: 10,
  },
  {
    image: overlap,
    x: -1024,
    y: -1024,
    zIndex: 9009,
    feet: -10000
  },
  {
    image: pearTree,
    x: 339,
    y: -12,
    frameWidth: 24,
    frameHeight: 31,
    feet: 0,
    zIndex: 1
  },
];
window.char = objectsToDraw[0]; 
const collisionMapOffset = objectsToDraw[2];
const cowbrownNPC = objectsToDraw[7];
const cowlightNPC = objectsToDraw[8];
const cowpinkNPC = objectsToDraw[9];
const cowpurpleNPC = objectsToDraw[10];
const boatAnimate = objectsToDraw[11];
const animate5G = objectsToDraw[13];
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
let charAppearance = {
  skinTone: 0,
  eyes: 8, 
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
const cachedAppearance = JSON.parse(localStorage.getItem('charAppearance'));
if (cachedAppearance) {
  charAppearance = cachedAppearance;
} else {
  localStorage.setItem('charAppearance', JSON.stringify(charAppearance));
}
window.updateCharAppearance = function(newProperties) {
  Object.assign(charAppearance, newProperties); 
  localStorage.setItem('charAppearance', JSON.stringify(charAppearance));
  updateDisplayedCharSettings();
  draw(); 
}
window.randomiseCharAppearance = function() {
  const skinTones = 8; 
  const hairTypes = 14; 
  const topTypes = 10; 
  const bottomTypes = 10; 
  const hairs = Object.keys(hair);
  const topsNames = Object.keys(tops);
  const bottomsNames = Object.keys(bottoms);
  let newEyes;
  if (charAppearance.eyes === 8) {
    newEyes = 8 
  } else {
    newEyes = Math.floor(Math.random() * 8); 
  }
  updateCharAppearance({
    skinTone: Math.floor(Math.random() * skinTones),
    eyes: newEyes, 
    blush: Math.random() < 0.5, 
    beard: Math.random() < 0.5, 
    glasses: Math.random() < 0.5, 
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
const items = []; 
images.push(itemsSheet);
window.createItem = function(itemData) {
  const item = {
    x: itemData.x,
    y: itemData.y,
    spriteX: itemData.spriteX || 0,
    spriteY: itemData.spriteY || 0,
    visible: itemData.visible !== undefined ? itemData.visible : true,
    scale: itemData.scale || 1,
    zIndex: itemData.zIndex || 1,
    frameWidth: 16,
    frameHeight: 16,
    feet: itemData.feet || 0, 
  };
  items.push(item);
}
function removeItem(itemToRemove) {
  const index = items.indexOf(itemToRemove);
  if (index !== -1) {
    items.splice(index, 1); 
  } else {
    console.warn("Item not found in items array");
  }
}
function updateItemProximity() {
  items.forEach(item => {
    const charCenterX = char.x + char.frameWidth / 2;
    const charCenterY = char.y + char.frameHeight / 2;
    const itemCenterX = item.x + item.frameWidth / 2;
    const itemCenterY = item.y + item.frameHeight / 2;
    const distance = Math.sqrt(Math.pow(charCenterX - itemCenterX, 2) + Math.pow(charCenterY - itemCenterY, 2));
    item.spriteX = distance <= 10 ? 1 : 0;
  });
}
function handleItemPickup() {
  items.forEach(item => {
    const charCenterX = char.x + char.frameWidth / 2;
    const charCenterY = char.y + char.frameHeight / 2;
    const itemCenterX = item.x + item.frameWidth / 2;
    const itemCenterY = item.y + item.frameHeight / 2;
    const distance = Math.sqrt(Math.pow(charCenterX - itemCenterX, 2) + Math.pow(charCenterY - itemCenterY, 2));
    if (distance <= 10) {
      const foundItem = window.defaultInventory.find(inventoryItem => inventoryItem.spriteY === item.spriteY);
      if (foundItem) {
        addInventoryItems(foundItem.item, 1);
        updateChapter("Astronomer", 2);
        updateChapter("Tibbert", 2);
        removeItem(item);
      } else {
        console.warn("Item is undefined");
      }
    }
  });
}
window.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    handleItemPickup();
  }
});
function initialiseItems() {
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  const taskStates = JSON.parse(localStorage.getItem("taskStates")) || {};
  const lhcPaper = inventory.find(item => item.item === "lhcPaper");
  if (taskStates.bh_library === "visible" && lhcPaper && lhcPaper.quantity === 0) {
    createItem({ x: 240, y: -60, spriteX: 0, spriteY: 1, visible: true });
  }
}
const npcImages = {}; 
function createNPC(npcData) {
  let npc = {
    ...npcData, 
    image: new Image(),
    frameWidth: 32,
    frameHeight: 32,
    feet: 5,
    zIndex: 1,
    frameX: npcData.frameX || 0,
    frameY: npcData.frameY || 0,
    indicator: { 
      spriteX: npcData.spriteX || 1, 
      spriteY: 0,
      offsetX: npcData.indicatorOffsetX || 13.5, 
      offsetY: npcData.indicatorOffsetY || -1,
      animate: npcData.indicatorAnimate !== undefined ? npcData.indicatorAnimate : true, 
      sinDistance: npcData.indicatorSinDistance || 5,
      sinSpeed: npcData.indicatorSinSpeed || 4.4,
      sinOffset: npcData.indicatorSinOffset || 0,
      visible: npcData.indicatorVisible !== undefined ? npcData.indicatorVisible : true, 
    },
    appearance: { 
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
  npc.image.src = `./assets/char/base.png`; 
  npc.tops = { ...tops }; 
  npc.bottoms = { ...bottoms }; 
  npc.hair = { ...hair }; 
  npc.image.onload = onImageLoad; 
  refreshNPCIndicator(npc);
  return npc;
}
function refreshNPCIndicator(npc) {
const npcIndicatorStates = JSON.parse(localStorage.getItem('npcIndicatorStates')) || [];
const npcState = npcIndicatorStates.find(state => state.npcName === npc.name);
if (npcState) {
  npc.indicator.spriteX = npcState.spriteX;
}
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
    spriteX: 3, 
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
    spriteX: 1, 
  }),
  createNPC({
    name: 'Quantum Expert',
    x: 350,
    y: -100,
    hair: 'buzzcut',
    clothingTop: 'basic',
    clothingBottom: 'trousers',
    skinTone: 2,
    bottomType: 4,
    hairType: 6,
    topType: 7,
    spriteX: 1, 
  }),
  createNPC({
    name: 'Market Trader',
    x: 438.5,
    y: 154,
    hair: 'braids',
    clothingTop: 'floral',
    skinTone: 3,
    topType: 8,
    hairType: 10,
    indicatorSinSpeed: 2,
    indicatorSinOffset: 20,
    spriteX: 3, 
  }),
  createNPC({
    name: 'Carl',
    x: 205,
    y: 162,
    hair: 'buzzcut',
    clothingTop: 'floral',
    skinTone: 1,
    topType: 5,
    bottomTupe: 2,
    hairType: 4,
    indicatorSinSpeed: 2.5,
    indicatorSinOffset: 50,
    spriteX: 1, 
  }),
  createNPC({
    name: 'Agnet',
    x: 265,
    y: 62,
    hair: 'bob',
    clothingTop: 'floral',
    clothingBottom: 'trousers',
    skinTone: 1,
    eyes: 2,
    topType: 2,
    bottomType: 2,
    hairType: 4,
    indicatorSinSpeed: 2.5,
    indicatorSinOffset: 100,
    spriteX: 1, 
  }),
  createNPC({
    name: 'Harold',
    x: 334,
    y: 100,
    hair: 'buzzcut',
    clothingTop: 'basic',
    clothingBottom: 'trousers',
    skinTone: 5,
    topType: 7,
    bottomType: 1,
    hairType: 7,
    indicatorSinSpeed: 2.5,
    indicatorSinOffset: 150,
    spriteX: 1, 
  }), 
  createNPC({
    name: 'Grandma',
    x: 358.5,
    y: 260,
    hair: 'bob',
    clothingTop: 'floral',
    hairType: 7,
    topType: 9,
    clothingBottom: 'skirt',
    bottomType: 9,
    skinTone: 1,
    blush: true,
    indicatorSinSpeed: 2.3,
    indicatorSinOffset: 52,
    spriteX: 3, 
  }),
  createNPC({
    name: 'Restaurant Worker',
    x: -156,
    y: 186,
    hair: 'buzzcut',
    clothingTop: 'skull',
    hairType: 4,
    topType: 0,
    bottomType: 6,
    indicatorSinSpeed: 2.7,
    indicatorSinOffset: 140,
    spriteX: 1, 
  })
];
window.currentStories = [
  {
    name: 'Tibbert',
    story: 'blackHole',
    chapter: 1,
  },
  {
    name: 'Astronomer',
    story: 'default',
    chapter: 1,
  },
  {
    name: 'Quantum Expert',
    story: 'default',
    chapter: 1,
  },
  {
    name: 'Market Trader',
    story: 'quantumHealing',
    chapter: 1,
  },
  {
    name: 'Carl',
    story: 'default',
    chapter: 1,
  },
  {
    name: 'Agnet',
    story: 'default',
    chapter: 1,
  },
  {
    name: 'Harold',
    story: 'default',
    chapter: 1,
  },
  {
    name: 'Grandma',
    story: 'microwaves',
    chapter: 1,
  },
  {
    name: 'Restaurant Worker',
    story: 'default',
    chapter: 1,
  }
];
const cachedStories = JSON.parse(localStorage.getItem('currentStories'));
if (cachedStories) { 
  window.currentStories = cachedStories;
} else {
  localStorage.setItem('currentStories', JSON.stringify(window.currentStories));
}
window.updateStory = function(name, newStory, newChapter = 1) {
  const storyToUpdate = window.currentStories.find(story => story.name === name);
  if (storyToUpdate) {
    storyToUpdate.story = newStory;
    storyToUpdate.chapter = newChapter;
    localStorage.setItem('currentStories', JSON.stringify(window.currentStories));
  }
};
window.updateChapter = function(name, newChapter) {
  const storyToUpdate = window.currentStories.find(story => story.name === name);
  if (storyToUpdate) {
    storyToUpdate.chapter = newChapter;
    localStorage.setItem('currentStories', JSON.stringify(window.currentStories));
  }
};
window.getChapter = function(name) {
  const story = window.currentStories.find(story => story.name === name);
  return story ? story.chapter : null;
};
window.updateNPCIndicator = function(npcName, spriteX) {
  let npcIndicatorStates = JSON.parse(localStorage.getItem('npcIndicatorStates')) || [];
  const npcIndex = npcIndicatorStates.findIndex(state => state.npcName === npcName);
  if (npcIndex !== -1) {
    npcIndicatorStates[npcIndex].spriteX = spriteX;
  } else {
    npcIndicatorStates.push({ npcName, spriteX });
  }
  const npc = npcs.find(npc => npc.name === npcName);
  npc.indicator.spriteX = spriteX;
  localStorage.setItem('npcIndicatorStates', JSON.stringify(npcIndicatorStates));
};
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
  if (charAppearance.shadow) {
    c.drawImage(shadow, 0, 0, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }
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
  if (npc.appearance.shadow) {
    c.drawImage(shadow, 0, 0, frameWidth, frameHeight, scaledX, scaledY, scaledWidth, scaledHeight);
  }
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
function drawItem(item) {
  if (!item.visible) return;
  const scaledX = (item.x * item.scale * globalScale) + translationX;
  const scaledY = (item.y * item.scale * globalScale) + translationY;
  const scaledWidth = item.frameWidth * item.scale * globalScale;
  const scaledHeight = item.frameHeight * item.scale * globalScale;
  const spriteX = item.spriteX * item.frameWidth;
  const spriteY = item.spriteY * item.frameHeight;
  c.drawImage(
    itemsSheet,
    spriteX, spriteY, item.frameWidth, item.frameHeight,
    scaledX, scaledY, scaledWidth, scaledHeight
  );
}
let cowsVisible = false; 
let boatVisible = false; 
let towerVisible = false; 
function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  centerCamera();
  updateItemProximity();
  const sortedObjects = [...objectsToDraw, ...npcs, ...items].sort((a, b) => {
    const charFeet = char.y + char.frameHeight - char.feet;
    const aFeet = (a.y || 0) + (a.frameHeight || 0) - (a.feet || 0);
    const bFeet = (b.y || 0) + (b.frameHeight || 0) - (b.feet || 0);
    if (aFeet > bFeet) {
      return 1; 
    }
    if (aFeet < bFeet) {
      return -1; 
    }
    return (a.zIndex || 0) - (b.zIndex || 0);
  });
  cowsVisible = false;
  boatVisible = false;
  towerVisible = false
  sortedObjects.forEach(obj => {
    if (obj === char) {
      drawCharacterWithClothing();
      return;
    }
    if (obj.name) {
      drawNPC(obj);
      return;
    }
    if (obj.image === collisionMap) {
      return;
    }
    if (obj.image) {
      const { image, x, y, opacity = 1, scale = 1, frameX = 0, frameY = 0, frameWidth = image.width, frameHeight = image.height, fadeBehind, feet, fadeFeet, fadeHead, fadeLeft, fadeRight } = obj;
      const scaledX = (x * scale * globalScale) + translationX;
      const scaledY = (y * scale * globalScale) + translationY;
      const charFeetY = char.y + char.frameHeight - char.feet;
      const objFeetY = (y || 0) + (frameHeight || 0) - (feet || 0);
      const objFeetYFade = (y || 0) + (frameHeight || 0) - (fadeFeet || 0);
      const objHeadYFade = (y || 0) + (frameHeight || 0) - (fadeHead || 0);
      const charFadeX = char.x + (char.frameWidth / 2);
      const objLeftXFade = (x || 0) + ((frameWidth / 2) || 0) - (fadeLeft || 0);
      const objRightXFade = (x || 0) + ((frameWidth / 2) || 0) + (fadeRight || 0);
      if ([cowbrown, cowlight, cowpink, cowpurple].includes(image) && scaledX + frameWidth * scale * globalScale > 0 && scaledX < canvas.width && scaledY + frameHeight * scale * globalScale > 0 && scaledY < canvas.height) {
        cowsVisible = true;
      }
      if (image === boat && scaledX + frameWidth * scale * globalScale > 0 && scaledX < canvas.width && scaledY + frameHeight * scale * globalScale > 0 && scaledY < canvas.height) {
        boatVisible = true;
      }
      if (image === tower5g && scaledX + frameWidth * scale * globalScale > 0 && scaledX < canvas.width && scaledY + frameHeight * scale * globalScale > 0 && scaledY < canvas.height) {
        towerVisible = true;
      }
      let drawOpacity = opacity;
      if (fadeBehind && charFeetY < objFeetYFade && charFeetY > objHeadYFade && charFadeX > objLeftXFade && charFadeX < objRightXFade) {
        drawOpacity = 0.75;
      }
      c.globalAlpha = drawOpacity;
      const scaledImgWidth = frameWidth * scale * globalScale;
      const scaledImgHeight = frameHeight * scale * globalScale;
      c.drawImage(
        image,
        frameX * frameWidth, frameY * frameHeight,
        frameWidth, frameHeight,
        scaledX, scaledY,
        scaledImgWidth, scaledImgHeight
      );
      c.globalAlpha = 1;
    } else if (items.includes(obj)) {
      drawItem(obj);
    }
  });
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
let lowCamera = false;
let centerOnLoad = false; 
let globalScale = 4; 
const dpr = window.devicePixelRatio || 1;
let translationX = 0;
let translationY = 0;
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
let zoomStartTime = null;
let zoomStartScale = globalScale;
let zoomTargetScale = globalScale;
let zoomDuration = 500; 
let zoomProgress = 0; 
let zoomingInProgress = false; 
function animateZoom() {
  const currentTime = Date.now();
  if (!zoomStartTime) zoomStartTime = currentTime;
  const elapsedTime = currentTime - zoomStartTime;
  const progress = Math.min(elapsedTime / zoomDuration, 1); 
  const easedProgress = easeInOut(progress);
  globalScale = zoomStartScale + (zoomTargetScale - zoomStartScale) * easedProgress;
  lerpLowCamera = lowCameraOffsetHistory + (lowCameraOffset - lowCameraOffsetHistory) * easedProgress;
  draw(); 
  if (progress < 1) {
    requestAnimationFrame(animateZoom);
  } else {
    zoomingInProgress = false; 
    zoomStartTime = null; 
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
    hairPairToggles.classList.remove('show'); 
    topsPairToggles.classList.remove('show'); 
    bottomsPairToggles.classList.remove('show'); 
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
  closeTasks();
  closeInventory();
  lowCamera = false;
  blockSpaceDialogueToggle = true;
  updateLowCamera();
  char.frameY = updateCharDirection(Math.PI / 2);
  if (zoomingInProgress && zoomTargetScale === 4) {
    zoomStartScale = globalScale;
    zoomTargetScale = 6; 
    zoomStartTime = null; 
    setTimeout(() => {
      blockMotion = true;
      blockDirectionUpdate = true;
      bottomLabelWrapper.classList.remove('show');
      dialogueToggle.classList.remove('show');
      dialogueContextWrapper.classList.add('hidden');
    }, (zoomDuration))
  } else if (!zoomingInProgress) {
    zoomStartScale = globalScale;
    zoomTargetScale = 6; 
    zoomingInProgress = true; 
    animateZoom();
    setTimeout(() => {
      blockMotion = true;
      blockDirectionUpdate = true;
      bottomLabelWrapper.classList.remove('show');
      dialogueToggle.classList.remove('show');
      dialogueContextWrapper.classList.add('hidden');
    }, (0)) 
  }
  setTimeout(() => {
    window.charMenuOpen = true;
    Array.from(charMenuButtonPairs).forEach(pair => {pair.style.transition = '';}); 
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
    zoomStartScale = globalScale;
    zoomTargetScale = 4; 
    zoomStartTime = null; 
    setTimeout(() => {
      blockMotion = false;
      blockDirectionUpdate = false;
    }, (0)) 
  } else if (!zoomingInProgress) {
    zoomStartScale = globalScale;
    zoomTargetScale = 4; 
    zoomingInProgress = true; 
    animateZoom();
    setTimeout(() => {
      blockMotion = false;
      blockDirectionUpdate = false;
    }, (zoomDuration))
  }
});
function adjustForRetina() {
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  c.scale(dpr, dpr);
  if (!centerOnLoad) {
    centerCamera();
    centerOnLoad = true;
  }
  c.imageSmoothingEnabled = false;
  draw();  
}
let lerpLowCamera = 0;
let lowCameraOffset = 0;
let lowCameraOffsetHistory = 0;
function centerCamera() {
    const charWidth = (char.frameWidth) * globalScale;
    const charHeight = (char.frameHeight) * globalScale;
    const canvasCenterX = canvas.width / 2 / dpr;
    const canvasCenterY = canvas.height / 2 / dpr;
    translationX = canvasCenterX - (round(char.x, 8) * globalScale + charWidth / 2) + 4;
    if (!zoomingInProgress) {
      lerpLowCamera = lowCameraOffset
    }
    translationY = canvasCenterY - (round(char.y, 8) * globalScale + charHeight / 2 - lerpLowCamera);
}
function updateLowCamera() {
  const dialogueHeight = dialogueWrapper.offsetHeight; 
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
let toggleNPCs = {}; 
const npcUpdateEvent = new Event('npcUpdate');
let dialogueToggled = false;
window.dialogueToggled = dialogueToggled;
const bottomLabel = document.getElementById('bottomLabel');
const bottomLabelWrapper = document.getElementById('bottomLabelWrapper');
const dialogueToggle = document.getElementById('dialogueToggle');
let isNearNPC;
function checkNPC(npc, char, distance) {
  const distanceToNPC = proximityQuery(char, npc);
  const isNear = distanceToNPC <= distance;
  const wasNear = toggleNPCs[npc.name];
  npc.indicator.spriteX = parseInt(localStorage.getItem(`npc_${npc.name}_spriteX`)) || npc.indicator.spriteX;
  if (isNear && !wasNear) {
    toggleNPCs[npc.name] = true;
    npc.indicator.spriteY = 1;  
    bottomLabel.textContent = `Talk to ${npc.name}`;
    bottomLabelWrapper.classList.add('show');
    dialogueToggle.classList.add('show');
    dialogueContextWrapper.classList.remove('hidden');
    npcMemory = npc.name;
    isNearNPC = true;
  } else if (!isNear && wasNear) {
    toggleNPCs[npc.name] = false;
    npc.indicator.spriteY = 0;  
    npc.frameY = updateCharDirection(Math.PI / 2);
    bottomLabelWrapper.classList.remove('show');
    dialogueToggle.classList.remove('show');
    dialogueContextWrapper.classList.add('hidden');
    isNearNPC = false;
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
let spaceHeld = false; 
function spaceDialogueToggle(event) {
  if (event.code !== "Space" || spaceHeld || blockSpaceDialogueToggle || !isNearNPC) return;
  setTimeout(() => { spaceHeld = true }, 10); 
  if (window.isTextAnimating) {
    skipDialogue(); 
    return;
  }
  loadStory();
  handleStartEndDialogue();
}
function resetSpaceHeld(event) {
  if (event.code === "Space") {
    spaceHeld = false; 
  }
}
window.addEventListener("keydown", spaceDialogueToggle);
window.addEventListener("keyup", resetSpaceHeld);
window.toggleDialogueOpen = function () {
  loadStory();
  handleStartEndDialogue();
}
function getStoryForNPC(name) {
  const npc = window.currentStories.find(npc => npc.name === name);
  return npc ? npc.story : null;  
}
function loadStory() {
  console.log('loadStory function gameJS 2')
  const npc = npcs.find(npc => npc.name === npcMemory);
  loadDialogue(getStoryForNPC(npc.name), getChapter(npc.name), npc.name); 
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
  document.getElementById('mainGameMenuWrapper').classList.add('hidden');
  npc.indicator.spriteY = -1;
  char.frameY = updateCharDirection((-directionQuery(npc, char)) * Math.PI / 180);
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
  dialogueWrapper.classList.remove('show');
  updateFootButtonsVisibility();
  npc.indicator.spriteY = 1;
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
  const npc = npcs.find(npc => npc.name === npcMemory);
  npc.indicator.spriteY = 1;
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
  for (const range of validRanges) {
    if (direction >= range.min && direction <= range.max) {
      return direction; 
    }
  }
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
  return Math.atan2(dy, -dx) * (180 / Math.PI); 
}
const collisionMapCanvas = document.createElement('canvas');
const c2 = collisionMapCanvas.getContext('2d');
let collisionMapData; 
collisionMap.onload = () => {
    collisionMapCanvas.width = collisionMap.width;
    collisionMapCanvas.height = collisionMap.height;
    c2.drawImage(collisionMap, 0, 0);
    collisionMapData = c2.getImageData(0, 0, collisionMap.width, collisionMap.height).data;
};
function checkCollisions() {
    if (!collisionMapData) return { top: false, bottom: false, left: false, right: false }; 
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
  if (event.button === 0) { 
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  }
});
canvas.addEventListener('touchstart', (event) => {
  event.preventDefault(); 
  isDragging = true;
  dragStartX = event.touches[0].clientX; 
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
  event.preventDefault(); 
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
  } else { 
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
      char.frameY = updateCharDirection(Math.PI / 2); 
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
    maxSpeed = limitCharMovement(mouseRadius, maxSpeed); 
    angle = mouseAngle 
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
  char.x = round(char.x, 100);
  char.y = round(char.y, 100);
  localStorage.setItem("charMemory", JSON.stringify(char));
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
    if ((meterWrapper.classList.contains('show') || articleWrapper.classList.contains('show') || (window.isInventoryOpen) || (window.isTasksOpen)  || (mainGameMenuToggle.dataset.toggled === 'true')) && !autoCloseInProgress) {
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
let charFrameX = 0; 
function updateAnimation(speed, stop) {
  const now = performance.now();
  if (now - lastUpdate >= speed) {
    lastUpdate = now; 
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
    char.frameX = charFrameX; 
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
  angle = angle * (180 / Math.PI); 
  if (angle <= -67.5 && angle >= -112.5) { 
    return 1;
  } else if (angle >= -157.5 && angle <= -112.5) { 
    return 7;
  } else if (angle >= -67.5 && angle <= -22.5) { 
    return 6;
  } else if (angle >= 157.5 || angle <= -157.5) { 
    return 5;
  } else if (angle >= -22.5 && angle <= 22.5) { 
    return 4;
  } else if (angle >= 22.5 && angle <= 67.5) { 
    return 3;
  } else if (angle >= 67.5 && angle <= 112.5) { 
    return 0;
  } else if (angle >= 112.5 && angle <= 157.5) { 
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
    vKeys = Math.min(vKeys + keyAcceleration, 1); 
  } else if (!(keysPressed.includes('w') || keysPressed.includes('W') || keysPressed.includes('ArrowUp')) && ((keysPressed.includes('s') || keysPressed.includes('S') || keysPressed.includes('ArrowDown')))) {
    if (vKeys > 0) {
      charSpeed = 0;
      vKeys = 0
    }
    anyV = true
    vKeys = Math.max(vKeys - keyAcceleration, -1); 
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
    hKeys = Math.min(hKeys + keyAcceleration, 1); 
  } else if (!(keysPressed.includes('d') || keysPressed.includes('D') || keysPressed.includes('ArrowRight')) && (keysPressed.includes('a') || keysPressed.includes('A') || keysPressed.includes('ArrowLeft'))) {
    if (hKeys > 0) {
      charSpeed = 0;
      hKeys = 0
    }
    anyH = true;
    hKeys = Math.max(hKeys - keyAcceleration, -1); 
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
function initialiseCharPosition() {
  let storedChar = localStorage.getItem("charMemory");
  storedChar = storedChar ? JSON.parse(storedChar) : {};
  char.x = storedChar.x ?? char.x;
  char.y = storedChar.y ?? char.y;
}
let animationId; 
function animateAll() {
  if (cowsVisible) {
    animateCows(); 
  }
  if (boatVisible) {
    animateBoat(); 
  }
  if (towerVisible) {
    animateTower()
  }
  animationId = requestAnimationFrame(animateAll); 
}
function animateCows() {
  if (!cowsVisible) return; 
  const cows = [cowbrownNPC, cowlightNPC, cowpinkNPC, cowpurpleNPC];
  cows.forEach(cow => animate(cow)); 
}
function animateBoat() {
  if (!boatVisible) return; 
  animate(boatAnimate); 
}
function animateTower() {
  if (!towerVisible) return; 
  animate(animate5G); 
}
function animate(obj) {
  if (obj.lastUpdate === undefined) {
    obj.lastUpdate = Date.now();
    obj.frameX = obj.animationOffset; 
  }
  const now = Date.now();
  const elapsedTime = now - obj.lastUpdate;
  if (elapsedTime >= obj.animationSpeed) {
    obj.frameX = (obj.frameX + 1) % obj.animationFrames;
    obj.lastUpdate = now; 
  }
}
window.onload = function () {
  initialiseCharPosition();
  initialiseItems();
  (function updateCharMovementLoop() {
    updateCharMovement();
    requestAnimationFrame(updateCharMovementLoop); 
    draw();
  })();
  animateAll(); 
};
window.onbeforeunload = () => {
  cancelAnimationFrame(animationId); 
};