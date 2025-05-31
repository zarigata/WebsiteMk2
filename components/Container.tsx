import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  fullWidth?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  padding = 'md',
  maxWidth = '7xl',
  fullWidth = false,
  ...props
}) => {
  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6 py-12',
    md: 'px-4 sm:px-6 py-16',
    lg: 'px-4 sm:px-6 py-20',
    xl: 'px-4 sm:px-6 py-24',
  };

  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    '3xl': 'max-w-[1600px]',
    '4xl': 'max-w-[1800px]',
    '5xl': 'max-w-[2000px]',
    '6xl': 'max-w-[2200px]',
    '7xl': 'max-w-[2400px]',
    full: 'max-w-full',
  };

  // Combine classes
  const containerClasses = `
    mx-auto
    ${!fullWidth ? maxWidthClasses[maxWidth] : 'w-full'}
    ${paddingClasses[padding]}
    ${className}
  `;

  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  );
};

export default Container;
