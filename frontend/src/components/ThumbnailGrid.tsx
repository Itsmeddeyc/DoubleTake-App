import { useState } from 'react';
import { X } from 'lucide-react';
import { ImagePreviewModal } from './ImagePreviewModal';

interface ThumbnailGridProps {
  images: string[];
  onReorder: (newOrder: string[]) => void;
  onDelete: (index: number) => void;
}

export function ThumbnailGrid({ images, onReorder, onDelete }: ThumbnailGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [longPressIndex, setLongPressIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  let longPressTimer: NodeJS.Timeout;

  const handleTouchStart = (index: number) => {
    longPressTimer = setTimeout(() => {
      setLongPressIndex(index);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  const handleTap = (index: number) => {
    if (longPressIndex === null) {
      setSelectedImageIndex(index);
    }
  };

  const handleDelete = (index: number) => {
    onDelete(index);
    setLongPressIndex(null);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newImages = [...images];
    const [removed] = newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, removed);
    
    onReorder(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={() => setDragOverIndex(null)}
          >
            <div
              className={`
                aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-pointer
                transition-all duration-200
                ${draggedIndex === index ? 'opacity-50 scale-95' : ''}
                ${dragOverIndex === index ? 'ring-4 ring-purple-400' : ''}
                ${longPressIndex === index ? 'scale-95' : ''}
              `}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              onClick={() => handleTap(index)}
            >
              <img
                src={image}
                alt={`Note ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {longPressIndex === index && (
              <div className="absolute -top-2 -right-2 z-10">
                <button
                  onClick={() => handleDelete(index)}
                  className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <ImagePreviewModal
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
}
