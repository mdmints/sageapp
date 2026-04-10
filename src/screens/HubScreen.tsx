import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingModal } from '../components/features/OnboardingModal';
import { SavedItem } from '../components/features/SavedItem';
import { TopBar } from '../components/shell/TopBar';
import { Card } from '../components/ui/Card';
import { Pill } from '../components/ui/Pill';
import { useProfile } from '../hooks/useProfile';
import { useSaved } from '../hooks/useSaved';
import { useToast } from '../hooks/useToast';
import { ScreenLayout } from '../layouts/ScreenLayout';

function formatMemberDate(joinedAt: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(joinedAt));
}

export function HubScreen() {
  const navigate = useNavigate();
  const { profile, browseWithoutAccount } = useProfile();
  const { savedItems, removeItem } = useSaved();
  const { showToast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const contextText =
    profile.focuses.length > 0
      ? `Your evidence scores are personalized for ${profile.focuses.join(', ')}. When you search, Sage weighs research that's specifically relevant to your health context — not just general population data.`
      : 'Add health focuses to your profile to personalize your evidence scores.';

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar
        rightSlot={
          <button className="micro text-[var(--rose)]" onClick={() => setShowOnboarding(true)} type="button">
            Edit profile
          </button>
        }
      />
      <ScreenLayout>
        {!profile.hasAccount ? (
          <div>
            <Card className="px-[18px] py-[22px] text-center" variant="rose">
              <div className="mb-[10px] text-[32px]">🌿</div>
              <div className="title mb-[5px]">Your personal health hub</div>
              <p className="subtitle mb-4 text-[12px]">
                Sign in to save research, personalize your evidence scores, and connect your
                health data.
              </p>
              <button className="btn-primary" onClick={() => setShowOnboarding(true)} type="button">
                Get started — it takes 60 seconds
              </button>
              <button
                className="btn-text"
                onClick={() => {
                  browseWithoutAccount();
                  showToast('Browsing without an account');
                }}
                type="button"
              >
                Browse without an account
              </button>
            </Card>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center gap-[14px]">
              <div className="avatar-ring">🌸</div>
              <div>
                <div className="profile-name">{profile.name || 'My Hub'}</div>
                <div className="micro">Member since {formatMemberDate(profile.joinedAt)}</div>
                <div className="mt-2 mb-1 flex flex-wrap gap-[6px]">
                  {profile.focuses.map((focus) => (
                    <Pill className="text-[9px]" key={focus} label={focus} tone="rose" />
                  ))}
                </div>
              </div>
            </div>

            <Card className="mb-4" variant="sage">
              <div className="eyebrow mb-[6px]">How sage personalizes for you</div>
              <div className="text-[12px] leading-[1.6] text-[var(--text2)]">{contextText}</div>
            </Card>

            <div className="hub-section-title">
              Saved research <span>View all</span>
            </div>
            {savedItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div className="title !text-[14px] mb-[5px]">No saved research yet</div>
                <div className="subtitle !text-[12px] mb-[14px]">
                  Search for supplements or trends and tap ★ to save them here.
                </div>
                <button className="btn-primary" onClick={() => navigate('/')} type="button">
                  Start searching
                </button>
              </div>
            ) : (
              savedItems.map((item) => (
                <SavedItem
                  item={item}
                  key={item.title}
                  onOpen={() => navigate('/result', { state: { query: item.query, result: item } })}
                  onRemove={() => {
                    removeItem(item.title);
                    showToast(`${item.title} removed from hub`);
                  }}
                />
              ))
            )}

            <hr className="section-divider" />
          </div>
        )}
      </ScreenLayout>

      <OnboardingModal
        isOpen={showOnboarding}
        mode={profile.hasAccount ? 'edit' : 'onboard'}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}
