import React from 'react';

// 1. REUSABLE CARD PRIMITIVE (16px Radius / Solid White / #3B232E Hairline Border)
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
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }[padding];

  const variantClasses = {
    default:
      'bg-white border border-[rgba(59,35,46,0.08)] text-[#2D1E25] shadow-[0_4px_24px_-2px_rgba(59,35,46,0.04)]',
    muted: 'bg-[#F6ECE6]/80 border border-[rgba(59,35,46,0.08)] text-[#7A6870]',
    accent: 'bg-[#3B232E] border border-[#3B232E] text-white shadow-md',
    outlined: 'bg-transparent border-2 border-dashed border-[#EAD7CF] text-[#2D1E25]',
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all duration-200 ${paddingClasses} ${variantClasses} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:border-[rgba(59,35,46,0.2)] hover:shadow-lg' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 2. REUSABLE BUTTON PRIMITIVE (Primary Plum #3B232E, Secondary Transparent, Outline)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
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
    sm: 'px-3.5 py-1.5 text-xs font-bold',
    md: 'px-5 py-2.5 text-xs sm:text-sm font-bold',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-extrabold',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#3B232E] text-white border border-[#3B232E] hover:bg-[#523241] hover:border-[#523241] shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary:
      'bg-[#EAD7CF] text-[#3B232E] border border-[#EAD7CF] hover:bg-[#3B232E] hover:text-white active:scale-[0.98]',
    outline:
      'bg-transparent text-[#3B232E] border border-[rgba(59,35,46,0.2)] hover:bg-[#EAD7CF]/50 active:scale-[0.98]',
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

// 3. REUSABLE BADGE / PILL PRIMITIVE
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'active' | 'outline' | 'plum' | 'maroon';
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
    default: 'bg-[#EAD7CF] border border-[rgba(59,35,46,0.1)] text-[#3B232E]',
    active: 'bg-[#3B232E] border border-[#3B232E] text-white shadow-sm',
    outline: 'bg-transparent border border-[#EAD7CF] text-[#7A6870]',
    plum: 'bg-[#3B232E]/10 border border-[#3B232E]/20 text-[#3B232E]',
    maroon: 'bg-[#3B232E]/10 border border-[#3B232E]/20 text-[#3B232E]',
  }[variant];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-150 ${
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
    <div className={`text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7A6870] font-sans ${className}`}>
      {children}
    </div>
  );
};
