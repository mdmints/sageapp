import type { ReactNode } from 'react';

interface ScreenLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ScreenLayout({ children, className = '' }: ScreenLayoutProps) {
  return <div className={`screen-scroll screen-fade-up ${className}`.trim()}>{children}</div>;
}
