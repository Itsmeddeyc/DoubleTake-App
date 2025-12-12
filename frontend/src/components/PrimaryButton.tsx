interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  gradientClassName?: string;
  style?: React.CSSProperties;
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  gradientClassName = 'bg-gradient-to-r from-blue-500 to-purple-500',
  style,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`
        ${fullWidth ? 'w-full' : 'px-8'}
        py-4 rounded-full ${gradientClassName}
        text-white transition-all duration-200
        hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
}
