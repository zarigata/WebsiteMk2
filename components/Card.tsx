import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'elevated' | 'outlined' | 'filled' | 'gradient';
  hoverEffect?: 'scale' | 'shadow' | 'translate' | 'none';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  fullHeight?: boolean;
  as?: React.ElementType;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      variant = 'elevated',
      hoverEffect = 'scale',
      rounded = 'lg',
      shadow = 'md',
      padding = 'md',
      fullWidth = false,
      fullHeight = false,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    // Variant classes
    const variantClasses = {
      elevated: 'bg-white dark:bg-gray-800',
      outlined: 'border border-gray-200 dark:border-gray-700 bg-transparent',
      filled: 'bg-gray-50 dark:bg-gray-800/50',
      gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10',
    };

    // Hover effect classes
    const hoverEffectClasses = {
      none: '',
      scale: 'hover:scale-[1.02] transition-transform duration-300',
      shadow: 'hover:shadow-lg transition-shadow duration-300',
      translate: 'hover:-translate-y-1 transition-transform duration-300',
    };

    // Rounded classes
    const roundedClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    };

    // Shadow classes
    const shadowClasses = {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
      inner: 'shadow-inner',
      outline: 'shadow-outline',
    };

    // Padding classes
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-4 sm:p-6',
      lg: 'p-6 sm:p-8',
      xl: 'p-8 sm:p-10',
    };

    // Combine all classes
    const cardClasses = twMerge(
      'overflow-hidden',
      variantClasses[variant],
      hoverEffect !== 'none' && hoverEffectClasses[hoverEffect],
      roundedClasses[rounded],
      shadow !== 'none' && shadowClasses[shadow],
      paddingClasses[padding],
      fullWidth ? 'w-full' : 'w-auto',
      fullHeight ? 'h-full' : 'h-auto',
      'transition-all duration-300',
      className
    );

    return (
      <Component ref={ref} className={cardClasses} {...props}>
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
  action?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  divider = false,
  action,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'flex items-center justify-between p-4 sm:p-6 pb-0',
        divider && 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4',
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
};

// Card Content Component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
  padding = 'md',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  };

  return (
    <div
      className={twMerge(paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Footer Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  divider = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'p-4 sm:p-6 pt-0',
        divider && 'border-t border-gray-200 dark:border-gray-700 pt-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };
