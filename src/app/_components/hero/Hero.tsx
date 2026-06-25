import Image from 'next/image'
import { HeroContent } from './HeroContent'
import { G_3DHero } from '@/components/3D/G_3DHero'

export const Hero = () => {
    return (<>
    <div className="relative h-10 w-47 z-1">
        <Image src={"/icons/Gemmas.svg"} alt="GemmaS logo" fill />
      </div>
      <HeroContent/>
      <div className="absolute top-0 left-0 z-0">
        <G_3DHero className="" width="145vw" height="100vh" />
      </div>
    </>)
}
