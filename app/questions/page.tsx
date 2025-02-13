'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heart } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  answer: string;
}

interface FloatingHeartProps {
  position: number;
  onComplete: () => void;
}

interface Answer {
  question: string;
  answer: string;
}

interface AnswersMap {
  [key: number]: Answer;
}

interface ProgressCircleProps {
  number: number;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
}

const QUESTIONS: Question[] = [
  { id: 1, text: "คำถามแรกของเรา~ คิดว่าเจ้าหมาโกลเด้นตัวนี้เป็นยังไงบ้างคะ!", answer: "" },
  { id: 2, text: "ถ้าเลือกได้ วันไปเดท อยากไปเดทกับเค้าที่ไหนคะ~?", answer: "" },
  { id: 3, text: "สิ่งที่ชอบที่สุดในตัวเค้า ชอบอะไรบ้างคะ~?", answer: "" },
  { id: 4, text: "แต่เจ้าหมาโกลเด้นตัวนี้ ขี้แยเก่งนะ รับได้หรอคะ หรือมีอะไรที่ไม่พอใจในตัวหมาโกลเด้นตัวนี้มั่งคะ?", answer: "" },
  { id: 5, text: "คำถามสุดท้ายแล้วๆ~ อยากจะบอกอะไรกับโกลเด้นตัวนี้บ้างคะ~?", answer: "" }
];

const FloatingHeart: React.FC<FloatingHeartProps> = ({ position, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="absolute animate-float-up pointer-events-none"
      style={{ left: `${position}px`, bottom: '0px' }}
    >
      <Heart className="text-pink-400 animate-pulse" size={24} fill="currentColor" />
    </div>
  );
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({ number, isActive, isCompleted, isLast }) => {
  return (
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isActive ? 'bg-pink-500 text-white' : isCompleted ? 'bg-pink-300 text-white' : 'bg-pink-100 text-pink-500'}`}>{number}</div>
      {!isLast && <div className={`w-12 h-0.5 mx-1 ${isCompleted ? 'bg-pink-300' : 'bg-pink-100'}`} />}
    </div>
  );
};

interface Heart {
  id: number;
  position: number;
}

function QuestionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams?.get('name') || '';
  
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setCurrentAnswer(answers[currentQuestion]?.answer || '');
  }, [currentQuestion, answers]);

  const handleTextareaKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textareaRect = e.currentTarget.getBoundingClientRect();
    setHearts(prev => [...prev, { id: Date.now(), position: Math.random() * (textareaRect.width - 24) }]);
  };

  const removeHeart = (heartId: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== heartId));
  };

  const handlePrevious = () => {
    if (currentQuestion === 1) router.push('/');
    else setCurrentQuestion(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentAnswer.trim()) {
      setAnswers(prev => ({ ...prev, [currentQuestion]: { question: QUESTIONS[currentQuestion - 1].text, answer: currentAnswer } }));
      if (currentQuestion < QUESTIONS.length) setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (currentAnswer.trim()) {
      router.push(`/happyvalentinenakub?name=${encodeURIComponent(name)}&answers=${encodeURIComponent(JSON.stringify({...answers, [currentQuestion]: { question: QUESTIONS[currentQuestion - 1].text, answer: currentAnswer }}))}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      <div className="flex justify-center mb-12">
        {QUESTIONS.map((q, index) => (
          <ProgressCircle key={q.id} number={q.id} isActive={currentQuestion === q.id} isCompleted={answers[q.id] !== undefined} isLast={index === QUESTIONS.length - 1} />
        ))}
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="text-pink-500 text-lg mb-6">นี่ๆๆๆ {name}! เค้ามีคำถามหล่ะ ตอบให้หมดด้วยนะ! 💕</div>
        <div className="text-gray-700 text-xl mb-4">{QUESTIONS[currentQuestion - 1].text}</div>
        
        <div className="relative">
          <textarea value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)} onKeyDown={handleTextareaKeyPress} placeholder="พิมพ์คำตอบตรงนี้ๆๆๆๆ..." className="w-full p-4 border-2 border-pink-300 rounded-xl h-32 focus:ring-pink-300 transition-all duration-300 relative z-10" />
          {hearts.map(heart => <FloatingHeart key={heart.id} position={heart.position} onComplete={() => removeHeart(heart.id)} />)}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={handlePrevious} className="px-6 py-2 rounded-full bg-pink-100 text-pink-500 hover:bg-pink-200">{currentQuestion === 1 ? 'แก้ชื่อ' : 'ย้อนกลับ'}</button>
          {currentQuestion === QUESTIONS.length ? (
            <button onClick={handleSubmit} disabled={!currentAnswer.trim()} className="px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600">ส่งคำตอบ</button>
          ) : (
            <button onClick={handleNext} disabled={!currentAnswer.trim()} className="px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600">ถัดไป</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionPage />
    </Suspense>
  );
}
