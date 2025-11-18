import React, { useRef, Suspense, useMemo } from 'react' // Import useMemo
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus, Cone } from '@react-three/drei'
import { MathUtils, Color } from 'three' // Import Color

// FloatingShape component is unchanged
function FloatingShape({ children, position, rotationSpeed = 0.5 }) {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * rotationSpeed * 0.2
    ref.current.rotation.y += delta * rotationSpeed * 0.3
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
  })
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  )
}

// Accept isDark prop
function SceneContainer({ isDark }) {
  const groupRef = useRef()

  // 1. Define colors based on theme
  // useMemo re-calculates these only when isDark changes
  const colors = useMemo(() => {
    if (isDark) {
      return {
        box: new Color('hsl(220, 20%, 14%)'),
        sphere: new Color('hsl(190, 90%, 55%)'),
        torus: new Color('#FF00FF'),
        cone: new Color('hsl(190, 90%, 70%)'),
        sphereEmissive: new Color('hsl(190, 90%, 55%)')
      };
    } else {
      // Define light mode colors (using values from index.css)
      return {
        box: new Color('hsl(220, 15%, 96%)'), // light muted
        sphere: new Color('hsl(190, 90%, 45%)'), // light primary
        torus: new Color('#FF00FF'), // keep magenta
        cone: new Color('hsl(190, 90%, 60%)'), // light primary-glow
        sphereEmissive: new Color('hsl(190, 90%, 45%)')
      };
    }
  }, [isDark]);

  // 2. Mouse move logic (unchanged)
  useFrame((state, delta) => {
    const targetRotationY = state.mouse.x * 0.3
    const targetRotationX = -state.mouse.y * 0.3
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05)
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05)
  })

  return (
    <group ref={groupRef}>
      {/* 3. Also change light intensity based on theme */}
      <ambientLight intensity={isDark ? 2 : 1.5} />
      <directionalLight
        position={[5, 10, 7.5]}
        intensity={isDark ? 3.5 : 2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* 4. Apply new reactive colors */}
      <FloatingShape position={[-1.5, 0.5, 0]} rotationSpeed={0.2}>
        <Box args={[1, 1, 1]} castShadow receiveShadow>
          <meshStandardMaterial 
            color={colors.box} // <-- Use reactive color
            roughness={0.7} 
            metalness={0.1} 
          />
        </Box>
      </FloatingShape>

      <FloatingShape position={[1.2, -0.2, 1]} rotationSpeed={0.4}>
        <Sphere args={[0.7, 32, 32]} castShadow receiveShadow>
          <meshStandardMaterial 
            color={colors.sphere} // <-- Use reactive color
            roughness={0.1} 
            metalness={0.2} 
            emissive={colors.sphereEmissive} // <-- Use reactive color
            emissiveIntensity={0.2}
          />
        </Sphere>
      </FloatingShape>

      <FloatingShape position={[2, 0.8, -1]} rotationSpeed={0.3}>
        <Torus args={[0.6, 0.2, 16, 100]} castShadow receiveShadow>
          <meshStandardMaterial 
            color={colors.torus} // <-- Use reactive color
            roughness={0.5} 
            metalness={0.1} 
          />
        </Torus>
      </FloatingShape>
      
      <FloatingShape position={[-0.5, -1.2, 0.5]} rotationSpeed={0.5}>
        <Cone args={[0.5, 1.2, 32]} castShadow receiveShadow>
          <meshStandardMaterial 
            color={colors.cone} // <-- Use reactive color
            roughness={0.4} 
            metalness={0.1} 
          />
        </Cone>
      </FloatingShape>
    </group>
  )
}

// Accept isDark and pass it down
export const HeroScene = ({ isDark }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      shadows
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.7 }}
    >
      <Suspense fallback={null}>
        {/* Pass isDark to the SceneContainer */}
        <SceneContainer isDark={isDark} />
      </Suspense>
    </Canvas>
  )
}