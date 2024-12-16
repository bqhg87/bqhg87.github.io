import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./character";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
  // Define constants to replace `useControls`
  const WALK_SPEED = 2.0; // Adjust as needed
  const RUN_SPEED = 2.8;  // Adjust as needed
  const ROTATION_SPEED = degToRad(1.0); // Adjust as needed
  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("idle");

  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);
  
  useEffect(() => {
    const onMouseDown = (e) => {
      isClicking.current = true;
    };
    const onMouseUp = (e) => {
      isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    // touch
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, []);

  useFrame(({ camera, mouse }) => {
    if (rb.current) {
      const vel = rb.current.linvel();
  
      const movement = {
        x: 0,
        z: 0,
      };
  
      // Movement direction based on key controls
      if (get().forward) movement.z = 1;
      if (get().backward) movement.z = -1;
  
      let speed = RUN_SPEED; // Default speed for key controls
  
      if (isClicking.current) {
        // Mouse/touch input handling
        const radius = Math.hypot(mouse.x, mouse.y); // Distance from center
        speed = MathUtils.clamp(radius / 0.1, 0, 1) * RUN_SPEED; // Interpolate speed

        // Update movement direction based on mouse
        if (Math.abs(mouse.x) > 0.1) movement.x = -mouse.x;
        movement.z = mouse.y + 0.4;
      }

      if (get().left) movement.x = 1;
      if (get().right) movement.x = -1;

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }
  
      // Update character velocity and animation
      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) * speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) * speed;
  
        setAnimation(speed === RUN_SPEED ? "run" : "walk");
      } else {
        setAnimation("idle");
      }
  
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );
  
      rb.current.setLinvel(vel, true);
    }

    // CAMERA
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 1);

      camera.lookAt(cameraLookAt.current);
    }
  });


const useCameraCollision = (camera, objects) => {
  const raycaster = new THREE.Raycaster();
  const intersections = new THREE.Vector3();

  useFrame(() => {
    // Cast a ray from the camera position
    raycaster.set(camera.position, camera.getWorldDirection(new THREE.Vector3()));
    const hits = raycaster.intersectObjects(objects);

    if (hits.length > 0) {
      intersections.copy(hits[0].point);
      // Trigger effect
    } else {
      // Reset effect
    }
  });
};

  return (
    <RigidBody colliders={false} lockRotations ref={rb}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={1} position-z={-3} />
        <group ref={character}>
          <Character scale={0.18} position-y={-0.25} animation={animation} />
        </group>
      </group>
      <CapsuleCollider args={[0.08, 0.15]} />
    </RigidBody>
  );
};
