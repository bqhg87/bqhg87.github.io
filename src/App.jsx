import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { IdleCamera } from "./components/IdleCamera";
import { useState } from 'react';

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
];

function App() {
  const [gameIdle, setGameIdle] = useState(true);

  function startGame() {
    setGameIdle(false);
    openGuide('controls', true);
  }

  window.startGame = startGame;

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 50 }}
        style={{
          touchAction: "none",
        }}
      >
        {gameIdle && <IdleCamera />}
        <color attach="background" args={["#ececec"]} />
        <Experience gameIdle={gameIdle} />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
