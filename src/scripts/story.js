document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("animatedText");
    const topIslandUI = document.getElementById("topIslandUI");

    let currentStory = '';
    let isStoryFinished = false; // Flag to track if the story has finished
    let currentPartIndex = 0;
    let storyParts = [];
    let isAnimating = false; // Track animation status
    let isSkipped = false; // Track skip status
    let animationTimeouts = []; // Store animation timeouts
    let delayAmount = 0.05; // Delay between characters (seconds)

    let touchStartX = 0; // Starting X position for swipe
    let touchEndX = 0; // Ending X position for swipe

    // Function to clear all timeouts
    function clearAnimationTimeouts() {
        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        animationTimeouts = [];
    }

    // Function to instantly display full text with the same structure as animated
    function displayFullTextInstantly(textContent, styledRanges) {
        textElement.textContent = ''; // Clear existing content

        let words = textContent.split(' '); // Split text into words
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block'; // Match animated structure

            [...word].forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.classList.add('char'); // Ensure consistent styling
                charSpan.textContent = char;

                // Disable animations by overriding animation styles
                charSpan.style.animation = 'none';
                charSpan.style.animationDelay = '0s';
                charSpan.style.visibility = 'visible'; // Ensure text is visible immediately
                charSpan.style.opacity = '1'; // Ensure text is fully opaque

                // Apply styles for specific ranges
                const range = styledRanges.find(range =>
                    wordIndex === range.wordIndex && charIndex >= range.startCharacter && charIndex <= range.endCharacter
                );
                if (range?.style) {
                    charSpan.style.cssText += range.style; // Combine styles
                    charSpan.style.animation = 'none'; // Ensure no animation in styled spans
                    charSpan.style.animationDelay = '0s';
                    charSpan.style.visibility = 'visible'; // Ensure styled spans are visible
                    charSpan.style.opacity = '1'; // Ensure styled spans are fully opaque
                }

                wordSpan.appendChild(charSpan); // Append character to word span
            });

            textElement.appendChild(wordSpan); // Add the word span to the text element

            // Add a space after each word except the last
            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.textContent = '\u00A0'; // Non-breaking space
                textElement.appendChild(spaceSpan);
            }
        });
    }

    // Function to handle callbacks with arguments
    function callFunctionWithArgs(callback) {
        if (callback && typeof window[callback.function] === 'function') {
            window[callback.function](...callback.args);
        }
    }

    // Function to animate text word-by-word
    // Update animatedTextLoad function to handle callback before animation starts
    function animatedTextLoad(textContent, styledRanges = [], callback = null) {
        // Execute the callback first if it exists
        if (callback) {
            callFunctionWithArgs(callback);
        }

        isAnimating = true;
        isSkipped = false;
        clearAnimationTimeouts();
        textElement.textContent = ''; // Clear existing content

        let words = textContent.split(' ');
        let cumulativeDelay = 0;

        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            textElement.appendChild(wordSpan);

            [...word].forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.classList.add('char'); // Apply popping animation
                charSpan.textContent = char;

                // Apply styles for ranges
                const range = styledRanges.find(range =>
                    wordIndex === range.wordIndex && charIndex >= range.startCharacter && charIndex <= range.endCharacter
                );
                if (range?.style) {
                    charSpan.style.cssText = range.style;
                }

                // Delayed appending for animation
                const timeout = setTimeout(() => {
                    if (isSkipped) return;
                    wordSpan.appendChild(charSpan);
                }, cumulativeDelay * 1000);
                animationTimeouts.push(timeout);

                cumulativeDelay += delayAmount;
            });

            // Add a space after each word except the last
            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.textContent = '\u00A0';
                textElement.appendChild(spaceSpan);
            }
        });

        // Mark animation as complete
        const endTimeout = setTimeout(() => {
            if (isSkipped) return;
            isAnimating = false;
        }, cumulativeDelay * 1000);
        animationTimeouts.push(endTimeout);
    }

    // Function to load story parts
    function loadStoryParts(storyName) {
        fetch('/stories.json')
            .then(response => response.json())
            .then(data => {
                storyParts = data.stories.filter(story => story.story === storyName);
                currentPartIndex = 0;
                topIslandUI.style.display = 'flex';

                if (storyParts.length > 0) {
                    const currentPart = storyParts[currentPartIndex];
                    animatedTextLoad(currentPart.text, currentPart.styledRanges || [], currentPart.callback || null);
                }
            })
            .catch(error => console.error('Error loading story data:', error));
    }

    // Function to skip animation or move to the next story part
    function nextStoryPart() {
        if (isStoryFinished) return; // Don't proceed if the story is finished

        const currentPart = storyParts[currentPartIndex];

        if (isAnimating) {
            isSkipped = true;
            isAnimating = false;
            clearAnimationTimeouts();
            displayFullTextInstantly(currentPart.text, currentPart.styledRanges || []);
            return;
        }

        // First, update the UI (transition to next part)
        if (currentPart.callbackOnClose && typeof window[currentPart.callbackOnClose] === 'function') {
            // Use setTimeout to ensure callback runs after transition
            setTimeout(() => {
                window[currentPart.callbackOnClose]();
            }, 0); // You can adjust the timeout if you need a longer delay
        }

        // Proceed to the next story part or finish the story
        if (currentPartIndex < storyParts.length - 1) {
            currentPartIndex++;
            const nextPart = storyParts[currentPartIndex];
            animatedTextLoad(nextPart.text, nextPart.styledRanges || [], nextPart.callback || null);
        } else {
            topIslandUI.style.display = 'none';
            isStoryFinished = true; // Mark story as finished
        }
    }

    // Function to move to the previous story part
    function previousStoryPart() {
        if (isStoryFinished) return;

        if (isAnimating) {
            isSkipped = true;
            isAnimating = false;
            clearAnimationTimeouts();
            displayFullTextInstantly(storyParts[currentPartIndex].text, storyParts[currentPartIndex].styledRanges || []);
            return;
        }

        if (currentPartIndex > 0) {
            currentPartIndex--;
            const previousPart = storyParts[currentPartIndex];
            animatedTextLoad(previousPart.text, previousPart.styledRanges || [], previousPart.callback || null);
        }
    }

    // Function to start a story
    function story(storyName) {
        currentStory = storyName;
        loadStoryParts(storyName);
    }

    window.story = story;

    function fcGamemodeSelector() {
        showButtons(
            // leaked ['Create Chaos', 'Restore Truth'],
            ['button 1', 'button 2'], // Button texts
            [,] // Button click functions
        );
    };
    function closeButtons() { //sorta temporary cause will probably have them close once they are pressed instead of in the story
        closeButtons();
    };
    window.fcGamemodeSelector = fcGamemodeSelector

    // Event listeners for keyboard and mouse
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space" || event.code === "ArrowRight") {
            nextStoryPart();
        }
        if (event.code === "ArrowLeft") {
            previousStoryPart();
        }
    });
    document.addEventListener("click", nextStoryPart);

    // Swipe event listeners
    document.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].clientX;

        if (touchEndX < touchStartX) {
            // Swipe left -> previous part
            previousStoryPart();
        } else if (touchEndX > touchStartX) {
            // Swipe right -> next part
            nextStoryPart();
        }
    });

    // Start a specific story
    // story('story1');
});