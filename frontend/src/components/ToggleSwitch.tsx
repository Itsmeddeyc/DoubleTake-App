interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleSwitch({ label, checked, onChange }: ToggleSwitchProps) {
  const gradientStyle = checked
    ? {
        backgroundImage: 'linear-gradient(135deg, #0b6623, #228b22)',
        borderColor: '#1f7a28',
      }
    : undefined;

  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-gray-700">{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className={`
          relative w-14 h-8 rounded-full transition-colors duration-200 border
          ${checked ? '' : 'bg-gray-300 border-transparent'}
        `}
        style={gradientStyle}
      >
        <div
          className={`
            absolute top-1 w-6 h-6 bg-white rounded-full shadow-md
            transition-transform duration-200
            ${checked ? 'translate-x-7' : 'translate-x-1'}
          `}
        />
      </div>
    </label>
  );
}
