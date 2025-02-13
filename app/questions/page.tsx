'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
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
  { id: 5, text: "คำถามสุดยอดแล้วๆ~ อยากจะบอกอะไรกับโกลเด้นตัวนี้บ้างคะ~?", answer: "" }
];

const FloatingHeart: React.FC<FloatingHeartProps> = ({ position, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="absolute animate-float-up pointer-events-none"
      style={{ 
        left: `${position}px`,
        bottom: '0px',
        transform: 'translateZ(-1px)'
      }}
    >
      <Heart 
        className="text-pink-400 animate-pulse" 
        size={24}
        fill="currentColor" 
      />
    </div>
  );
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({ number, isActive, isCompleted, isLast }) => {
  return (
    <div className="flex items-center">
      <div 
        className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm
          ${isActive ? 'bg-pink-500 text-white' : 
            isCompleted ? 'bg-pink-300 text-white' : 'bg-pink-100 text-pink-500'}
          transition-all duration-300
        `}
      >
        {number}
      </div>
      {!isLast && (
        <div className={`
          w-12 h-0.5 mx-1
          ${isCompleted ? 'bg-pink-300' : 'bg-pink-100'}
          transition-all duration-300
        `} />
      )}
    </div>
  );
};

interface Heart {
  id: number;
  position: number;
}

export default function QuestionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams?.get('name') || '';
  
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Load saved answer for current question if it exists
    if (answers[currentQuestion]) {
      setCurrentAnswer(answers[currentQuestion].answer);
    } else {
      setCurrentAnswer('');
    }
  }, [currentQuestion, answers]);

  const handleTextareaKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const textareaRect = textarea.getBoundingClientRect();
    const position = Math.random() * (textareaRect.width - 24);
    
    const newHeart: Heart = {
      id: Date.now(),
      position: position,
    };
    
    setHearts(prev => [...prev, newHeart]);
  };

  const removeHeart = (heartId: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== heartId));
  };

  const handlePrevious = () => {
    if (currentQuestion === 1) {
      router.push('/'); // กลับไปหน้าแรกเพื่อแก้ไขชื่อ
    } else if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentAnswer.trim()) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: {
          question: QUESTIONS[currentQuestion - 1].text,
          answer: currentAnswer
        }
      }));

      if (currentQuestion < QUESTIONS.length) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const handleSubmit = () => {
    if (currentAnswer.trim()) {
      const finalAnswers = {
        ...answers,
        [currentQuestion]: {
          question: QUESTIONS[currentQuestion - 1].text,
          answer: currentAnswer
        }
      };
      
      router.push(`/happyvalentinenakub?name=${encodeURIComponent(name)}&answers=${encodeURIComponent(JSON.stringify(finalAnswers))}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      {/* Progress Tracker */}
      <div className="flex justify-center mb-12">
        {QUESTIONS.map((question, index) => (
          <ProgressCircle
            key={question.id}
            number={question.id}
            isActive={currentQuestion === question.id}
            isCompleted={answers[question.id] !== undefined}
            isLast={index === QUESTIONS.length - 1}
          />
        ))}
      </div>

      {/* Question Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="text-pink-500 text-lg mb-6">
          นี่ๆๆๆ {name}! เค้ามีคำถามหล่ะ ตอบให้หมดด้วยนะ! 💕
        </div>
        
        <div className="text-gray-700 text-xl mb-4">
          {QUESTIONS[currentQuestion - 1].text}
        </div>

        <div className="relative">
          <textarea
            value={currentAnswer}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentAnswer(e.target.value)}
            onKeyDown={handleTextareaKeyPress}
            placeholder="พิมพ์คำตอบตรงนี้ๆๆๆๆ..."
            className="w-full p-4 border-2 border-pink-300 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all duration-300 relative z-10"
          />
          {hearts.map(heart => (
            <FloatingHeart
              key={heart.id}
              position={heart.position}
              onComplete={() => removeHeart(heart.id)}
            />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            className={`px-6 py-2 rounded-full ${
              currentQuestion === 1 
                ? 'bg-pink-100 text-pink-500 hover:bg-pink-200' 
                : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
            } transition-all duration-300`}
          >
            {currentQuestion === 1 ? 'อยากแก้ไขชื่อหรอ กดจิ~' : 'ย้อนกลับ'}
          </button>
          
          {currentQuestion === QUESTIONS.length ? (
            <button
              onClick={handleSubmit}
              disabled={!currentAnswer.trim()}
              className="px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 disabled:bg-pink-200 disabled:text-pink-100 transition-all duration-300"
            >
              ส่งคำตอบ
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className="px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 disabled:bg-pink-200 disabled:text-pink-100 transition-all duration-300"
            >
              ถัดไป
            </button>
          )}
        </div>
      </div>
    </div>
  );
}