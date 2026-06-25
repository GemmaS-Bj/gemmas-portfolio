"use client"
import { ActionButton } from "@/components/ui/ActionButton"
import { RedirectButton } from "@/components/ui/RedirectButton"
import { cn } from "@/utils/cn";
import { ComponentPropsWithRef } from 'react';

interface HeroProps extends ComponentPropsWithRef<"div">{
}

export const HeroContent = ({...props}: HeroProps) => {
    return (<>
        <div className={cn("mt-40 ml-[10%] w-[40%] z-10 text-[24px]")}>
            <h1 className="text-[64px] font-bold tracking-wider mb-20">Your Vision, Built With Technology That Performs</h1>
            {/* <h1 className="text-[64px] font-bold tracking-wide">Built With Technology That Performs</h1> */}
            <div className="flex gap-5">
                <ActionButton variant="green-filled">Book a call</ActionButton>
                <RedirectButton variant="blue-hollow">Portfolio</RedirectButton>
            </div>
        </div>
    </>)
}
