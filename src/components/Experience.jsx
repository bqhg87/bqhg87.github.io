import { Environment, Svg } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { CharacterController } from "./CharacterController";
import { Map } from "./map";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const maps = {
  medieval_fantasy_book: {
    scale: 1,
    position: [-4, 0, -6],
  },
};

export const Experience = ({ gameState }) => {
  const shadowCameraRef = useRef();
  const svgRef = useRef();

  const map = "medieval_fantasy_book";

  useFrame(({ camera }) => {
    if (svgRef.current) {
      svgRef.current.lookAt(camera.position);
    }
  });

  // When game is idle, you might want to disable the character controller and physics
  useEffect(() => {
    if (gameState === "intro") {
      console.log("game intro");
    } else if (gameState === "story") {
      console.log("game story");
    } else if (gameState === "game") {
      console.log("game");
    }
  }, [gameState]);

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
      <ambientLight intensity={0.5} />
      <Svg
        ref={svgRef}
        src="/logo.svg"
        scale={0.005}
        position={[-4, 3, -8]}
      />
      <Physics key={map}>
        <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={`models/${map}.glb`}
        />
        {gameState === "game" && <CharacterController />}
      </Physics>
    </>
  );
};
