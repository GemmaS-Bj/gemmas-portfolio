import { G_3DHero } from "@/components/3D/G_3DHero"

import Image from "next/image"
import { Hero } from "./_components/sections/Hero"
import { NavBar } from "@/components/layout/NavBar"
export default function Home() {
  return (
    <main className="relative flex flex-col overflow-hidden h-screen p-18">
      <div className="relative h-10 w-47 z-1">
        <Image src={"/icons/Gemmas.svg"} alt="GemmaS logo" fill />
      </div>
      <Hero/>
      <div className="absolute top-0 left-0 z-0">
        <G_3DHero className="" width="145vw" height="100vh" />
      </div>

      <NavBar/>
    </main>
  )
}