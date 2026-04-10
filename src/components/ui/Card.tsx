import type { ElementType, ReactNode } from 'react';

type CardVariant = 'default' | 'rose' | 'amber' | 'green' | 'sage';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  as?: ElementType;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'sage-card',
  rose: 'sage-card sage-card-rose',
  amber: 'sage-card sage-card-amber',
  green: 'sage-card sage-card-green',
  sage: 'sage-card sage-card-sage',
};

export function Card({
  children,
  className = '',
  variant = 'default',
  as: Component = 'div',
}: CardProps) {
  return <Component className={`${variantClasses[variant]} ${className}`.trim()}>{children}</Component>;
}
