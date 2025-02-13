'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmojiOverlayProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'small' | 'medium' | 'large';
  emoji?: string;
  rotation?: number;
  offset?: { x: number; y: number };
}

const EmojiOverlay: React.FC<EmojiOverlayProps> = ({
  position = 'top-right',
  size = 'large',
  emoji = '💖',
  rotation = -15, // เพิ่มค่าเริ่มต้นการหมุน -15 องศา
  offset = { x: 35, y: -30 } // เพิ่มค่า offset เริ่มต้น
}) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const positionClasses = {
    'top-left': 'top-4 left-[-4rem]',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-[-4rem] left-[-4rem]',
    'bottom-right': 'bottom-[-4rem] right-4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  const sizeClasses = {
    small: 'text-3xl',
    medium: 'text-5xl',
    large: 'text-7xl'
  };

  const handleClick = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 100 - 50,
      y: Math.random() * -100 - 50
    };
    
    setHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 1000);
  };

  return (
    <div 
      className={`absolute ${positionClasses[position]} z-50`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)` // เพิ่ม offset
      }}
    >
      <motion.div
        className={`cursor-pointer ${sizeClasses[size]} select-none`}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ 
          transform: `rotate(${rotation}deg)` // เพิ่มการหมุน
        }}
      >
        {emoji}
      </motion.div>

      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className={`absolute ${sizeClasses[size]} pointer-events-none`}
            initial={{ scale: 0.5, opacity: 1, rotate: rotation }} // เพิ่มการหมุนให้ hearts ที่เด้งขึ้นมาด้วย
            animate={{
              x: heart.x,
              y: heart.y,
              scale: 1.5,
              opacity: 0,
              rotate: rotation + Math.random() * 30 - 15 // เพิ่มการหมุนแบบสุ่มเพิ่มเติม
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut'
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmojiOverlay;