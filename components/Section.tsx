import React from 'react';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  fullWidth?: boolean;
  bgColor?: string;
  bgImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  style?: React.CSSProperties;
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  containerClassName = '',
  as: Component = 'section',
  padding = 'md',
  maxWidth = '7xl',
  fullWidth = false,
  bgColor = 'transparent',
  bgImage,
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 50,
  style = {},
  ...props
}) => {
  // Background image style
  const bgImageStyle = bgImage
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  // Overlay style
  const overlayStyle = overlay
    ? {
        position: 'relative',
      }
    : {};

  // Combine styles
  const sectionStyle = {
    backgroundColor: bgColor,
    ...bgImageStyle,
    ...sectionStyle,
    ...style,
  };

  return (
    <Component
      id={id}
      className={`relative ${className}`}
      style={sectionStyle}
      {...props}
    >
      {overlay && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity / 100,
          }}
          aria-hidden="true"
        />
      )}
      <Container
        className={`relative z-10 ${containerClassName}`}
        padding={padding}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      >
        {children}
      </Container>
    </Component>
  );
};

export default Section;
