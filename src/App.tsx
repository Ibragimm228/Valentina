import React, { useState, useCallback, useMemo } from 'react';
import { Heart } from 'lucide-react';
import { compliments } from './data/compliments';


const FloatingHearts = React.memo(() => {
 
  const hearts = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      size: Math.random() * 40 + 20
    })), []
  );

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {hearts.map((heart, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
            opacity: 0.2,
          }}
        >
          <Heart
            size={heart.size}
            className="text-red-400"
            fill="currentColor"
            strokeWidth={1}
          />
        </div>
      ))}
    </div>
  );
});


const ComplimentCard = React.memo(({ compliment, isAnimating }) => {
  if (!compliment) return null;
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative">
      <div
        className={`glass-effect rounded-3xl p-8 sm:p-10 transform transition-all duration-500 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-red-700 leading-relaxed">
          {compliment}
        </p>
      </div>
    </div>
  );
});

function App() {
  const [compliment, setCompliment] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomCompliment = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setCompliment(compliments[randomIndex]);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-100 to-pink-200 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-red-100/50 to-pink-200/50 backdrop-blur-sm" />
      </div>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        <div className="text-center w-full max-w-5xl mx-auto px-4">
          <div className="mb-16 space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 drop-shadow-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-pink-500 to-red-600 animate-gradient">
                Валентинки с Комплиментами
              </span>
            </h1>
          </div>
          
          <div className="flex flex-col items-center space-y-12">
            <button
              onClick={getRandomCompliment}
              className="transform transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
              aria-label="Получить комплимент"
            >
              <Heart
                size={200}
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 text-red-500 hover:text-red-600 heart-glow"
                fill="currentColor"
                strokeWidth={1.5}
              />
            </button>

            <ComplimentCard compliment={compliment} isAnimating={isAnimating} />
          </div>
        </div>
      </div>

      <FloatingHearts />
    </div>
  );
}

export default App;