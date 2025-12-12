import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

interface SuccessScreenProps {
  exportTarget: 'docs' | 'notion';
  onStartOver: () => void;
}

export function SuccessScreen({ exportTarget, onStartOver }: SuccessScreenProps) {
  const platformName = exportTarget === 'docs' ? 'Google Docs' : 'Notion';

  return (
    <div className="min-h-screen md:min-h-0 flex flex-col items-center justify-center md:justify-start px-6 py-10">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Success checkmark animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl">
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-gray-800">
            All done! Your notes are ready to go.
          </h1>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 pt-8">
          <PrimaryButton
            fullWidth
            onClick={() => window.open('#', '_blank')}
            gradientClassName=""
            style={
              exportTarget === 'docs'
                ? { backgroundColor: '#4285F4' }
                : {
                    backgroundColor: '#787774',
                    color: '#ffffff',
                  }
            }
          >
            View in {platformName}
          </PrimaryButton>
          <SecondaryButton
            fullWidth
            onClick={onStartOver}
            style={{
              backgroundColor: '#cfe3d1',
              color: '#2f4a36',
              borderColor: '#b7d1ba',
            }}
          >
            Convert Another Note
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
