import { useState } from 'react';
import { UploadReviewScreen } from './components/UploadReviewScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { ToastError } from './components/ToastError';

type Screen = 'upload' | 'progress' | 'results' | 'success';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('upload');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [combinePages, setCombinePages] = useState(true);
  const [exportTarget, setExportTarget] = useState<'docs' | 'notion'>('docs');
  const [showError, setShowError] = useState(false);

  const handleConvert = () => {
    if (uploadedImages.length === 0) {
      setShowError(true);
      return;
    }

    setCurrentScreen('progress');

    setTimeout(() => {
      setCurrentScreen('results');
    }, 6000);
  };

  const handleExport = (target: 'docs' | 'notion') => {
    setExportTarget(target);
    setCurrentScreen('success');
  };

  const handleStartOver = () => {
    setUploadedImages([]);
    setCombinePages(true);
    setCurrentScreen('upload');
  };

  const shellBackground = {
    backgroundImage: 'linear-gradient(160deg, #f0faef, #e0f4e3, #f6fcf4)',
  };

  return (
    <div
      className="relative w-full md:max-w-[412px] mx-auto min-h-screen md:min-h-0 md:rounded-3xl overflow-hidden"
      style={shellBackground}
    >

      {currentScreen === 'upload' && (
        <UploadReviewScreen
          images={uploadedImages}
          onImagesChange={setUploadedImages}
          combinePages={combinePages}
          onCombinePagesChange={setCombinePages}
          onConvert={handleConvert}
        />
      )}

      {currentScreen === 'progress' && <ProgressScreen />}

      {currentScreen === 'results' && (
        <ResultsScreen onExport={handleExport} />
      )}

      {currentScreen === 'success' && (
        <SuccessScreen
          exportTarget={exportTarget}
          onStartOver={handleStartOver}
        />
      )}

      <ToastError
        show={showError}
        onClose={() => setShowError(false)}
      />
    </div>
  );
}
