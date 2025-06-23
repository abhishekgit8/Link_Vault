"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { Suspense } from "react";

function AnimatedCube() {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div style={{ width: "100%", height: "340px", margin: "0 auto" }}>
      <Canvas camera={{ position: [4, 3, 6], fov: 38 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 8, 4]} intensity={0.8} castShadow />
        <Suspense fallback={null}>
          <AnimatedCube />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.8} />
      </Canvas>
    </div>
  );
}
