import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const steps = [
  'Uploading',
  'Recognising handwriting',
  'Cleaning with AI',
  'Creating your notes',
];

export function ProgressScreen() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen md:min-h-0 flex flex-col items-center justify-center md:justify-start px-6 py-10">
      <div className="w-full max-w-md space-y-8">
        {/* Loading spinner */}
        <div className="flex justify-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-4"
            style={{ borderColor: '#dfe8e0', borderTopColor: '#1f7a28' }}
          />
        </div>

        {/* Progress steps */}
        <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
          {steps.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;

            const circleStyle = isCompleted
              ? {
                  backgroundImage: 'linear-gradient(135deg, #0b6623, #228b22)',
                  color: '#ffffff',
                  borderColor: 'transparent',
                }
              : {
                  backgroundColor: '#e2e8f0',
                  color: '#41515c',
                  borderColor: '#d5dee8',
                };

            return (
              <div
                key={step}
                className={`
                  text-center transition-all duration-500
                  ${isActive ? 'text-gray-800' : 'text-gray-400'}
                  ${isCompleted ? 'text-gray-600' : ''}
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border
                      ${isActive && !isCompleted ? 'shadow-md' : ''}
                    `}
                    style={circleStyle}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm" style={{ color: '#41515c' }}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <span>{step}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helper text */}
        <p className="text-center text-gray-600 text-sm">
          This may take a few moments.
        </p>
      </div>
    </div>
  );
}
