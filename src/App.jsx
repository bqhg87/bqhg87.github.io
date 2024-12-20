import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { IntroCamera } from "./components/IntroCamera";
import { StoryCamera } from "./components/StoryCamera";
import { useState } from 'react';

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
];

function App() {
  const [gameState, setGameState] = useState("intro");

  if (gameState === "story") {
    story('story1');
  };

  if (gameState === "intro") {
    setTimeout(() => {
      showButtons(
        ['Play Game'], // Button texts
        [startStory] // Button click functions (to be filled in)
      );
    }, 5500); // ms
  }

  // Function to transition to the 'game' state
  function startGame() {
    setGameState("game");
    openGuide("controls", true);
  }

  // Function to transition to the 'story' state
  function startStory() {
    closeButtons(false);
    setGameState("story");
  }

  window.startGame = startGame;
  window.startStory = startStory;

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 50 }}
        style={{
          touchAction: "none",
        }}
      >
        {gameState === "story" && <StoryCamera />}
        {gameState === "intro" && <IntroCamera />}
        <color attach="background" args={["#ececec"]} />
        <Experience gameState={gameState} />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
