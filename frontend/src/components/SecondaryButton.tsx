interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function SecondaryButton({ children, onClick, disabled = false, fullWidth = false }: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? 'w-full' : 'px-8'}
        py-4 rounded-full bg-white text-gray-700 border-2 border-gray-200
        transition-all duration-200
        hover:border-purple-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      `}
    >
      {children}
    </button>
  );
}
