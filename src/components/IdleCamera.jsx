import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, CatmullRomCurve3 } from "three";

export const IdleCamera = ({ speed = 0.00003, path, lookAtPoints }) => {
  const cameraRef = useRef();
  const tRef = useRef(0);
  const { set, size } = useThree();

  // Default path if none is provided
  const defaultPath = [
    new Vector3(20, 5, 20),
    new Vector3(-10, 5, 30),
    new Vector3(-20, 0, 30),
    new Vector3(-30, 5, 20),
    new Vector3(-40, 5, 0),
    new Vector3(-40, 15, -50),
    new Vector3(10, 10, -40),
    new Vector3(40, 0, -20),
  ];

  const defaultLookAtPoints = [
    new Vector3(-10, 0, -10),
    new Vector3(0, 0, 20),
    new Vector3(30, -5, 0),
    new Vector3(-20, 5, 5),
    new Vector3(-50, 5, 5),
    new Vector3(-0, 0, 0),
    new Vector3(-0, -10, -10),
    new Vector3(-10, -5, -10),
  ];

  const cameraPath = path || defaultPath;
  const cameraLookAt = lookAtPoints || defaultLookAtPoints;

  // Create a smooth CatmullRom curve based on the path
  const pathCurve = new CatmullRomCurve3(cameraPath, true); // true for closed loop
  pathCurve.tension = 0.5; // Smoothness of the curve, 0 is linear, 1 is more bouncy

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current }); // Set your camera as active
      cameraRef.current.updateProjectionMatrix();
    }
  }, [set]);

  useFrame(() => {
    if (cameraRef.current) {
      tRef.current += speed;

      // Use the time tRef.current to get a point along the curve
      const positionOnPath = pathCurve.getPoint(tRef.current % 1); // Wrap around the curve

      // Interpolate the "look at" target
      const lookAtTarget = new Vector3().lerpVectors(
        cameraLookAt[Math.floor(tRef.current) % cameraLookAt.length],
        cameraLookAt[(Math.floor(tRef.current) + 1) % cameraLookAt.length],
        tRef.current % 1
      );

      // Set camera position and orientation
      cameraRef.current.position.copy(positionOnPath);
      cameraRef.current.lookAt(lookAtTarget);

      // Update aspect ratio
      cameraRef.current.aspect = size.width / size.height;
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return (
    <perspectiveCamera
      ref={cameraRef}
      fov={50}
      near={0.1}
      far={1000}
      position={cameraPath[0]} // Initial position
    />
  );
};