import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { TertiaryButton } from './TertiaryButton';
import { Copy } from 'lucide-react';
import { useState } from 'react';

interface ResultsScreenProps {
  onExport: (target: 'docs' | 'notion') => void;
}

const sampleNote = `Meeting Notes - Project Planning

Key Discussion Points:
• Project timeline needs to be reviewed and adjusted for Q2 deliverables
• Budget allocation requires approval from finance team by end of week
• New team members will join next Monday - prepare onboarding materials

Action Items:
• Sarah to draft updated timeline by Wednesday
• Mark to schedule follow-up with finance team
• Complete onboarding documentation before Friday

Next Meeting: March 15th, 2:00 PM`;

export function ResultsScreen({ onExport }: ResultsScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(sampleNote);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <div className="flex-1 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-gray-800">Your notes are ready.</h1>
          <p className="text-gray-600">Preview</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
            {sampleNote}
          </div>
        </div>

        <div className="space-y-3">
          <PrimaryButton fullWidth onClick={() => onExport('docs')}>
            Send to Google Docs
          </PrimaryButton>
          <SecondaryButton fullWidth onClick={() => onExport('notion')}>
            Send to Notion
          </SecondaryButton>
          <div className="flex justify-center">
            <TertiaryButton onClick={handleCopyText}>
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy All Text'}
              </div>
            </TertiaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
