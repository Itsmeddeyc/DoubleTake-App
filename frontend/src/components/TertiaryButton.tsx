interface TertiaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function TertiaryButton({ children, onClick, disabled = false }: TertiaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        px-6 py-3 text-gray-600 transition-all duration-200
        hover:text-purple-600 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
}
