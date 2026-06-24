import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';

interface SplashProps {
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds total for smooth fade in/out
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center overflow-hidden z-50">
      {/* Subtle engineering blueprint-like grid background for a tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #1F2937 1px, transparent 0),
            linear-gradient(to right, #1F2937 1px, transparent 1px),
            linear-gradient(to bottom, #1F2937 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
        }}
      />
      
      {/* Ambient glowing orange backlight behind logo */}
      <div className="absolute w-96 h-96 bg-orange-200/25 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <Logo variant="full" height={100} />
        
        {/* Loading line indicator below */}
        <div className="w-48 h-1 bg-gray-200 rounded-full mt-10 overflow-hidden relative">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};
