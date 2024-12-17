document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("animatedText");
    const topIslandUI = document.getElementById("topIslandUI");

    let currentStory = '';
    let currentPartIndex = 0;
    let storyParts = [];
    let isAnimating = false; // Flag to track animation status
    let delayAmount = 0.05;
    let cumulativeDelay = 0;

    // Function to load and animate story part
    function animatedTextLoad(textContent, styledRanges = [], callback = null) {
        cumulativeDelay = 0;
        let currentStyledRangeIndex = 0;
        let inStyledRange = false;
        let currentRange = null;
        
        // Mark that animation is starting
        isAnimating = true;
        console.log(isAnimating);

        textElement.textContent = ''; // Clear existing text

        for (let i = 0; i < textContent.length; i++) {
            if (styledRanges[currentStyledRangeIndex] && i === styledRanges[currentStyledRangeIndex].startCharacter) {
                inStyledRange = true;
                currentRange = styledRanges[currentStyledRangeIndex];
            }

            if (inStyledRange && currentRange && i === currentRange.endCharacter + 1) {
                inStyledRange = false;
                currentRange = null;
                currentStyledRangeIndex++;
            }

            const charSpan = document.createElement('span');
            charSpan.classList.add('char');
            charSpan.textContent = textContent[i] === ' ' ? '\u00A0' : textContent[i];

            if (inStyledRange && currentRange) {
                if (currentRange.style) {
                    charSpan.style.cssText = currentRange.style;
                }
            }

            charSpan.style.animationDelay = `${cumulativeDelay}s`;
            textElement.appendChild(charSpan);
            cumulativeDelay += delayAmount;
        }

        // After all text is loaded, we need to handle the callback and mark animation as done
        if (callback && !isAnimating) {
            const totalDelay = cumulativeDelay * 1000;
            setTimeout(() => {
                if (typeof window[callback] === 'function') {
                    window[callback]();
                } else {
                    console.warn(`Callback function "${callback}" is not defined.`);
                }
            }, totalDelay);
        }

        // After the animation completes, set the flag to false
        setTimeout(() => {
            isAnimating = false;
            delayAmount = 0.05;
            console.log(isAnimating);
        }, cumulativeDelay * 1000); // Animation duration in ms
    }

    // Function to load story parts from the JSON file
    function loadStoryParts(storyName) {
        fetch('/stories.json')
            .then(response => response.json())
            .then(data => {
                storyParts = data.stories.filter(story => story.story === storyName);
                currentPartIndex = 0;
                topIslandUI.style.visibility = 'visible';

                if (storyParts.length > 0) {
                    const currentPart = storyParts[currentPartIndex];
                    animatedTextLoad(
                        currentPart.text,
                        currentPart.styledRanges || [],
                        currentPart.callback || null
                    );
                }
            })
            .catch(error => console.error('Error loading story data:', error));
    }

    // Function to move to the next part of the story
    function nextStoryPart() {
        const currentPart = storyParts[currentPartIndex];

        // If animation is still running, skip to the full text instantly
        if (isAnimating) {
            delayAmount = 0;
            cumulativeDelay = 0;
            let currentPart = storyParts[currentPartIndex];
            return;  // Prevent further actions
        }

        // Run callbackOnClose if it exists
        if (currentPart.callbackOnClose && !isAnimating && typeof window[currentPart.callbackOnClose] === 'function') {
            window[currentPart.callbackOnClose]();
        }

        if ((currentPartIndex < storyParts.length - 1) && !isAnimating) {
            currentPartIndex++;
            const nextPart = storyParts[currentPartIndex];
            animatedTextLoad(nextPart.text, nextPart.styledRanges || [], nextPart.callback || null);
        } else {
            topIslandUI.style.visibility = 'hidden'; // Hide UI when the story ends
        }
    }

    // Function to start a story
    function story(storyName) {
        currentStory = storyName;
        loadStoryParts(storyName);
    }

    // Listen for spacebar press to load the next story part
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            nextStoryPart();
        }
    });
    document.addEventListener("touchstart", function (event) {
        nextStoryPart();
    });
    document.addEventListener("click", function (event) {
        nextStoryPart();
    });

    // Start a specific story on load
    story('story1');
});