"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float, PerspectiveCamera, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function SparkSwarm({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    pointsRef.current.rotation.y += 0.0005;
    pointsRef.current.rotation.x += 0.0002;

    const targetX = (mouse.x * viewport.width) / 20;
    const targetY = (mouse.y * viewport.height) / 20;
    
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.02);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.02);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF5F1F"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

function RotatingIcon({ scale }: { scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/2.png");
  
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function SparksCanvas() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldRender(!mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setShouldRender(!e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!shouldRender) return <div className="absolute inset-0 bg-background z-0" />;

  const particleCount = isMobile ? 800 : 2000;
  const iconScale = isMobile ? 2 : 3;
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={dpr}
      >
        <color attach="background" args={["#0A0A0A"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1.5} />
        
        <React.Suspense fallback={null}>
          <SparkSwarm count={particleCount} />
          <RotatingIcon scale={iconScale} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
