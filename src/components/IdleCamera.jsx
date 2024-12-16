import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export const IdleCamera = ({ speed = 0.005, path }) => {
  const cameraRef = useRef();
  const tRef = useRef(0);

  // Default path if none is provided
  const defaultPath = [
    new Vector3(3, 3, 3),
    new Vector3(5, 4, -2),
    new Vector3(6, 2, -6),
    new Vector3(3, 3, -7),
    new Vector3(1, 5, -3),
  ];

  const cameraPath = path || defaultPath;

  useFrame(() => {
    if (cameraRef.current) {
      // Increment tRef for camera movement
      tRef.current += speed;

      // Compute the current and next indices
      const index = Math.floor(tRef.current) % cameraPath.length;
      const nextIndex = (index + 1) % cameraPath.length;

      // Interpolate between the current and next points
      cameraRef.current.position.lerpVectors(
        cameraPath[index],
        cameraPath[nextIndex],
        tRef.current % 1
      );
    }
  });

  return (
    <perspectiveCamera
      ref={cameraRef}
      fov={40}
      near={0.1}
      far={100}
      position={cameraPath[0]} // Initial position
    />
  );
};