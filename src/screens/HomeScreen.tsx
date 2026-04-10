import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DecoderBanner } from '../components/features/DecoderBanner';
import { OnboardingModal } from '../components/features/OnboardingModal';
import { TrendCard } from '../components/features/TrendCard';
import { TopBar } from '../components/shell/TopBar';
import { SearchBar } from '../components/ui/SearchBar';
import { getWeeklyTrendingItems } from '../content/home';
import { useProfile } from '../hooks/useProfile';
import { useToast } from '../hooks/useToast';
import { ScreenLayout } from '../layouts/ScreenLayout';

export function HomeScreen() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { showToast } = useToast();
  const [query, setQuery] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const trendingItems = getWeeklyTrendingItems();

  function beginSearch(nextQuery = query) {
    const trimmedQuery = nextQuery.trim();

    if (!trimmedQuery) {
      showToast('Enter a supplement or trend');
      return;
    }

    setQuery(trimmedQuery);
    navigate('/search/loading', { state: { query: trimmedQuery } });
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar
        rightSlot={
          <button
            className="profile-avatar-button"
            onClick={() => navigate('/hub')}
            type="button"
          >
            {profile.hasAccount ? '🌸' : '👤'}
          </button>
        }
        showBeta
      />
      <ScreenLayout>
        {profile.hasAccount && profile.focuses.length > 0 ? (
          
          
            <div className="personalized-badge">✦ Personalized for {profile.name || 'you'}</div>
            
        ) : null}

        <div className="eyebrow">Evidence-based women&apos;s health</div>
        <div className="display">
          Your health,<em> grounded in research.</em>
        </div>
        <p className="subtitle mb-4">
          Cut through the wellness noise. No hype, no guessing. Just the evidence.
        </p>

        <SearchBar
          autoFocus
          onChange={setQuery}
          onSubmit={() => beginSearch()}
          placeholder='Try "inositol for PCOS" or paste a link…'
          value={query}
        />
       

        <div className="mt-10 mb-[10px] flex items-baseline justify-between">
          <div className="title">Try one of these </div>
        
    
  
          <button className="micro text-[var(--rose)]" type="button">
            🔄 Refreshes Weekly
          </button>
        </div>


        {trendingItems.map((item) => (
          <TrendCard
            item={item}
            key={item.title}
            onSelect={(selectedQuery) => {
              setQuery(selectedQuery);
              beginSearch(selectedQuery);
            }}
          />
        ))}

        <hr className="section-divider" />
        <DecoderBanner onClick={() => navigate('/decoder')} />

        {!profile.hasAccount ? (
          <button
            className="btn-text mt-3"
            onClick={() => setShowOnboarding(true)}
            type="button"
          >
            Tailor results to me
          </button>
        ) : null}

      </ScreenLayout>

      <div className="home-secondary-link-wrap">
        <button
          className="how-sage-link-card"
          onClick={() => navigate('/how-sage-works')}
          type="button"
        >
          How Sage works
        </button>
      </div>

      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  );
}
