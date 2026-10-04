import React from 'react';
import { motion } from 'framer-motion';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type Variant = 'primary' | 'secondary';

interface BrandPatternProps {
  position?: Position;
  variant?: Variant;
  className?: string;
}

export const BrandPattern: React.FC<BrandPatternProps> = ({ 
  position = 'top-right',
  variant = 'primary',
  className = ''
}) => {
  // Determine positioning classes
  const posClasses = {
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  }[position];

  // Determine colors based on variant
  // primary: Teal & Blue
  // secondary: Teal & Green
  const color1 = variant === 'primary' ? '#6FC4BC' : '#55AE47'; // Teal or Green
  const color2 = variant === 'primary' ? '#11517E' : '#6FC4BC'; // Blue or Teal

  // Spheres generation (semi-circular arrangement)
  const spheres = [
    { cx: 100, cy: 100, r: 60, color: `url(#grad1-${variant})`, delay: 0 },
    { cx: 30, cy: 80, r: 25, color: `url(#grad2-${variant})`, delay: 0.1 },
    { cx: 80, cy: 30, r: 35, color: `url(#grad2-${variant})`, delay: 0.2 },
    { cx: 150, cy: 60, r: 20, color: `url(#grad1-${variant})`, delay: 0.3 },
    { cx: 60, cy: 150, r: 15, color: `url(#grad1-${variant})`, delay: 0.4 },
    { cx: 10, cy: 120, r: 12, color: color1, delay: 0.5 },
    { cx: 120, cy: 10, r: 18, color: color2, delay: 0.6 },
    { cx: 140, cy: 130, r: 10, color: color1, delay: 0.7 },
  ];

  return (
    <div className={`absolute pointer-events-none z-0 opacity-40 ${posClasses} ${className}`}>
      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`grad1-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
          <linearGradient id={`grad2-${variant}`} x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={color2} />
            <stop offset="100%" stopColor={color1} />
          </linearGradient>
        </defs>
        {spheres.map((sphere, i) => (
          <motion.circle
            key={i}
            cx={sphere.cx}
            cy={sphere.cy}
            r={sphere.r}
            fill={sphere.color}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: sphere.delay, ease: "easeOut" }}
          />
        ))}
      </svg>
    </div>
  );
};
