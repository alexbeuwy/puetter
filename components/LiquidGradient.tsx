"use client";

import { GrainGradient } from "@paper-design/shaders-react";

type Props = {
  className?: string;
  speed?: number;
  scale?: number;
  softness?: number;
  intensity?: number;
  noise?: number;
  colors?: string[];
  style?: React.CSSProperties;
};

/**
 * Wrapper around Paper Design's GrainGradient — the same shader
 * family Framer uses for its "Liquid Gradient" preset. Default
 * settings match the Framer Liquid Gradient:
 *   speed 0.21, scale 1.5 (internal), softness 0.51 (frequency),
 *   intensity 0.6 (amplitude), noise 0.05 (grain), 5 colors.
 */
export default function LiquidGradient({
  className,
  speed = 0.21,
  scale = 1.5,
  softness = 0.51,
  intensity = 0.6,
  noise = 0.05,
  colors = ["#0051FF", "#4DFF00", "#FFE500", "#FF6F00", "#0051FF"],
  style,
}: Props) {
  return (
    <GrainGradient
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
      colors={colors}
      colorBack="#00000000"
      shape="wave"
      softness={softness}
      intensity={intensity}
      noise={noise}
      speed={speed}
      scale={scale}
      rotation={0}
      offsetX={0}
      offsetY={0}
    />
  );
}
