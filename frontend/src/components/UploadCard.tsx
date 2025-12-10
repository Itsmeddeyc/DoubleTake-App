import { Plus } from 'lucide-react';

interface UploadCardProps {
  onUpload: (files: FileList) => void;
}

export function UploadCard({ onUpload }: UploadCardProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  return (
    <label className="block bg-white rounded-3xl p-12 shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.01]">
      <input
        type="file"
        multiple
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
          <Plus className="w-10 h-10 text-white" strokeWidth={3} />
        </div>
        <div className="space-y-2">
          <p className="text-gray-800">Upload your handwritten notes</p>
          <p className="text-sm text-gray-500">
            Select multiple images or take photos
          </p>
        </div>
      </div>
    </label>
  );
}
