
import React, { useRef } from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'zoom-in' | 'slide-in-from-left' | 'slide-in-from-right';
  delay?: string;
  style?: React.CSSProperties;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  className,
  animation = 'fade-up',
  delay,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  const animationClasses = {
    'fade-up': 'animate-fade-up',
    'fade-in': 'animate-fade-in',
    'zoom-in': 'animate-zoom-in',
    'slide-in-from-left': 'animate-slide-in-from-left',
    'slide-in-from-right': 'animate-slide-in-from-right',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0',
        isVisible && `opacity-100 ${animationClasses[animation]}`,
        className
      )}
      style={{ animationDelay: delay, ...style }}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;
