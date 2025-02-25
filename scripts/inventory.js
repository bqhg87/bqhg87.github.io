window.defaultInventory = [
    { 
        item: "wateringCan", 
        description: "If theres a drought, feel free to water the crops",
        quantity: 0, 
        spriteY: 0, 
        index: 1
    },
    { 
        item: "apple",
        description: "Use this apple to put in your mouth and chew on if you ever feel hungry",
        quantity: 0, 
        spriteY: 1,
        index: 2
    },
];

// Function to load inventory from localStorage or use default
function loadInventory() {
    const storedInventory = localStorage.getItem("inventory");
    return storedInventory ? JSON.parse(storedInventory) : [...defaultInventory];
}

// Function to save inventory to localStorage
function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Initialize inventory from localStorage
window.inventory = loadInventory();

function setButtonSprite(button, spriteX, spriteY) {
    if (!button || spriteX === null || spriteY === null) return;

    button.style.backgroundPosition = `${-spriteX * 16 * 2.5}px ${-spriteY * 16 * 2.5}px`;
    button.style.backgroundSize = `${16 * 3 * 2.5}px ${16 * 8 * 2.5}px`; // Scale the sprite
}

function addButtonEventListeners(button, spriteY, item) {
    if (!button) return;

    button.onmouseover = () => setButtonSprite(button, 1, spriteY); // Hover state
    button.onmouseout = () => setButtonSprite(button, 0, spriteY); // Regular state
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

// Function to dynamically generate inventory item wrappers
function generateInventoryItemWrappers(numItems) {
    const inventoryScrollWrapper = document.querySelector("#inventoryScrollWrapper");
    inventoryScrollWrapper.innerHTML = '';  // Clear the existing items
    
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
}

// Initialize inventory UI
function initialiseInventory() {
    // Generate the inventory item wrappers dynamically
    generateInventoryItemWrappers(Math.max(8, inventory.length));  // Ensure at least 8 slots

    itemWrappers = Array.from(document.querySelectorAll(".inventoryItemWrapper"));
    updateInventory();
}


window.updateInventory = function() {
    saveInventory();

    // Filter out items with quantity 0, and sort by index
    const validItems = inventory
        .filter(item => item.quantity > 0)
        .sort((a, b) => a.index - b.index);

    // Adjust the number of inventory item wrappers if necessary
    const requiredSlots = Math.max(8, validItems.length);  // Ensure at least 8 slots
    if (itemWrappers.length < requiredSlots) {
        generateInventoryItemWrappers(requiredSlots);  // Add more slots if needed
        itemWrappers = Array.from(document.querySelectorAll(".inventoryItemWrapper"));
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
            // Clear out empty inventory slots
            setButtonSprite(button, null, null);
            quantityText.textContent = "";
            button.classList.remove("show");
            quantityWrapper.classList.remove("show");
        }
    });
}

// Initialize inventory on page load
document.addEventListener("DOMContentLoaded", initialiseInventory);