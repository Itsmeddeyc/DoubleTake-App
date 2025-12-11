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
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
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
    <div className="min-h-screen flex flex-col relative">
      {/* Main scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-gray-800">DoubleTake Notes</h1>
        </div>

        <UploadCard onUpload={handleUpload} />

        {images.length > 0 && (
          <ThumbnailGrid
            images={images}
            onReorder={handleReorder}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Bottom controls INSIDE the mobile shell */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[412px] bg-white/80 backdrop-blur-md border-t border-gray-200 p-6 space-y-4">
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
