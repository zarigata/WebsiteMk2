import React from 'react';
import { twMerge } from 'tailwind-merge';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'button'
  | 'inherit';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  component?: React.ElementType;
  className?: string;
  gutterBottom?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?:
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'inherit';
  noWrap?: boolean;
  paragraph?: boolean;
  children: React.ReactNode;
}

const variantMapping: Record<TextVariant, string> = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl font-bold',
  h4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
  h5: 'text-lg md:text-xl lg:text-2xl font-semibold',
  h6: 'text-base md:text-lg lg:text-xl font-semibold',
  subtitle1: 'text-lg font-normal leading-relaxed',
  subtitle2: 'text-base font-medium',
  body1: 'text-base font-normal leading-relaxed',
  body2: 'text-sm font-normal',
  caption: 'text-xs font-normal',
  overline: 'text-xs font-medium uppercase tracking-wider',
  button: 'text-sm font-medium uppercase tracking-wider',
  inherit: 'text-inherit',
};

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  textPrimary: 'text-gray-900 dark:text-white',
  textSecondary: 'text-gray-600 dark:text-gray-300',
  error: 'text-red-600 dark:text-red-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
  inherit: 'text-inherit',
};

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  component: Component = 'p',
  className = '',
  gutterBottom = false,
  align = 'inherit',
  color = 'textPrimary',
  noWrap = false,
  paragraph = false,
  children,
  ...props
}) => {
  // Determine the component to render based on variant and paragraph prop
  let ComponentToRender = Component;
  if (!Component) {
    ComponentToRender = paragraph ? 'p' : 'span';
    
    // Map variant to default component if not provided
    if (variant === 'h1') ComponentToRender = 'h1';
    else if (variant === 'h2') ComponentToRender = 'h2';
    else if (variant === 'h3') ComponentToRender = 'h3';
    else if (variant === 'h4') ComponentToRender = 'h4';
    else if (variant === 'h5') ComponentToRender = 'h5';
    else if (variant === 'h6') ComponentToRender = 'h6';
    else if (variant === 'button') ComponentToRender = 'span';
  }

  // Text alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
    inherit: '',
  };

  // Combine all classes
  const typographyClasses = twMerge(
    'm-0 p-0',
    variantMapping[variant],
    colorClasses[color],
    alignClasses[align],
    gutterBottom ? 'mb-4' : '',
    noWrap ? 'whitespace-nowrap overflow-hidden text-ellipsis' : '',
    className
  );

  return (
    <ComponentToRender className={typographyClasses} {...props}>
      {children}
    </ComponentToRender>
  );
};

export default Typography;
