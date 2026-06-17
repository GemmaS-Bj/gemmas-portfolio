"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";

type Props = {
  size: number;
  style?: CSSProperties;
  className?: string;
};

// Empreinte interactive : on peut la faire tourner sur les axes X et Y comme une boule.
export default function Fingerprint3D({ size, style, className }: Props) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const last = useRef({ x: 0, y: 0 });

  function handleDown(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    // Sensibilité : 0.6° par pixel — bon compromis pour ressentir la "boule"
    setRot((r) => ({ x: r.x - dy * 0.6, y: r.y + dx * 0.6 }));
  }

  function handleUp(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  return (
    <div
      className={className}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      role="img"
      aria-label="Empreinte digitale interactive — cliquez et glissez pour tourner"
      style={{
        width: size,
        height: size,
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "none",
        perspective: 600,
        // Animation d'entrée — pop-in
        animation: "pop-in 0.6s ease-out backwards",
        ...style,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transformStyle: "preserve-3d",
          transition: dragging ? "none" : "transform 0.4s ease-out",
          willChange: "transform",
        }}
      >
        <Image
          src="/icons/Fingerprint.svg"
          alt=""
          width={size}
          height={size}
          priority
          draggable={false}
          style={{
            width: size,
            height: size,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
