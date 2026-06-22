import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import Mannequin from "./Mannequin";

// Camera rig that rotates and moves the camera based on scroll progress
function CameraController({ scrollProgress }) {
  useFrame((state) => {
    const p = scrollProgress; // 0 to 1

    // Camera paths based on scroll
    let targetX = 0;
    let targetY = 1.2;
    let targetZ = 3.6; // initial camera distance

    let lookAtX = 0;
    let lookAtY = 0.6;
    let lookAtZ = 0;

    if (p <= 0.35) {
      // Phase 1: Chair rotating, camera circles client slightly (from side-front to front)
      const angle = 0.6 - (p / 0.35) * 0.6; // subtle panning angle
      targetX = Math.sin(angle) * 3.8;
      targetZ = Math.cos(angle) * 3.8;
      targetY = 0.9 + p * 0.6; // lifts camera up slightly
      lookAtY = 0.5 + p * 0.3;
    } else if (p > 0.35 && p <= 0.75) {
      // Phase 2: Client standing up and walking. Camera backs up and moves low to make the mannequin look heroic
      const standProgress = (p - 0.35) / 0.4; // 0 to 1
      targetX = 0;
      targetY = 1.5 - standProgress * 0.7; // moves lower (hero angle)
      targetZ = 3.8 + standProgress * 0.4; // backs up slightly
      lookAtY = 0.8 + standProgress * 0.35; // focuses on standing client chest/face
      lookAtZ = standProgress * 2.2; // follows client walk forward
    } else {
      // Phase 3: Client walks close to the lens. Camera tilts up drastically.
      const closeProgress = (p - 0.75) / 0.25; // 0 to 1
      targetX = 0;
      targetY = 0.8 - closeProgress * 0.4; // drops down
      targetZ = 4.2 - closeProgress * 1.5; // camera zooms very close
      lookAtY = 1.15; // looking up at head
      lookAtZ = 2.5 + closeProgress * 2.0; // tracks client walking past camera
    }

    // Lerp camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.08);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);

    // Update camera lookAt
    const targetLookAt = new THREE.Vector3(lookAtX, lookAtY, lookAtZ);
    // Directly update internal lookAt matrix rotation
    const m1 = new THREE.Matrix4();
    m1.lookAt(state.camera.position, targetLookAt, new THREE.Vector3(0, 1, 0));
    state.camera.quaternion.setFromRotationMatrix(m1);
  });

  return null;
}

// Floating hair & luxury ambient particles
function HairParticles({ count = 120 }) {
  const pointsRef = useRef();

  // Generate particle positions
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Positioned in a box around the chair/client
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = Math.random() * 3 - 0.5; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4; // z
      sp[i] = 0.005 + Math.random() * 0.01; // fall speed
    }
    return [pos, sp];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      // Particles drift downwards (falling hair/ambient light dust)
      array[i * 3 + 1] -= speeds[i];
      // Wind drift
      array[i * 3] += Math.sin(array[i * 3 + 1] * 2 + i) * 0.002;

      // Reset when particle goes too low
      if (array[i * 3 + 1] < -0.6) {
        array[i * 3 + 1] = 2.4;
        array[i * 3] = (Math.random() - 0.5) * 4;
        array[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a1a1aa"
        size={0.03}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Background environment details (Smart Mirror and Luxury Room Outline)
function SalonEnvironment({ scrollProgress }) {
  const mirrorRef = useRef();

  useFrame((state) => {
    if (mirrorRef.current) {
      // Mirror pulses with digital neon details
      const time = state.clock.getElapsedTime();
      const pulse = 0.85 + Math.sin(time * 2) * 0.15;
      mirrorRef.current.material.emissiveIntensity = pulse * 0.45;
    }
  });

  return (
    <group>
      {/* Smart Mirror Frame (Large vertical rectangle behind chair, at z = -1.25) */}
      <group position={[0, 0.5, -1.2]}>
        {/* Glow backing */}
        <mesh ref={mirrorRef}>
          <planeGeometry args={[1.8, 2.5]} />
          <meshStandardMaterial
            color="#121212"
            roughness={0.1}
            metalness={0.9}
            emissive="#ffffff"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Mirror Frame Outline */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[1.85, 2.55, 0.02]} />
          <meshStandardMaterial
            color="#080808"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Digital Mirror Overlay Graphics (neon ring) */}
        <mesh position={[0, 0.7, 0.02]}>
          <ringGeometry args={[0.3, 0.31, 64]} />
          <meshBasicMaterial color="#d4d4d8" transparent opacity={0.6} />
        </mesh>
        {/* Grid floor outline */}
        <gridHelper args={[20, 20, "#222222", "#111111"]} position={[0, -1.5, 1.2]} />
      </group>

      {/* Side Glowing Neon Pillars for Atmospheric Lighting */}
      <mesh position={[-2.4, 0.8, -1.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3.2, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[2.4, 0.8, -1.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3.2, 8]} />
        <meshBasicMaterial color="#52525b" />
      </mesh>
    </group>
  );
}

export default function SalonScene({ scrollProgress }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-zinc-700 font-mono text-xs uppercase tracking-widest animate-pulse">Initializing Scene...</div>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.2, 3.6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#000000"]} />
      
      {/* Luxury Atmospheric Lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Spotlight directly overhead the salon chair */}
      <spotLight
        position={[0, 4, 0]}
        angle={0.45}
        penumbra={0.8}
        intensity={2.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Front fill light */}
      <directionalLight
        position={[2, 2, 4]}
        intensity={0.8}
        color="#ffffff"
      />

      {/* Soft blue-purple backlight for futuristic tech accent */}
      <directionalLight
        position={[-3, 1, -2]}
        intensity={0.7}
        color="#d4d4d8"
      />

      {/* 3D Scene Elements */}
      <SalonEnvironment scrollProgress={scrollProgress} />
      
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.08}>
        <Mannequin scrollProgress={scrollProgress} />
      </Float>

      <HairParticles count={150} />

      {/* Camera Controller & Environment Mapping */}
      <CameraController scrollProgress={scrollProgress} />
      <Environment preset="studio" /> {/* Drei default studio environment */}
    </Canvas>
  );
}
