import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { ScreenLayout } from '../layouts/ScreenLayout';

const scoreMeaningRows = [
  {
    label: 'Clinical studies',
    description: 'how much evidence exists, how recent, how consistent',
  },
  {
    label: 'Safety profile',
    description: 'what the research says about side effects and who should be cautious',
  },
  {
    label: 'Expert consensus',
    description: 'whether the broader medical community agrees or is still figuring it out',
  },
  {
    label: 'Studied in women',
    description:
      'how much of the research actually included female participants across different ages and hormonal stages',
  },
];

export function HowSageWorksScreen() {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="topbar how-sage-topbar">
        <button className="back-link mb-0" onClick={handleBack} type="button">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8l4-4"
              stroke="#C85B6E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <div />
      </div>

      <ScreenLayout className="how-sage-screen">
        <div className="eyebrow">Evidence-based women&apos;s health</div>
        <div className="result-title mb-4">How Sage works</div>

        <section className="how-sage-intro">
          <div className="how-sage-lead">
            We built Sage because wellness advice shouldn&apos;t require a medical degree to
            fact-check.
          </div>
          <p className="how-sage-copy">
            Every day millions of women make decisions about what to put in their bodies based
            on a TikTok, a caption, or a friend&apos;s recommendation. Not because they&apos;re
            naive, because finding reliable, relevant information is genuinely hard. Sage
            changes that.
          </p>
        </section>

        <Card className="how-sage-card">
          <div className="title mb-[10px]">Where we get our information</div>
          <p className="how-sage-copy mb-3">
            Every result starts with peer-reviewed research from PubMed, the NIH, the Cochrane
            Library, and indexed clinical journals. No brand websites, no influencer claims.
            If it hasn&apos;t been peer reviewed, it doesn&apos;t contribute to your result.
          </p>
          <p className="how-sage-copy">
            Each source is tagged Strong, Mixed, or Limited based on study quality, sample
            size, and consistency across independent research.
          </p>
        </Card>

        <Card className="how-sage-card">
          <div className="title mb-[10px]">What the score means</div>
          <div className="how-sage-score-list">
            {scoreMeaningRows.map((row) => (
              <div className="how-sage-score-row" key={row.label}>
                <div className="how-sage-score-label">{row.label}</div>
                <div className="how-sage-copy">{row.description}</div>
              </div>
            ))}
          </div>
          <div className="how-sage-callout">
            The NIH didn&apos;t require studies to include women until 1993. When the evidence
            for women is thin, Sage tells you. Because knowing the gap is as useful as knowing
            the science.
          </div>
        </Card>

        <Card className="how-sage-card">
          <div className="title mb-[10px]">What Sage isn&apos;t</div>
          <p className="how-sage-copy">
            Sage isn&apos;t telling you what to do. A high score doesn&apos;t mean a supplement is
            right for you. A low score doesn&apos;t mean something is useless. Often it just
            means the research hasn&apos;t caught up yet. What Sage gives you is the full
            picture, so whatever you decide, you&apos;re deciding with your eyes open.
          </p>
        </Card>

        <div className="how-sage-closing">
          Built with care for women who ask good questions.
        </div>
      </ScreenLayout>
    </div>
  );
}
