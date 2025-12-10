import { UploadCard } from './UploadCard';
import { ThumbnailGrid } from './ThumbnailGrid';
import { ToggleSwitch } from './ToggleSwitch';
import { PrimaryButton } from './PrimaryButton';

interface UploadReviewScreenProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  combinePages: boolean;
  onCombinePagesChange: (combine: boolean) => void;
  onConvert: () => void;
}

export function UploadReviewScreen({
  images,
  onImagesChange,
  combinePages,
  onCombinePagesChange,
  onConvert,
}: UploadReviewScreenProps) {
  const handleUpload = (files: FileList) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    onImagesChange([...images, ...newImages]);
  };

  const handleReorder = (newOrder: string[]) => {
    onImagesChange(newOrder);
  };

  const handleDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32">
        <h1 className="text-center text-gray-800 mb-8">
          DoubleTake Notes
        </h1>

        <UploadCard onUpload={handleUpload} />

        {images.length > 0 && (
          <ThumbnailGrid
            images={images}
            onReorder={handleReorder}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Fixed bottom controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-6 space-y-4">
        <ToggleSwitch
          label="Combine all pages into one document"
          checked={combinePages}
          onChange={onCombinePagesChange}
        />
        <PrimaryButton fullWidth onClick={onConvert}>
          Convert Handwriting
        </PrimaryButton>
      </div>
    </div>
  );
}
