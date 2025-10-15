import { useEffect, useRef, useState } from 'react';

const getElementCenter = (element: HTMLElement): { x: number; y: number } => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

interface CircleProps {
  mousePosition: { x: number; y: number };
  glowRadius: number;
}

const Circle = (props: CircleProps) => {
  const { mousePosition, glowRadius } = props;
  const [isGlowing, setIsGlowing] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    const circleCenter = getElementCenter(circleRef.current);
    const distance = getDistance(mousePosition.x, mousePosition.y, circleCenter.x, circleCenter.y);

    setIsGlowing(distance < glowRadius);
  }, [mousePosition, glowRadius]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        ref={circleRef}
        className={`h-1 w-1 cursor-pointer rounded-full shadow-xl transition-all duration-700 ${
          !isGlowing ? 'bg-neutral-200/90' : 'animate-pulse bg-indigo-400'
        }`}
      />
    </div>
  );
};

export { Circle };
