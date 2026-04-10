import { Card } from '../ui/Card';

export function PersonalizedTakeSection({
  profileName,
  hasProfile,
  text,
}: {
  profileName?: string;
  hasProfile: boolean;
  text?: string;
}) {
  if (!hasProfile && !text) {
    return (
      <Card>
        <div className="mb-[10px] text-[14px] font-semibold text-[var(--text)]">
          Is this worth trying for you?
        </div>
        <div className="personalized-badge mb-[10px]">Personalized for you</div>
        <div className="text-[12px] leading-[1.55] text-[var(--text2)]">
          Add your health profile to get a personalized take.
        </div>
      </Card>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <Card>
      <div className="mb-[10px] text-[14px] font-semibold text-[var(--text)]">
        Is this worth trying for you?
      </div>
      <div className="personalized-badge mb-[10px]">
        Personalized for {profileName || 'you'}
      </div>
      <div className="text-[12px] leading-[1.6] text-[var(--text2)]">{text}</div>
    </Card>
  );
}
