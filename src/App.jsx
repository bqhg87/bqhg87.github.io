import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useState, useEffect } from 'react';

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

function App() {
  const [gameIdle, setGameIdle] = useState(false);  // Initializes with 'true' on page load

  function startGame() {
    setGameIdle(false);
  }

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 50 }}
        style={{
          touchAction: "none",
        }}
      >
        <color attach="background" args={["#ececec"]} />
        <Experience gameIdle={gameIdle} />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
