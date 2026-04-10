import type { CommunitySignal } from '../../types';

export function CommunitySignalRow({
  signal,
}: {
  signal: CommunitySignal | null | undefined;
}) {
  if (!signal) {
    return null;
  }

  const pieces: string[] = [];

  if (typeof signal.trackingCount === 'number') {
    pieces.push(`${signal.trackingCount.toLocaleString()} Sage users tracking this`);
  }

  if (signal.commonStack) {
    pieces.push(`Commonly stacked with ${signal.commonStack}`);
  }

  if (!pieces.length) {
    return null;
  }

  return (
    <div className="community-signal-row">
      {pieces.map((piece) => (
        <span key={piece}>{piece}</span>
      ))}
    </div>
  );
}
