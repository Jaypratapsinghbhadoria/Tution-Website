import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { type Mesh, type MeshStandardMaterial, Color, type Group } from "three"
import { Text, RoundedBox } from "@react-three/drei"

export default function SimpleBook() {
  const bookRef = useRef<Group>(null)
  const coverRef = useRef<Mesh>(null)
  const materialRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      bookRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (materialRef.current) {
      const hue = (Math.sin(state.clock.elapsedTime * 0.1) + 1) / 2
      materialRef.current.color.setHSL(hue, 0.5, 0.5)
    }
    if (coverRef.current) {
      coverRef.current.rotation.y = -bookRef.current!.rotation.y
      coverRef.current.rotation.x = -bookRef.current!.rotation.x
    }
  })

  return (
    <group ref={bookRef}>
      <RoundedBox args={[3, 4, 0.5]} radius={0.1} smoothness={4}>
        <meshStandardMaterial ref={materialRef} color="#4B5563" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <group ref={coverRef} position={[0, 0, 0.251]}>
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          Foundation
        </Text>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          First
        </Text>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
        >
          The Future of Learning
        </Text>
      </group>
    </group>
  )
}

