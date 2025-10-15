import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Circle } from './Circle';

const GRID_SIZE = 15;
const SCALE_FACTOR = 1;
const NUMBER_OF_CIRCLES = GRID_SIZE * GRID_SIZE;
const GLOW_RADIUS = 150;

function getRandomPosition() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const Landing = () => {
  const [glowPosition, setGlowPosition] = useState(() => getRandomPosition());
  const targetPosition = useRef(getRandomPosition());

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    function animate(time: number) {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      setGlowPosition(pos => {
        const t = 0.02 + dt * 0.5;
        const newX = lerp(pos.x, targetPosition.current.x, t);
        const newY = lerp(pos.y, targetPosition.current.y, t);
        if (
          Math.abs(newX - targetPosition.current.x) < 10 &&
          Math.abs(newY - targetPosition.current.y) < 10
        ) {
          targetPosition.current = getRandomPosition();
        }
        return { x: newX, y: newY };
      });
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Glow and grid background  */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
        <div
          className="absolute h-60 w-60 rounded-full bg-radial from-indigo-200 from-40% to-indigo-700 blur-3xl"
          style={{
            top: glowPosition.y - 100,
            left: glowPosition.x - 100,
          }}
        />
        <div
          className="grid h-full w-full"
          style={{
            transform: `scale(${SCALE_FACTOR})`,
            transformOrigin: 'top left',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {Array.from({ length: NUMBER_OF_CIRCLES }).map((_, index) => (
            <Circle key={index} mousePosition={glowPosition} glowRadius={GLOW_RADIUS} />
          ))}
        </div>
      </div>
      {/* Foreground content */}
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5 }}
          className="bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text p-2 text-5xl font-bold tracking-wide text-transparent drop-shadow-lg lg:text-8xl"
        >
          Daragh Coll
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="max-w-lg px-4 text-lg text-neutral-700 lg:text-2xl"
        >
          Full stack software engineer, specializing in front end development, design and animation
        </motion.p>
      </div>
    </section>
  );
};

export { Landing };
