'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';
import { Heart } from 'lucide-react';
import EmojiOverlay from '../components/EmojiOverlay';
import Image from 'next/image';
interface Answer {
    question: string;
    answer: string;
}

interface AnswersMap {
    [key: number]: Answer;
}

function Content() {
  const searchParams = useSearchParams();
  const name = searchParams?.get('name') || '';
  const answersRaw = searchParams?.get('answers') || '{}';
  const answers: AnswersMap = JSON.parse(answersRaw);

  const [audio] = useState(
    typeof window !== 'undefined' ? new Audio('/audio/song-bg.wav') : null
  );

  const [currentVideo, setCurrentVideo] = useState(1);

  useEffect(() => {
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [audio]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev % 4) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const sections = [
    {
      id: 1,
      content: (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-6">
           นี่~ ขอบคุณ{name}นะคะ ❤️
          </h1>
          <p className="text-2xl text-pink-500">
            ขอบคุณที่ตอบคำถามของเค้าจนครบทุกข้อเลยนะ
          </p>
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div className="text-center">
          <h2 className="text-3xl text-pink-600 mb-6">
            เธอรู้มั้ย...
          </h2>
          <p className="text-xl text-pink-500">
            ทุกครั้งที่เค้าได้เจอเธอ ได้อยู่กับเธอ เค้ารู้สึกดีมากๆเลยนะคะ
          </p>
        </div>
      )
    },
    {
        id: 3,
        content: (
          <div className="text-center">
            <h2 className="text-3xl text-pink-600 mb-6">
              เค้ารู้สึกว่าเค้าโชคดีมากที่ได้เจอคนที่ชื่อ {name} ❤️
            </h2>
            <p className="text-xl text-pink-500">
              เธอเป็นคนที่ทำให้เค้ายิ้มได้ตลอด ชอบมาปลอบใจเค้าตลอดเวลาที่เค้ารู้สึกแย่
            </p>
          </div>
        )
      },
      {
        id: 4,
        content: (
          <div className="text-center">
            <h2 className="text-3xl text-pink-600 mb-6">
              เค้ารู้แน่ๆว่าในคำตอบที่เธอตอบเมื่อกี้❤️
            </h2>
            <p className="text-xl text-pink-500">
              เธอตั้งใจตอบในทุกๆข้อเลย เค้ารู้ว่าเธอเป็นคนน่ารักกับเค้าตลอดเลย
            </p>
          </div>
        )
      }
    // เพิ่ม sections ตามต้องการ
  ];

  return (
    
    <div ref={containerRef} className="min-h-screen bg-pink-50">
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          className="min-h-screen flex items-center justify-center p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {section.content}
        </motion.section>
      ))}

{/* Section 1: Text Left, Image Right */}
<motion.section
  className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-pink-50"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <motion.div 
      className="text-left"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Heart className="text-pink-500 w-16 h-16 mb-6" fill="currentColor" />
      </motion.div>
      <h2 className="text-4xl font-bold text-pink-600 mb-4">
        และนี่คือคนน่ารักของเค้า ชื่อ{name}!
      </h2>
      <p className="text-xl text-pink-500">
        เป็นคนที่น่ารัก บ๊องๆ ติ๊งต๊อง แต่ก็ชอบทำให้เค้ารู้สึกดีทุกครั้งเลย
      </p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-[400px]"
    >
<div className="relative h-[400px]">
  <Image 
    src="/images/image1.jpg" 
    alt="Valentine" 
    layout="fill"
    objectFit="cover"
    className="rounded-lg"
  />
  <EmojiOverlay 
    position="top-right"
    size="large" 
    emoji="💖" 
  />
    <EmojiOverlay 
    position="bottom-left"
    size="large" 
    emoji="⭐" 
  />
</div>
    </motion.div>
  </div>
</motion.section>

{/* Section 2: Image Left, Text Right */}
<motion.section
  className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-pink-100"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-[400px] order-2 md:order-1"
    >
<div className="relative h-[400px]">
  <Image 
    src="/images/image2.jpg" 
    alt="Valentine" 
    layout="fill"
    objectFit="cover"
    className="rounded-lg"
  />
  <EmojiOverlay 
    position="top-left"
    size="large" 
    emoji="🐶" 
  />
    <EmojiOverlay 
    position="bottom-right"
    size="large" 
    emoji="😎" 
  />
</div>
    </motion.div>
    <motion.div 
      className="text-left order-1 md:order-2"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Heart className="text-pink-500 w-16 h-16 mb-6" fill="currentColor" />
      </motion.div>
      <h2 className="text-4xl font-bold text-pink-600 mb-4">
        เธอเกิดวันที่ 31 มีนาคม
      </h2>
      <p className="text-xl text-pink-500">
        เป็นคนที่ต๊องๆบ้างบางเวลา ชอบกินทุกอย่างที่ขวางหน้า กินได้หมดเลย ไม่ค่อยเลือกกินเท่าไหร่~
      </p>
    </motion.div>
  </div>
</motion.section>

{/* Section 3: Text Left, Image Right */}
<motion.section
  className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-pink-100 to-pink-50"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <motion.div 
      className="text-left"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Heart className="text-pink-500 w-16 h-16 mb-6" fill="currentColor" />
      </motion.div>
      <h2 className="text-4xl font-bold text-pink-600 mb-4">
        แถมยังเคย Cosplay ด้วยนะ!
      </h2>
      <p className="text-xl text-pink-500">
        พวกเราคบกันวันที่ 21 มกราคม ซึ่งตรงกับวันเกิดเค้าด้วยหล่ะ เธอเป็นคนเลือกให้นี่นา~
      </p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-[400px]"
    >
<div className="relative h-[400px]">
  <Image 
    src="/images/image3.jpg" 
    alt="Valentine" 
    layout="fill"
    objectFit="cover"
    className="rounded-lg"
  />
  <EmojiOverlay 
    position="top-right"
    size="large" 
    emoji="👑" 
  />
    <EmojiOverlay 
    position="bottom-left"
    size="large" 
    emoji="✨" 
  />
</div>
    </motion.div>
  </div>
</motion.section>

{/* Video Slider Section */}
<motion.section
  className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-pink-50"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <div className="max-w-4xl w-full">
    <div className="relative aspect-[9/9] rounded-xl overflow-hidden shadow-2xl">
      <motion.div
        key={currentVideo}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={`/videos/v-${currentVideo}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>

    {/* Dots indicator */}
    <div className="flex justify-center gap-2 mt-4">
      {[1, 2, 3, 4].map((num) => (
        <button
          key={num}
          onClick={() => setCurrentVideo(num)}
          className={`w-3 h-3 rounded-full ${
            currentVideo === num ? 'bg-pink-500' : 'bg-pink-200'
          }`}
        />
      ))}
    </div>
    
    <div className="text-center mt-8">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Heart className="text-pink-500 w-16 h-16 mx-auto mb-6" fill="currentColor" />
      </motion.div>
      <h2 className="text-4xl font-bold text-pink-600 mb-4">
        ช่วงเวลาดีๆ ของเรา
      </h2>
      <p className="text-xl text-pink-500">
        เก็บความทรงจำดีๆ เหล่านี้ไว้ตลอดไป
      </p>
    </div>
  </div>
</motion.section>



{/* Section 4: Image Left, Text Right */}
<motion.section
  className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-pink-50"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-[400px] order-2 md:order-1"
    >
           <Image 
        src="/images/image4.jpg" 
        alt="Valentine" 
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
        />
            <EmojiOverlay 
    position="bottom-right"
    size="large" 
    emoji="🌹" 
  />
    </motion.div>

    <motion.div 
      className="text-left order-1 md:order-2"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Heart className="text-pink-500 w-16 h-16 mb-6" fill="currentColor" />
      </motion.div>
      <h2 className="text-4xl font-bold text-pink-600 mb-4">
        อยู่ด้วยกันนะคะ
      </h2>
      <p className="text-xl text-pink-500">
        ไอ้ต้าวคนเก่งของเค้า
      </p>
    </motion.div>
  </div>
</motion.section>


      {/* Questions and Answers Section */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl text-pink-600 mb-8">ไหนมารีแคปหน่อยเธอตอบอะไรไปบ้างหื้ม</h2>
        <div className="space-y-6 max-w-2xl w-full">
          {Object.entries(answers).map(([questionId, data]) => (
            <motion.div
              key={questionId}
              className="bg-white rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-pink-500 font-medium mb-2">
                {data.question}
              </p>
              <p className="text-gray-700">{data.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final Love Message */}
      <motion.section
        className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-pink-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart className="text-pink-500 w-16 h-16 mx-auto mb-6" fill="currentColor" />
          </motion.div>
          <h2 className="text-4xl font-bold text-pink-600 mb-4">
            {name} เค้ารักเธอนะ
          </h2>
          <p className="text-xl text-pink-500">
            เค้าจะอยู่กับ{name}แบบนี้ไปจนแก่เลยค่ะ ❤️
          </p>
        </div>
      </motion.section>
      <footer className="flex justify-center items-center bg-pink-100 text-pink-600">
  © 2025 pisuto-dev
</footer>
    </div>
    
  );
}

export default function HappyValentinePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  );
}