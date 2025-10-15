import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const pageAreas = ['Home', 'Projects', 'Contact', 'Resume'];

const Navbar = () => {
  const [activeArea, setActiveArea] = useState<string | null>('Home');
  const ignoreScroll = useRef(false);

  const onNavItemClick = (area: string) => {
    setActiveArea(area);
    ignoreScroll.current = true;
    const element = document.getElementById(area.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      ignoreScroll.current = false;
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (ignoreScroll.current) return;

      for (const section of pageAreas) {
        const el = document.getElementById(section.toLowerCase());
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveArea(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 z-20 flex w-full justify-around">
      <motion.ul
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, type: 'spring', stiffness: 100 }}
        className="flex gap-8 rounded-lg bg-neutral-950 p-4 text-neutral-100"
      >
        {pageAreas.map(area => (
          <li
            key={area}
            className={`relative ${activeArea === area ? 'font-bold' : ''}`}
            onClick={() => onNavItemClick(area)}
          >
            <button className="cursor-pointer">{area}</button>
            {activeArea === area && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-indigo-500"
              />
            )}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export { Navbar };
