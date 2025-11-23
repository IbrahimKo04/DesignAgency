import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, Float } from '@react-three/drei'
import { MathUtils } from 'three'

function InteractiveShape() {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return

    // Mouse interaction: rotate based on mouse position
    const targetRotationY = state.mouse.x * 0.5
    const targetRotationX = -state.mouse.y * 0.5

    // Smoothly interpolate rotation
    meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1)
    meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1)
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Icosahedron args={[1, 0]} ref={meshRef}>
        <meshStandardMaterial
          color="cyan" // You can adjust this color to match your theme better if needed
          roughness={0.3}
          metalness={0.8}
          wireframe
        />
      </Icosahedron>
    </Float>
  )
}

export const AboutScene = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="magenta" />
        <Suspense fallback={null}>
          <InteractiveShape />
        </Suspense>
      </Canvas>
    </div>
  )
}