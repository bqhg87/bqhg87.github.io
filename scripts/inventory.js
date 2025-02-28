window.defaultInventory = [
    { 
        item: "telescope", 
        description: "Maybe this telescope could be used somewhere...",
        quantity: 0, 
        spriteY: 0, 
        index: 1
    },
    { 
        item: "lhcPaper",
        description: "This peer-reviewed paper about the Large Hadron Collider shows how it's actually completely safe!",
        quantity: 0, 
        spriteY: 1,
        index: 2
    },
    { 
        item: "hammer",
        description: "If something needs fixing, this hammer could come in handy!",
        quantity: 0, 
        spriteY: 2,
        index: 3
    },
    { 
        item: "map",
        description: "Map",
        quantity: 0, 
        spriteY: 3,
        index: 4
    },
    { 
        item: "book",
        description: "Book",
        quantity: 0, 
        spriteY: 4,
        index: 5
    },
    { 
        item: "beans",
        description: "I'm pretty sure you can microwave these beans, microwaves are safe?",
        quantity: 0, 
        spriteY: 5,
        index: 6
    },
    { 
        item: "warmBeans",
        description: "Oh these beans have clearly been in the microwave, they're really hot",
        quantity: 0,
        spriteY: 6,
        index: 7
    },
];
function loadInventory() {
    const storedInventory = localStorage.getItem("inventory");
    return storedInventory ? JSON.parse(storedInventory) : [...defaultInventory];
}
function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}
window.inventory = loadInventory();
function setButtonSprite(button, spriteX, spriteY) {
    if (!button || spriteX === null || spriteY === null) return;
    button.style.backgroundPosition = `${-spriteX * 16 * 2.5}px ${-spriteY * 16 * 2.5}px`;
    button.style.backgroundSize = `${16 * 3 * 2.5}px ${16 * 8 * 2.5}px`; 
}
function addButtonEventListeners(button, spriteY, item) {
    if (!button) return;
    button.onmouseover = () => setButtonSprite(button, 1, spriteY); 
    button.onmouseout = () => setButtonSprite(button, 0, spriteY); 
    button.onclick = () => {
        const foundItem = inventory.find(invItem => invItem.item === item);
        if (foundItem) {
            broadcastTopContextMessage(`${foundItem.description}`, 3000, item);
        } else {
            console.warn(`Item '${item}' not found in inventory.`);
        }
    };
}
let itemWrappers = [];
function initialiseInventory() {
    generateInventoryItemWrappers(Math.max(8, inventory.length));  
    itemWrappers = Array.from(document.querySelectorAll(".inventoryItemWrapper"));
    updateInventory();
}
window.updateInventory = function(specificInventory) {
    if (Array.isArray(specificInventory) && specificInventory.every(item => typeof item === "object")) {inventory = specificInventory}
    saveInventory();
    const validItems = inventory
        .filter(item => item.quantity > 0)
        .sort((a, b) => a.index - b.index);
    const requiredSlots = Math.max(8, validItems.length);  
    if (itemWrappers.length < requiredSlots) {
        generateInventoryItemWrappers(requiredSlots);  
        requestAnimationFrame(() => {
            itemWrappers = Array.from(document.querySelectorAll(".inventoryItemWrapper"));
            updateInventory();  
        });
        return;  
    }
    itemWrappers.forEach((wrapper, index) => {
        const button = wrapper.querySelector(".inventoryItem");
        const quantityText = wrapper.querySelector(".inventoryQuantityText");
        const quantityWrapper = wrapper.querySelector(".inventoryQuantityWrapper");
        if (index < validItems.length) {
            const item = validItems[index];
            setButtonSprite(button, 0, item.spriteY);
            addButtonEventListeners(button, item.spriteY, item.item);
            quantityText.textContent = item.quantity;
            button.classList.add("show");
            quantityWrapper.classList.add("show");
        } else {
            setButtonSprite(button, null, null);
            quantityText.textContent = "";
            button.classList.remove("show");
            quantityWrapper.classList.remove("show");
        }
    });
}
function generateInventoryItemWrappers(numItems) {
    const inventoryScrollWrapper = document.querySelector("#inventoryScrollWrapper");
    inventoryScrollWrapper.innerHTML = '';  
    for (let i = 0; i < numItems; i++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('pxDivWrapper', 'inventoryItemWrapper');
        wrapper.dataset.slot = i;
        const button = document.createElement('button');
        button.classList.add('inventoryItem');
        button.id = `inventoryItem${i}`;
        button.setAttribute('aria-label', `Reveal Slot ${i + 1} Item Description`);
        const quantityWrapper = document.createElement('div');
        quantityWrapper.classList.add('pxDivWrapper', 'inventoryQuantityWrapper');
        const quantityText = document.createElement('p');
        quantityText.classList.add('inventoryQuantityText');
        quantityWrapper.appendChild(quantityText);
        wrapper.appendChild(button);
        wrapper.appendChild(quantityWrapper);
        inventoryScrollWrapper.appendChild(wrapper);
    }
    applyPxDivStyling();
    requestAnimationFrame(updateInventory);  
}
window.addInventoryItems = function(itemId, quantity, increment = true) {
    console.log(inventory)
    const item = inventory.find(i => i.item === itemId);
    if (item) {
        if (increment) {
            item.quantity += quantity;
        } else {
            item.quantity = quantity;
        }
    } else {
        console.log('oh noo')
    }
    updateInventory();
}
document.addEventListener("DOMContentLoaded", initialiseInventory);