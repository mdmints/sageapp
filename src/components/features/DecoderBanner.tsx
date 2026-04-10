interface DecoderBannerProps {
  onClick: () => void;
}

export function DecoderBanner({ onClick }: DecoderBannerProps) {
  return (
    <button className="decoder-banner" onClick={onClick} type="button">
      <div className="decoder-banner-icon">📋</div>
      <div className="min-w-0 flex-1 text-left">
        <div className="saved-item-name mb-[2px]">Scrolled past a claim?</div>
        <div className="saved-item-meta">
          Paste a link, video, or claim and we'll check it against the research →
        </div>
      </div>
    </button>
  );
}
