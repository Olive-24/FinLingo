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
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }[padding];

  const variantClasses = {
    default:
      'bg-white border border-[#C9C1B1]/60 text-[#1B2632] shadow-sm hover:border-[#1B2632]/30',
    muted: 'bg-[#F4F0E8] border border-[#C9C1B1]/60 text-[#5C6B7A]',
    accent: 'bg-[#1B2632] border border-[#1B2632] text-white shadow-md',
    outlined: 'bg-transparent border-2 border-dashed border-[#C9C1B1] text-[#1B2632]',
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all duration-200 ${paddingClasses} ${variantClasses} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 2. REUSABLE BUTTON PRIMITIVE
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
    sm: 'px-3.5 py-1.5 text-xs font-semibold',
    md: 'px-5 py-2.5 text-xs sm:text-sm font-semibold',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-bold',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#1B2632] text-white border border-[#1B2632] hover:bg-[#2C3B4D] hover:border-[#2C3B4D] shadow-sm active:scale-[0.98]',
    secondary:
      'bg-[#FFB162]/20 text-[#A35139] border border-[#FFB162]/40 hover:bg-[#FFB162]/30 active:scale-[0.98]',
    outline:
      'bg-transparent text-[#1B2632] border border-[#C9C1B1] hover:bg-white/80 active:scale-[0.98]',
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
  variant?: 'default' | 'active' | 'outline' | 'plum' | 'maroon' | 'flame' | 'truffle';
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
    default: 'bg-[#FFB162]/20 border border-[#FFB162]/40 text-[#A35139]',
    active: 'bg-[#1B2632] border border-[#1B2632] text-white shadow-sm',
    outline: 'bg-transparent border border-[#C9C1B1] text-[#5C6B7A]',
    plum: 'bg-[#A35139]/10 border border-[#A35139]/20 text-[#A35139]',
    maroon: 'bg-[#A35139]/10 border border-[#A35139]/20 text-[#A35139]',
    flame: 'bg-[#FFB162]/20 border border-[#FFB162]/40 text-[#A35139]',
    truffle: 'bg-[#A35139] text-white border border-[#A35139]',
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
    <div className={`text-[11px] font-bold uppercase tracking-wider text-[#A35139] font-sans ${className}`}>
      {children}
    </div>
  );
};
