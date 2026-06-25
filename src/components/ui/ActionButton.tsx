"use client"

import { cn } from "@/utils/cn";
import { useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";

export type ActionButtonVariant =
  | "blue-filled" | "blue-hollow"
  | "green-filled" | "green-hollow"
  | "yellow-filled" | "yellow-hollow"
  | "white-filled" | "white-hollow"
  | "black-filled" | "black-hollow";

const variantClasses: Record<ActionButtonVariant, string> = {
  "blue-filled": "bg-primary   border-primary   text-white",
  "blue-hollow": "border-primary   text-primary",
  "green-filled": "bg-secondary border-secondary text-white",
  "green-hollow": "border-secondary text-secondary",
  "yellow-filled": "bg-tertiary  border-tertiary  text-white",
  "yellow-hollow": "border-tertiary  text-tertiary",
  "white-filled": "bg-white     border-white     text-white",
  "white-hollow": "border-white     text-white",
  "black-filled": "bg-black     border-black     text-white",
  "black-hollow": "border-black     text-black",
};

interface ActionButtonProps {
  variant?: ActionButtonVariant;
  children: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const ActionButton = ({
  variant = "black-hollow",
  children,
  iconPosition = "right",
  icon
}: ActionButtonProps) => {

  const [colorVariant, setColorVariant] = useState(variant);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`${colorVariant} => `)
    colorVariant.includes("hollow") ? setColorVariant(colorVariant.replace("hollow", "filled") as ActionButtonVariant) : setColorVariant(colorVariant.replace("filled", "hollow") as ActionButtonVariant)
    console.log(`${colorVariant}`)
  }
  return (
    <button onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={() => (setColorVariant(variant))} className={cn(
      "flex justify-between items-center gap-2 px-5 py-2 w-fit border-3 rounded-full transition-all duration-300",
      variantClasses[colorVariant],
    )}>
      {(icon && iconPosition === "left") && icon}
      <span style={{ pointerEvents: 'none' }}>{children}</span>
      {(icon && iconPosition === "right") && icon}
    </button>
  );
};
