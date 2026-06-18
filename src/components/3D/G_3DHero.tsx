"use client"

import { RootState, useFrame } from "@react-three/fiber"
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"
import { ACESFilmicToneMapping, Light, SRGBColorSpace } from "three"
import { GHeroModel } from "./GHeroModel"

const PLANE_Z = -1

function AnimatedLight() {
  const lightRef = useRef<Light>(null)

  useFrame((state: RootState) => {
    if (!lightRef.current) return
    const elapsed = state.clock.elapsedTime
    lightRef.current.position.x = - Math.sin(elapsed * 0.6) * 10 + 10
  })

  return (
    <directionalLight
      intensity={2}
      position={[-20, 0, 50]}
      color="white"
      ref={lightRef}
    />
  )
}

function LightWithHelper() {
  const lightRef = useRef<Light>(null)

  useFrame((state: RootState) => {
    if (!lightRef.current) return
    const elapsed = state.clock.elapsedTime
    lightRef.current.position.x = - Math.sin(elapsed * 0.6) * 10 + 10
  })

  return (
    <directionalLight
      intensity={3}
      position={[-20, 2, 10]}
      color="white"
      ref={lightRef}
      castShadow
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-camera-near={0.1}
      shadow-camera-far={40}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
      shadow-bias={-0.001}
    />
  )
}

export const G_3DHero = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        outputColorSpace: SRGBColorSpace,
      }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.15} />
      <AnimatedLight />
      <LightWithHelper />
      <mesh position={[0, 0, PLANE_Z]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <GHeroModel position={[0, 0, PLANE_Z]} scale={0.5} />
    </Canvas>
  )
}
