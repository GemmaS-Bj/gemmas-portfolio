"use client"

import { useGLTF } from '@react-three/drei'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { BufferGeometry, Color, Group, Material, Mesh, MeshStandardMaterial } from 'three'

const GLB_PATH = '/3D/GHeroSceneNoBg-transformed.glb'
const HOVER_COLOR = new Color('#4F679E')

type GLTFResult = {
  nodes: {
    Boolean: { geometry: BufferGeometry }   // GBar
    Cylinder: { geometry: BufferGeometry }  // GBowl
    Cylinder_4: { geometry: BufferGeometry } // GCylinder
  }
  materials: {
    'Material.002': Material   // GreenColor
    'Material_0.002': Material // WhiteColor
    'Material.001': Material   // YellowColor
  }
}

export function GHeroModel(props: ThreeElements['group']) {
  const { nodes: _nodes, materials: _materials } = useGLTF(GLB_PATH) as unknown as GLTFResult

  const nodes = {
    GBar:      _nodes.Boolean,
    GBowl:     _nodes.Cylinder,
    GCylinder: _nodes.Cylinder_4,
  }
  const materials = {
    GreenColor: _materials['Material.002'],
    WhiteColor:  _materials['Material_0.002'],
    YellowColor: _materials['Material.001'],
  }
  const groupRef = useRef<Group>(null)
  const cylinder4Ref = useRef<Mesh>(null)
  const hovered = useRef(false)
  const originalColor = useRef(new Color())
  const originalRoughness = useRef(1)
  const originalMetalness = useRef(0)

  // Smooth normals sur tous les meshes
  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.traverse((child) => {
      if (!(child instanceof Mesh)) return
      child.castShadow = true
      child.geometry.computeVertexNormals()
      if (child.material instanceof MeshStandardMaterial) {
        child.material.flatShading = false
        child.material.roughness = 2
        child.material.metalness = 0.1
        child.material.needsUpdate = true
      }
    })
  }, [])

  // Clone le matériau de Cylinder_4 pour ne pas toucher aux autres meshes qui le partagent
  useEffect(() => {
    if (!cylinder4Ref.current) return
    const cloned = (cylinder4Ref.current.material as MeshStandardMaterial).clone()
    cylinder4Ref.current.material = cloned
    originalColor.current.copy(cloned.color)
    originalRoughness.current = cloned.roughness
    originalMetalness.current = cloned.metalness
  }, [])

  // Lerp de couleur à chaque frame (~300ms de transition)
  useFrame((_, delta) => {
    if (!cylinder4Ref.current) return
    const mat = cylinder4Ref.current.material as MeshStandardMaterial
    const t = delta * 8
    const isHovered = hovered.current
    mat.color.lerp(isHovered ? HOVER_COLOR : originalColor.current, t)
    mat.roughness += ((isHovered ? 0.8 : originalRoughness.current) - mat.roughness) * t
    mat.metalness += ((isHovered ? 0.5  : originalMetalness.current) - mat.metalness) * t
  })

  return (
    <group
      ref={groupRef}
      dispose={null}
      onPointerEnter={() => { hovered.current = true; document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { hovered.current = false; document.body.style.cursor = 'auto' }}
      {...props}
    >
      <mesh geometry={nodes.GBar.geometry}      material={materials.GreenColor} position={[1.285, -0.144, 1]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh ref={cylinder4Ref} geometry={nodes.GBowl.geometry}     material={materials.WhiteColor}  position={[0, 0, 1]} rotation={[Math.PI / 2, 1.522, Math.PI]} scale={0.01} />
      <mesh geometry={nodes.GCylinder.geometry} material={materials.YellowColor} position={[1.951, 1.921, 1]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    </group>
  )
}

useGLTF.preload(GLB_PATH)
