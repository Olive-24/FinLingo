import React from 'react';

// 1. REUSABLE CARD PRIMITIVE
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'accent' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const paddingClasses = {
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  }[padding];

  const variantClasses = {
    default: 'bg-[#FBF2EC] border border-[#E6D2C8] text-[#2A1A20] shadow-[0_4px_20px_rgba(59,37,48,0.03)]',
    muted: 'bg-[#F4E6DF]/70 border border-[#E6D2C8]/70 text-[#8C7378]',
    accent: 'bg-[#3B2530] border border-[#3B2530] text-white shadow-[0_8px_30px_rgba(59,37,48,0.15)]',
    outlined: 'bg-transparent border-2 border-dashed border-[#E6D2C8] text-[#2A1A20]',
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl transition-all duration-200 ${paddingClasses} ${variantClasses} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(59,37,48,0.08)]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 2. REUSABLE BUTTON PRIMITIVE (EXACTLY TWO VARIANTS: PRIMARY & SECONDARY)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-bold',
    md: 'px-6 py-3 text-xs sm:text-sm font-bold',
    lg: 'px-8 py-4 text-sm sm:text-base font-extrabold',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#3B2530] text-white border border-[#3B2530] hover:bg-[#2D1B24] hover:shadow-[0_4px_16px_rgba(59,37,48,0.25)] active:scale-[0.98]',
    secondary:
      'bg-transparent text-[#3B2530] border border-[#3B2530] hover:bg-[#3B2530]/10 active:scale-[0.98]',
  }[variant];

  return (
    <button
      onClick={onClick}
      className={`rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// 3. REUSABLE BADGE / PILL PRIMITIVE (MICRO-LABELS & TAGS)
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'active' | 'outline' | 'maroon';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  icon,
  className = '',
  onClick,
}) => {
  const variantClasses = {
    default: 'bg-[#3B2530]/10 border border-[#3B2530]/15 text-[#3B2530]',
    active: 'bg-[#3B2530] border border-[#3B2530] text-white shadow-sm',
    outline: 'bg-transparent border border-[#E6D2C8] text-[#8C7378]',
    maroon: 'bg-[#3B2530]/15 border border-[#3B2530]/25 text-[#3B2530]',
  }[variant];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:opacity-80' : ''
      } ${variantClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

// 4. MICRO-LABEL CAPTION HELPER
interface MicroLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const MicroLabel: React.FC<MicroLabelProps> = ({ children, className = '' }) => {
  return (
    <div className={`text-[11px] font-bold uppercase tracking-[0.12em] text-[#8C7378] font-sans ${className}`}>
      {children}
    </div>
  );
};
