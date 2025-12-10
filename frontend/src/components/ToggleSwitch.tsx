interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleSwitch({ label, checked, onChange }: ToggleSwitchProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-gray-700">{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className={`
          relative w-14 h-8 rounded-full transition-colors duration-200
          ${checked ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'}
        `}
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
