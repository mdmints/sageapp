import type { ConnectSource } from '../../types';

interface ConnectCardProps {
  item: ConnectSource;
  connected: boolean;
  onToggle: () => void;
}

export function ConnectCard({ item, connected, onToggle }: ConnectCardProps) {
  return (
    <div className="connect-card">
      <div className="connect-icon" style={{ background: item.iconBackground }}>
        {item.icon}
      </div>
      <div className="connect-info">
        <div className="connect-name">{item.name}</div>
        <div className="connect-sub">{item.description}</div>
      </div>
      <button
        className={`connect-button ${connected ? 'is-connected' : ''}`}
        onClick={onToggle}
        type="button"
      >
        {connected ? 'Connected ✓' : item.ctaLabel}
      </button>
    </div>
  );
}
