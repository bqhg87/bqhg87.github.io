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

// Initialize inventory UI
function initialiseInventory() {
    itemWrappers = Array.from(document.querySelectorAll(".inventoryItemWrapper"));
    updateInventory();
}

window.updateInventory = function() {
    saveInventory();

    // Filter out items with quantity 0, and sort by index
    const validItems = inventory
        .filter(item => item.quantity > 0)
        .sort((a, b) => a.index - b.index);

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