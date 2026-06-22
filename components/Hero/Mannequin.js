import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Mannequin({ scrollProgress, activeSection }) {
  const clientGroupRef = useRef();
  const barberGroupRef = useRef();
  const chairGroupRef = useRef();

  // Animation values with internal lerping for smooth inertia
  const state = useRef({
    chairRotation: 0,
    clientHeight: 0.35, // sitting height
    thighRotation: -Math.PI / 2, // sitting
    shinRotation: Math.PI / 2, // sitting
    clientZ: 0,
    clientWalkCycle: 0,
    barberArmSwing: 0,
    fadingOut: 0,
  });

  useFrame((stateObj) => {
    const p = scrollProgress; // 0 to 1

    // Step 1: Chair Rotation (from 0 to 0.35 scroll)
    let targetChairRotation = 0;
    if (p <= 0.35) {
      targetChairRotation = (p / 0.35) * Math.PI; // 0 to 180 degrees (Math.PI)
    } else {
      targetChairRotation = Math.PI;
    }

    // Step 2: Client Standing Up & Walking Forward (from 0.35 to 0.75 scroll)
    let targetClientHeight = 0.35;
    let targetThighRotation = -Math.PI / 2;
    let targetShinRotation = Math.PI / 2;
    let targetClientZ = 0;
    let targetWalkCycle = 0;

    if (p > 0.35 && p <= 0.75) {
      const standProgress = (p - 0.35) / 0.4; // 0 to 1
      // Lerp standing height and angles
      targetClientHeight = 0.35 + standProgress * 0.75; // sits at 0.35, stands at 1.10
      targetThighRotation = -Math.PI / 2 + standProgress * (Math.PI / 2); // -90 deg to 0 deg
      targetShinRotation = Math.PI / 2 - standProgress * (Math.PI / 2); // 90 deg to 0 deg
      targetClientZ = standProgress * 2.5; // moves forward 2.5 units
      targetWalkCycle = standProgress * 15; // walk swing frequency
    } else if (p > 0.75) {
      targetClientHeight = 1.10;
      targetThighRotation = 0;
      targetShinRotation = 0;
      // Client continues walking past the camera
      const walkProgress = (p - 0.75) / 0.25; // 0 to 1
      targetClientZ = 2.5 + walkProgress * 2.0; // walks closer
      targetWalkCycle = 15 + walkProgress * 8;
    }

    // Barber's arm cutting animation
    const time = stateObj.clock.getElapsedTime();
    state.current.barberArmSwing = Math.sin(time * 12) * 0.15; // fast scissor/clipping motion

    // Smooth everything out using linear interpolation (lerp) for inertia
    const lerpFactor = 0.08;
    state.current.chairRotation = THREE.MathUtils.lerp(state.current.chairRotation, targetChairRotation, lerpFactor);
    state.current.clientHeight = THREE.MathUtils.lerp(state.current.clientHeight, targetClientHeight, lerpFactor);
    state.current.thighRotation = THREE.MathUtils.lerp(state.current.thighRotation, targetThighRotation, lerpFactor);
    state.current.shinRotation = THREE.MathUtils.lerp(state.current.shinRotation, targetShinRotation, lerpFactor);
    state.current.clientZ = THREE.MathUtils.lerp(state.current.clientZ, targetClientZ, lerpFactor);
    state.current.clientWalkCycle = THREE.MathUtils.lerp(state.current.clientWalkCycle, targetWalkCycle, lerpFactor);

    // Apply translations and rotations to refs
    if (chairGroupRef.current) {
      chairGroupRef.current.rotation.y = state.current.chairRotation;
    }

    if (clientGroupRef.current) {
      // Chair base is parented to scene, client is separate so they can walk away from chair
      // When sitting, client is on the chair. The chair rotates.
      // So if client is sitting (p <= 0.35), they rotate WITH the chair.
      if (p <= 0.35) {
        clientGroupRef.current.position.set(0, state.current.clientHeight, 0);
        clientGroupRef.current.rotation.y = state.current.chairRotation;
      } else {
        // As client stands and walks, they walk straight out facing the camera
        clientGroupRef.current.position.set(0, state.current.clientHeight, state.current.clientZ);
        clientGroupRef.current.rotation.y = Math.PI; // facing camera
      }
    }

    // Barber stands behind and cuts. When client stands up (p > 0.35), barber stays back.
    if (barberGroupRef.current) {
      if (p > 0.35) {
        // Barber lowers hand/rests as client walks away
        barberGroupRef.current.position.y = THREE.MathUtils.lerp(barberGroupRef.current.position.y, 0, 0.05);
      } else {
        barberGroupRef.current.position.y = 0;
      }
    }
  });

  // Materials
  const silverMannequinMaterial = (
    <meshPhysicalMaterial
      color="#e2e8f0"
      metalness={0.9}
      roughness={0.15}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
      envMapIntensity={1.5}
    />
  );

  const bronzeBarberMaterial = (
    <meshPhysicalMaterial
      color="#78716c"
      metalness={0.95}
      roughness={0.2}
      clearcoat={0.8}
      envMapIntensity={1.5}
    />
  );

  const chairMaterial = (
    <meshPhysicalMaterial
      color="#18181b"
      metalness={0.3}
      roughness={0.7}
    />
  );

  const chromeMaterial = (
    <meshPhysicalMaterial
      color="#f4f4f5"
      metalness={1.0}
      roughness={0.05}
    />
  );

  // Walking arm/leg swings computed from walk cycle
  const rightLegSwing = Math.sin(state.current.clientWalkCycle) * 0.4;
  const leftLegSwing = -Math.sin(state.current.clientWalkCycle) * 0.4;
  const rightArmSwing = -Math.sin(state.current.clientWalkCycle) * 0.3;
  const leftArmSwing = Math.sin(state.current.clientWalkCycle) * 0.3;

  return (
    <group>
      {/* 3D SALON CHAIR ASSEMBLY */}
      <group ref={chairGroupRef} position={[0, -1, 0]}>
        {/* Base plate */}
        <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.7, 0.72, 0.1, 32]} />
          {chromeMaterial}
        </mesh>
        {/* Hydraulic post */}
        <mesh castShadow position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
          {chromeMaterial}
        </mesh>
        {/* Seat cushion */}
        <mesh castShadow position={[0, 0.8, 0]}>
          <boxGeometry args={[0.9, 0.15, 0.9]} />
          {chairMaterial}
        </mesh>
        {/* Backrest support (chrome bars) */}
        <mesh castShadow position={[0, 1.25, -0.42]}>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          {chromeMaterial}
        </mesh>
        {/* Backrest cushion */}
        <mesh castShadow position={[0, 1.4, -0.45]}>
          <boxGeometry args={[0.8, 0.6, 0.12]} />
          {chairMaterial}
        </mesh>
        {/* Armrest Left */}
        <group position={[-0.5, 1.1, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.5, 0.8]} />
            {chairMaterial}
          </mesh>
          <mesh castShadow position={[0, 0.25, 0]}>
            <boxGeometry args={[0.1, 0.05, 0.85]} />
            {chromeMaterial}
          </mesh>
        </group>
        {/* Armrest Right */}
        <group position={[0.5, 1.1, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.5, 0.8]} />
            {chairMaterial}
          </mesh>
          <mesh castShadow position={[0, 0.25, 0]}>
            <boxGeometry args={[0.1, 0.05, 0.85]} />
            {chromeMaterial}
          </mesh>
        </group>
        {/* Footrest */}
        <mesh castShadow position={[0, 0.35, 0.6]}>
          <boxGeometry args={[0.6, 0.05, 0.3]} />
          {chromeMaterial}
        </mesh>
      </group>

      {/* CLIENT MANNEQUIN (Stands up and walks) */}
      <group ref={clientGroupRef} position={[0, 0.35, 0]}>
        {/* Hips / Root */}
        <mesh castShadow position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          {silverMannequinMaterial}
        </mesh>

        {/* Torso */}
        <mesh castShadow position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.2, 0.16, 0.7, 16]} />
          {silverMannequinMaterial}
        </mesh>

        {/* Shoulders */}
        <mesh castShadow position={[0, 0.75, 0]}>
          <boxGeometry args={[0.55, 0.1, 0.2]} />
          {silverMannequinMaterial}
        </mesh>

        {/* Neck */}
        <mesh castShadow position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.15, 12]} />
          {silverMannequinMaterial}
        </mesh>

        {/* Head */}
        <mesh castShadow position={[0, 1.05, 0]}>
          <sphereGeometry args={[0.18, 20, 20]} />
          {silverMannequinMaterial}
        </mesh>
        {/* Head details (Hair/Faceted face block for luxury look) */}
        <mesh castShadow position={[0, 1.1, 0.05]}>
          <boxGeometry args={[0.1, 0.1, 0.18]} />
          {chromeMaterial}
        </mesh>

        {/* LEFT LEG ASSEMBLY */}
        <group position={[-0.15, -0.1, 0]}>
          {/* Thigh (Rotates relative to hip) */}
          <group rotation={[scrollProgress > 0.35 ? leftLegSwing : -Math.PI / 2, 0, 0]}>
            <mesh castShadow position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.1, 0.08, 0.45, 12]} />
              {silverMannequinMaterial}
            </mesh>
            {/* Knee Joint */}
            <mesh castShadow position={[0, -0.45, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              {silverMannequinMaterial}
            </mesh>
            {/* Shin (Rotates relative to knee) */}
            <group position={[0, -0.45, 0]} rotation={[scrollProgress > 0.35 ? Math.abs(leftLegSwing) * 0.5 : Math.PI / 2, 0, 0]}>
              <mesh castShadow position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.08, 0.06, 0.45, 12]} />
                {silverMannequinMaterial}
              </mesh>
              {/* Foot */}
              <mesh castShadow position={[0, -0.48, 0.05]}>
                <boxGeometry args={[0.09, 0.06, 0.22]} />
                {chromeMaterial}
              </mesh>
            </group>
          </group>
        </group>

        {/* RIGHT LEG ASSEMBLY */}
        <group position={[0.15, -0.1, 0]}>
          {/* Thigh */}
          <group rotation={[scrollProgress > 0.35 ? rightLegSwing : -Math.PI / 2, 0, 0]}>
            <mesh castShadow position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.1, 0.08, 0.45, 12]} />
              {silverMannequinMaterial}
            </mesh>
            {/* Knee Joint */}
            <mesh castShadow position={[0, -0.45, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              {silverMannequinMaterial}
            </mesh>
            {/* Shin */}
            <group position={[0, -0.45, 0]} rotation={[scrollProgress > 0.35 ? Math.abs(rightLegSwing) * 0.5 : Math.PI / 2, 0, 0]}>
              <mesh castShadow position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.08, 0.06, 0.45, 12]} />
                {silverMannequinMaterial}
              </mesh>
              {/* Foot */}
              <mesh castShadow position={[0, -0.48, 0.05]}>
                <boxGeometry args={[0.09, 0.06, 0.22]} />
                {chromeMaterial}
              </mesh>
            </group>
          </group>
        </group>

        {/* LEFT ARM ASSEMBLY */}
        <group position={[-0.3, 0.7, 0]}>
          <group rotation={[scrollProgress > 0.35 ? leftArmSwing : 0.2, 0, -0.15]}>
            <mesh castShadow position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.4, 12]} />
              {silverMannequinMaterial}
            </mesh>
            {/* Elbow Joint */}
            <mesh castShadow position={[0, -0.4, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              {silverMannequinMaterial}
            </mesh>
            {/* Lower Arm */}
            <group position={[0, -0.4, 0]} rotation={[-0.3, 0, 0]}>
              <mesh castShadow position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.07, 0.06, 0.4, 12]} />
                {silverMannequinMaterial}
              </mesh>
            </group>
          </group>
        </group>

        {/* RIGHT ARM ASSEMBLY */}
        <group position={[0.3, 0.7, 0]}>
          <group rotation={[scrollProgress > 0.35 ? rightArmSwing : 0.2, 0, 0.15]}>
            <mesh castShadow position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.4, 12]} />
              {silverMannequinMaterial}
            </mesh>
            {/* Elbow Joint */}
            <mesh castShadow position={[0, -0.4, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              {silverMannequinMaterial}
            </mesh>
            {/* Lower Arm */}
            <group position={[0, -0.4, 0]} rotation={[-0.3, 0, 0]}>
              <mesh castShadow position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.07, 0.06, 0.4, 12]} />
                {silverMannequinMaterial}
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* BARBER MANNEQUIN (Behind the chair) */}
      <group ref={barberGroupRef} position={[0.45, -1, -0.85]}>
        {/* Hips */}
        <mesh castShadow position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          {bronzeBarberMaterial}
        </mesh>

        {/* Legs (Standing) */}
        <mesh castShadow position={[-0.12, 0.4, 0]}>
          <cylinderGeometry args={[0.09, 0.07, 0.8, 12]} />
          {bronzeBarberMaterial}
        </mesh>
        <mesh castShadow position={[0.12, 0.4, 0]}>
          <cylinderGeometry args={[0.09, 0.07, 0.8, 12]} />
          {bronzeBarberMaterial}
        </mesh>

        {/* Torso */}
        <mesh castShadow position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.22, 0.18, 0.8, 16]} />
          {bronzeBarberMaterial}
        </mesh>

        {/* Shoulders */}
        <mesh castShadow position={[0, 1.6, 0]}>
          <boxGeometry args={[0.6, 0.1, 0.22]} />
          {bronzeBarberMaterial}
        </mesh>

        {/* Head */}
        <mesh castShadow position={[0, 1.9, 0]}>
          <sphereGeometry args={[0.18, 20, 20]} />
          {bronzeBarberMaterial}
        </mesh>

        {/* Left Arm (Standing resting) */}
        <group position={[-0.32, 1.55, 0]} rotation={[0.4, 0, -0.2]}>
          <mesh castShadow position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.08, 0.07, 0.45, 12]} />
            {bronzeBarberMaterial}
          </mesh>
          <mesh castShadow position={[0, -0.45, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            {bronzeBarberMaterial}
          </mesh>
          <mesh castShadow position={[0, -0.65, 0.15]} rotation={[-0.8, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.45, 12]} />
            {bronzeBarberMaterial}
          </mesh>
        </group>

        {/* Right Arm (Holding clippers/scissors - Active cutting) */}
        <group position={[0.32, 1.55, 0]} rotation={[1.1, -0.5, 0.25]}>
          <mesh castShadow position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.08, 0.07, 0.45, 12]} />
            {bronzeBarberMaterial}
          </mesh>
          {/* Elbow Joint */}
          <mesh castShadow position={[0, -0.45, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            {bronzeBarberMaterial}
          </mesh>
          {/* Forearm (Wiggles/swings to cut hair) */}
          <group position={[0, -0.45, 0]} rotation={[state.current.barberArmSwing - 0.4, 0.2, 0]}>
            <mesh castShadow position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.07, 0.06, 0.45, 12]} />
              {bronzeBarberMaterial}
            </mesh>
            {/* Scissor / Clipper tool (polysphere/block with rim neon glow) */}
            <group position={[0, -0.48, 0.02]} rotation={[0.5, 0, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.06, 0.18, 0.06]} />
                {chromeMaterial}
              </mesh>
              {/* Laser clipper glow */}
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.05, 0.02, 0.05]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
