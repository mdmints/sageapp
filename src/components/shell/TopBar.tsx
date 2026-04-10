import type { ReactNode } from 'react';

interface TopBarProps {
  rightSlot?: ReactNode;
  showBeta?: boolean;
}

export function TopBar({ rightSlot, showBeta = false }: TopBarProps) {
  return (
    <div className="topbar">
      <div className="logo">
        <div className="logomark">S</div>
        <span className="logoname">sage</span>
        {showBeta ? <span className="beta-badge">BETA</span> : null}
      </div>
      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : <div />}
    </div>
  );
}
