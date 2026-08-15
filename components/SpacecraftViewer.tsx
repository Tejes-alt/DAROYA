'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { createModelByType } from '@/lib/assets/modelGenerator';
import { motion } from 'framer-motion';

interface SpacecraftViewerProps {
  modelType: string;
  title: string;
  autoRotate?: boolean;
  cameraDistance?: number;
  onClose?: () => void;
}

function SpacecraftModel({ modelType, autoRotate }: { modelType: string; autoRotate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!groupRef.current) return;

    const model = createModelByType(modelType);
    groupRef.current.clear();
    groupRef.current.add(model);

    // Center the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    return () => {
      groupRef.current?.clear();
    };
  }, [modelType]);

  useFrame(() => {
    if (!groupRef.current || !autoRotate) return;
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x += 0.0005;
  });

  return <group ref={groupRef} />;
}

function SpacecraftViewerScene({ modelType, autoRotate = true }: { modelType: string; autoRotate: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 5, 10]} fov={45} />
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        enablePan={true}
        enableZoom={true}
        maxDistance={50}
        minDistance={3}
      />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} />

      {/* Environment */}
      <mesh scale={100} position={[0, 0, -50]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial color="#0a0e14" />
      </mesh>

      <SpacecraftModel modelType={modelType} autoRotate={autoRotate} />
    </>
  );
}

export function SpacecraftViewer({
  modelType,
  title,
  autoRotate = true,
  cameraDistance = 8,
  onClose,
}: SpacecraftViewerProps) {
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const [wireframe, setWireframe] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative h-full w-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black to-transparent">
          <div>
            <h2 className="text-2xl font-light tracking-wide text-white">{title}</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">3D Model Viewer</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close viewer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 3D Canvas */}
        <div className="flex-1 w-full">
          <Canvas className="w-full h-full">
            <SpacecraftViewerScene modelType={modelType} autoRotate={isAutoRotating} />
          </Canvas>
        </div>

        {/* Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-6 py-6">
          <div className="flex items-center gap-4 justify-center">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`px-4 py-2 rounded border text-xs uppercase tracking-wide transition-all ${
                isAutoRotating
                  ? 'border-[#e4a25b] bg-[#e4a25b]/10 text-[#e4a25b]'
                  : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white/80'
              }`}
            >
              {isAutoRotating ? '⏸ Pause' : '▶ Rotate'}
            </button>

            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-4 py-2 rounded border text-xs uppercase tracking-wide transition-all ${
                wireframe
                  ? 'border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]'
                  : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white/80'
              }`}
            >
              {wireframe ? '◉ Solid' : '◯ Wireframe'}
            </button>

            <div className="flex-1" />

            <p className="text-xs text-white/40">Drag to rotate · Scroll to zoom · Right-click to pan</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Inline Spacecraft Viewer - Smaller version for detail panels
 */
export function InlineSpacecraftViewer({
  modelType,
  height = 400,
}: {
  modelType: string;
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full rounded-lg overflow-hidden bg-black/40 border border-white/10">
      <Canvas className="w-full h-full">
        <SpacecraftViewerScene modelType={modelType} autoRotate={true} />
      </Canvas>
    </div>
  );
}
