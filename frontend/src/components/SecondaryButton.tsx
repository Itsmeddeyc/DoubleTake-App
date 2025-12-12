interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function SecondaryButton({
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  style = {},
}: SecondaryButtonProps) {
  const combinedStyle: React.CSSProperties = {
    backgroundColor: '#787774',
    color: '#ffffff',
    borderColor: '#6c6b68',
    ...style,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={combinedStyle}
      className={`
        ${fullWidth ? 'w-full' : 'px-8'}
        py-4 rounded-full border-2 text-white
        transition-all duration-200
        hover:opacity-90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
}
