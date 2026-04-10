import type { PillTone } from '../../types';

interface PillProps {
  label: string;
  tone: PillTone;
  className?: string;
}

const toneClasses: Record<PillTone, string> = {
  green: 'sage-pill tone-green',
  amber: 'sage-pill tone-amber',
  rose: 'sage-pill tone-rose',
  sage: 'sage-pill tone-sage',
  outline: 'sage-pill tone-outline',
};

export function Pill({ label, tone, className = '' }: PillProps) {
  return <span className={`${toneClasses[tone]} ${className}`.trim()}>{label}</span>;
}
