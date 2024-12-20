import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, CatmullRomCurve3, Euler } from "three";

export const IntroCamera = ({ speed = 0.003, path, lookAtPoints }) => {
  const cameraRef = useRef();
  const tRef = useRef(0);
  const { set, size } = useThree();

  // State to track mouse movement
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Default path and look-at points if none are provided
  const defaultPath = [
    new Vector3(-20, 0, 30),
    new Vector3(-10, 7, 20),
    new Vector3(0, 4, 0),
  ];

  const defaultLookAtPoints = [
    new Vector3(0, 0, -50),
    new Vector3(0, 0, -50),
    new Vector3(-15, 0, -30),
  ];

  const cameraPath = path || defaultPath;
  const cameraLookAt = lookAtPoints || defaultLookAtPoints;

  // Create smooth CatmullRom curves for path and look-at points
  const pathCurve = new CatmullRomCurve3(cameraPath, false);
  const lookAtCurve = new CatmullRomCurve3(cameraLookAt, false);

  pathCurve.tension = 0.5;
  lookAtCurve.tension = 0.5;

  // Ensure that the camera is properly set when it's mounted
  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current }); // Set your camera as active
      cameraRef.current.updateProjectionMatrix();
    }
  }, [set]);

  // Handle mouse movement for camera responsiveness
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize x to [-1, 1]
      const y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize y to [-1, 1]
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (cameraRef.current) {
      // Only update the camera's position until tRef reaches 1
      if (tRef.current < 1) {
        tRef.current = Math.min(tRef.current + speed, 1);

        // Use the normalized time tRef.current to interpolate both curves
        const positionOnPath = pathCurve.getPoint(tRef.current); // Camera position
        const lookAtTarget = lookAtCurve.getPoint(tRef.current); // Look-at target

        // Set camera position and orientation
        cameraRef.current.position.copy(positionOnPath);
        cameraRef.current.lookAt(lookAtTarget);

        // Update aspect ratio (in case the window is resized)
        cameraRef.current.aspect = size.width / size.height;
        cameraRef.current.updateProjectionMatrix();
      }

      // After the camera reaches the end, keep it at the final position and maintain the lookAt
      if (tRef.current === 1) {
        // Ensure the camera stays fixed in the final position, but can still be resized
        const finalPosition = pathCurve.getPoint(1);
        const finalLookAt = lookAtCurve.getPoint(1);
        cameraRef.current.position.copy(finalPosition);
        cameraRef.current.lookAt(finalLookAt);

        // Smoothly adjust the camera's rotation based on mouse movement
        const rotationSpeed = 0.05; // Adjust the speed of the rotation change
        const targetRotation = new Euler(
          mouse.y * Math.PI * 0.1, // Vertical movement influences pitch
          mouse.x * Math.PI * 0.1, // Horizontal movement influences yaw
          0,
          "XYZ"
        );

        // Smoothly interpolate between current and target rotation
        cameraRef.current.rotation.x = cameraRef.current.rotation.x + (targetRotation.x - cameraRef.current.rotation.x) * rotationSpeed;
        cameraRef.current.rotation.y = cameraRef.current.rotation.y + (targetRotation.y - cameraRef.current.rotation.y) * rotationSpeed;
      }
    }
  });

  return (
    <perspectiveCamera
      ref={cameraRef}
      fov={50}
      near={0.1}
      far={1000}
      position={cameraPath[0]} // Initial position (start of the path)
    />
  );
};