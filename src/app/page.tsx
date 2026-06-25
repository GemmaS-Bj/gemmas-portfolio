import { G_3DHero } from "@/components/3D/G_3DHero"

import Image from "next/image"
import { HeroContent } from "./_components/hero/HeroContent"
import { NavBar } from "@/components/layout/NavBar"
import { Hero } from "./_components/hero/Hero"
export default function Home() {
  return (
    <main className="relative flex flex-col overflow-hidden h-screen p-18">
      <Hero/>
      <NavBar/>
    </main>
  )
}