'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

interface FloatingHeartProps {
  position: number;
  onComplete: () => void;
}

interface HeartType {
  id: number;
  position: number;
}

const FloatingHeart: React.FC<FloatingHeartProps> = ({ position, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500); // เพิ่มเวลาให้นานขึ้นเพื่อให้เห็น animation ชัดขึ้น
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="absolute animate-float-up pointer-events-none"
      style={{ 
        left: `${position}px`,
        bottom: '0px', // เริ่มจากด้านหลัง input
        transform: 'translateZ(-1px)' // ให้อยู่ด้านหลัง input
      }}
    >
      <Heart 
        className="text-pink-400 animate-pulse" 
        size={24} // เพิ่มขนาดหัวใจให้ใหญ่ขึ้นนิดหน่อย
        fill="currentColor" 
      />
    </div>
  );
};

export default function Home() {
  const [name, setName] = useState<string>('');
  const [hearts, setHearts] = useState<HeartType[]>([]);
  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && name.trim()) {
      router.push(`/questions?name=${encodeURIComponent(name)}`);
    }

    const inputRect = e.currentTarget.getBoundingClientRect();
    const position = Math.random() * (inputRect.width - 24); // ปรับตามขนาดหัวใจ
    
    const newHeart: HeartType = {
      id: Date.now(),
      position: position,
    };
    
    setHearts(prev => [...prev, newHeart]);
  };

  const removeHeart = (heartId: number): void => {
    setHearts(prev => prev.filter(heart => heart.id !== heartId));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <div className="text-pink-500 text-2xl mb-6 font-medium">
        จะให้เค้าเรียกเธอว่าอะไรดีคะ คนเก่ง?
      </div>
      <div className="relative">
        <input 
          type="text" 
          placeholder="ใส่ชื่อของเธอตรงนี้ๆๆๆ!"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-6 py-3 text-lg border-2 border-pink-400 rounded-full w-80 text-center outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition-all duration-300 relative z-10"
        />
        {hearts.map(heart => (
          <FloatingHeart
            key={heart.id}
            position={heart.position}
            onComplete={() => removeHeart(heart.id)}
          />
        ))}
      </div>
    </div>
  );
}