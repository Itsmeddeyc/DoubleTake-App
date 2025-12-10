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
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Loading spinner */}
        <div className="flex justify-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-4 border-purple-200 border-t-purple-500"
          />
        </div>

        {/* Progress steps */}
        <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`
                text-center transition-all duration-500
                ${index === activeStep ? 'text-gray-800' : 'text-gray-400'}
                ${index < activeStep ? 'text-gray-600' : ''}
              `}
            >
              <div className="flex items-center justify-center gap-3">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                    ${index === activeStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'}
                    ${index < activeStep ? 'bg-green-400' : ''}
                  `}
                >
                  {index < activeStep ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-white text-sm">{index + 1}</span>
                  )}
                </div>
                <span>{step}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Helper text */}
        <p className="text-center text-gray-600 text-sm">
          This may take a few moments.
        </p>
      </div>
    </div>
  );
}
