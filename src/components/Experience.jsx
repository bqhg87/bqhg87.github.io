import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { CharacterController } from "./CharacterController";
import { Map } from "./map";
import { useRef, useEffect } from "react";

const maps = {
  medieval_fantasy_book: {
    scale: 1,
    position: [-4, 0, -6],
  },
};

export const Experience = ({ gameIdle }) => {
  const shadowCameraRef = useRef();

  const map = "medieval_fantasy_book";

  // When game is idle, you might want to disable the character controller and physics
  useEffect(() => {
    if (gameIdle) {
      // Logic for idle state, like camera panning, disabling character controller, etc.
      console.log("game idle");
    } else {
      // Logic for when the game starts (e.g., enable character controller, load the player, etc.)
      console.log("game started");
    }
  }, [gameIdle]);

  return (
    <>
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
      </directionalLight>
      <Physics key={map}>
        <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={`models/${map}.glb`}
        />
        {!gameIdle && <CharacterController />}
      </Physics>
    </>
  );
};
