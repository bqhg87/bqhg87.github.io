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
  const MAX_SPEED = 5.2;
  const ROTATION_SPEED = degToRad(1.1); // Adjust as needed
  const rb = useRef();
  const container = useRef();
  const character = useRef();
  const fvAcceleration = 0.05;
  const fvDeceleration = 2*fvAcceleration;
  const fvFBLR = { FB: 0, LR: 0 };
  const fvMax = 1;

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
    const onMouseMove = (e) => {
      console.log("Mouse position:", e.clientX, e.clientY);
    };
  
    document.addEventListener("mousemove", onMouseMove);
  
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  
  useEffect(() => {
    const onMouseDown = (e) => {
      isClicking.current = true;
    };
    const onMouseUp = (e) => {
      isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
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
      const movement = { x: 0, z: 0 };

      if (get().forward === get().backward) {
        if (Math.abs(fvFBLR.FB) < fvDeceleration + 0.0001) {
          fvFBLR.FB = 0
        } else {
        fvFBLR.FB = Math.sign(fvFBLR.FB) * (Math.abs(fvFBLR.FB) - fvDeceleration);
        }
      } else if (get().forward && ((Math.abs(fvFBLR.FB) < fvMax - 0.001) || fvFBLR.FB < 0)) {
        fvFBLR.FB += fvAcceleration;
      } else if (get().backward && ((Math.abs(fvFBLR.FB) < fvMax - 0.001) || fvFBLR.FB > 0)) {
        fvFBLR.FB -= fvAcceleration;
      }
    
      if (get().left === get().right) {
        if (Math.abs(fvFBLR.LR) < fvDeceleration + 0.0001) {
          fvFBLR.LR = 0
        } else {
        fvFBLR.LR = Math.sign(fvFBLR.LR) * (Math.abs(fvFBLR.LR) - fvDeceleration);
        }
      } else if (get().right && ((Math.abs(fvFBLR.LR) < fvMax - 0.001) || fvFBLR.LR < 0)) {
        fvFBLR.LR += fvAcceleration;
      } else if (get().left && ((Math.abs(fvFBLR.LR) < fvMax - 0.001) || fvFBLR.LR > 0)) {
        fvFBLR.LR -= fvAcceleration;
      }  
    
      const speedMod = (Math.hypot(fvFBLR.FB, fvFBLR.LR))/Math.sqrt(2) * 1;

      let diagMod = 1
      if ((get().forward || get().backward) && (get().left || get().right)) {
        diagMod = 0.7;
      } else {diagMod = 1}
  
      let speed = MAX_SPEED * speedMod * diagMod; // Default speed for key controls
  
      if (get().forward) movement.z = fvFBLR.FB;
      if (get().backward) movement.z = fvFBLR.FB;

      if (isClicking.current) {
        // Mouse/touch input handling
        const radius = Math.hypot(mouse.x, (mouse.y + 0.35)); // Distance from center
        speed = MathUtils.clamp(radius / 0.6, 0, 0.6) * MAX_SPEED; // Interpolate speed

        // Update movement direction based on mouse
        if (Math.abs(mouse.x) > 0.0) movement.x = -mouse.x;
        movement.z = (mouse.y + 0.35);
      }

      if (get().left) movement.x = -fvFBLR.LR;
      if (get().right) movement.x = -fvFBLR.LR;

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
  
        setAnimation(speed == (MAX_SPEED) ? "run" : "walk");
      } else {
        setAnimation("idle");
      }
  
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.17
      );
  
      rb.current.setLinvel(vel, true);
    }

    // CAMERA
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.15
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.9);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 1);

      camera.lookAt(cameraLookAt.current);
    }
  });``

  return (
    <RigidBody colliders={false} lockRotations ref={rb} friction={1} linearDamping={2} gravityScale={3}>
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
