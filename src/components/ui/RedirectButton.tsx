import { cn } from "@/utils/cn";
import { LuArrowUpRight } from "react-icons/lu";
import { ActionButton, ActionButtonVariant } from "./ActionButton";

interface RedirectButtonProps {
  variant?: ActionButtonVariant;
  children: string;
  iconPosition?: "left" | "right";
}

export const RedirectButton = ({
  children,
  variant
}: RedirectButtonProps) => {

  const icon = <LuArrowUpRight />;

  return (
    <ActionButton variant={variant} icon={icon}>
      {children}
    </ActionButton>
  );
};
