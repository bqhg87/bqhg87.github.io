import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export const IdleCamera = ({ gameIdle }) => {
  const cameraRef = useRef();
  const tRef = useRef(0);  // Use a ref to store the value of "t"

  // Define the camera path as an array of Vector3 points
  const path = [
    new Vector3(3, 3, 3),
    new Vector3(5, 4, -2),
    new Vector3(6, 2, -6),
    new Vector3(3, 3, -7),
    new Vector3(1, 5, -3),
  ];

  // Update the camera position every frame, moving along the path
  useFrame(() => {
    if (gameIdle && cameraRef.current) {
      // Increment tRef by a small amount each frame
      tRef.current += 0.005;  // Adjust this speed value as needed

      // Loop tRef to create a continuous loop along the path
      if (tRef.current > path.length) {
        tRef.current = 0;
      }

      // Calculate the position along the path using "tRef.current" (time or progress along the path)
      const index = Math.floor(tRef.current) % path.length;  // Get the current point on the path
      const nextIndex = (Math.floor(tRef.current + 1) % path.length);  // Get the next point on the path

      // Interpolate between the current point and the next point
      cameraRef.current.position.lerpVectors(path[index], path[nextIndex], tRef.current % 1);
    }
  });

  useEffect(() => {
    if (!gameIdle && cameraRef.current) {
      // Stop the idle camera when the game starts, and set it to a default position
      cameraRef.current.position.set(0, 3, 3); // or set to another default position for gameplay
    }
  }, [gameIdle]);

  return (
    <perspectiveCamera
      ref={cameraRef}
      position={path[0]}  // Starting point
      fov={40}
      near={0.1}
      far={100}
    />
  );
};