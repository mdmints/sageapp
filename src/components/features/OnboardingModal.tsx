import { useEffect, useState } from 'react';
import { onboardingFocuses, onboardingGenderOptions } from '../../content/onboarding';
import { useProfile } from '../../hooks/useProfile';
import { useToast } from '../../hooks/useToast';

const TOTAL_STEPS = 5;

interface OnboardingModalProps {
  isOpen: boolean;
  mode?: 'onboard' | 'edit';
  onClose: () => void;
}

export function OnboardingModal({
  isOpen,
  mode = 'onboard',
  onClose,
}: OnboardingModalProps) {
  const { profile, browseWithoutAccount, completeOnboarding } = useProfile();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age ? String(profile.age) : '');
  const [gender, setGender] = useState(profile.gender);
  const [focuses, setFocuses] = useState<string[]>(profile.focuses);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setStep(1);
    setName(profile.name);
    setAge(profile.age ? String(profile.age) : '');
    setGender(profile.gender);
    setFocuses(profile.focuses);
  }, [isOpen, profile.age, profile.focuses, profile.gender, profile.name]);

  if (!isOpen) {
    return null;
  }

  function closeModal() {
    onClose();
  }

  function handleSkip() {
    if (mode === 'onboard') {
      browseWithoutAccount();
    }
    closeModal();
  }

  function continueToAge() {
    if (!name.trim()) {
      showToast('Enter your name to continue');
      return;
    }

    setStep(2);
  }

  function continueToGender() {
    const parsedAge = Number.parseInt(age, 10);

    if (!Number.isFinite(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
      showToast('Enter your age to continue');
      return;
    }

    setAge(String(parsedAge));
    setStep(3);
  }

  function continueToFocuses() {
    if (!gender) {
      showToast('Choose the option that fits you best');
      return;
    }

    setStep(4);
  }

  function toggleFocus(value: string) {
    setFocuses((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  function continueToConfirmation() {
    if (focuses.length === 0) {
      showToast('Select at least one focus area');
      return;
    }

    setStep(5);
  }

  function finish() {
    completeOnboarding({
      name: name.trim(),
      age: Number.parseInt(age, 10),
      gender,
      focuses,
    });
    closeModal();
  }

  const progressWidth = `${(step / TOTAL_STEPS) * 100}%`;

  return (
    <div className="onboarding-screen" role="dialog" aria-modal="true">
      <div className="onboarding-header">
        <div className="logo">
          <div className="logomark">S</div>
          <span className="logoname">sage</span>
        </div>
      </div>
      <div className="onboarding-progress-row">
        <div className="onboarding-progress">
          <div className="onboarding-progress-fill" style={{ width: progressWidth }} />
        </div>
        <div className="onboarding-progress-label">Step {step} of {TOTAL_STEPS}</div>
      </div>

      <div className="onboarding-body">
        <div className="onboarding-slide-viewport">
          <div
            className="onboarding-slide-track"
            style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
          >
            <section className="onboarding-step-panel">
              <div className="onboarding-step-inner">
                <div className="modal-title">What should we call you?</div>
                <div className="searchbar mb-5">
                  <input
                    className="searchbar-input text-[14px]"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your first name…"
                    type="text"
                    value={name}
                  />
                </div>
              </div>
              <div className="onboarding-footer">
                <button className="btn-primary" onClick={continueToAge} type="button">
                  Continue →
                </button>
                <button className="onboarding-skip-link" onClick={handleSkip} type="button">
                  Skip for now
                </button>
              </div>
            </section>

            <section className="onboarding-step-panel">
              <div className="onboarding-step-inner">
                <div className="modal-title">How old are you?</div>
                <div className="searchbar mb-5">
                  <input
                    className="searchbar-input text-[14px]"
                    inputMode="numeric"
                    onChange={(event) => setAge(event.target.value.replace(/[^\d]/g, ''))}
                    placeholder="Your age…"
                    type="text"
                    value={age}
                  />
                </div>
              </div>
              <div className="onboarding-footer">
                <button className="btn-primary" onClick={continueToGender} type="button">
                  Continue →
                </button>
                <button className="onboarding-skip-link" onClick={handleSkip} type="button">
                  Skip for now
                </button>
              </div>
            </section>

            <section className="onboarding-step-panel">
              <div className="onboarding-step-inner">
                <div className="modal-title">How do you identify?</div>
                <div className="onboarding-pill-row">
                  {onboardingGenderOptions.map((option) => {
                    const isSelected = gender === option.value;

                    return (
                      <button
                        className={`onboarding-choice-pill ${isSelected ? 'is-selected' : ''}`}
                        key={option.value}
                        onClick={() => setGender(option.value)}
                        type="button"
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="onboarding-footer">
                <button className="btn-primary" onClick={continueToFocuses} type="button">
                  Continue →
                </button>
                <button className="onboarding-skip-link" onClick={handleSkip} type="button">
                  Skip for now
                </button>
              </div>
            </section>

            <section className="onboarding-step-panel">
              <div className="onboarding-step-inner">
                <div className="modal-title">What brings you to Sage?</div>
                <div>
                  {onboardingFocuses.map((option) => {
                    const isSelected = focuses.includes(option.value);

                    return (
                      <button
                        className={`onboarding-option ${isSelected ? 'is-selected' : ''}`}
                        key={option.value}
                        onClick={() => toggleFocus(option.value)}
                        type="button"
                      >
                        <div className="onboarding-option-icon">{option.emoji}</div>
                        <div className="min-w-0 flex-1 text-left">
                          <div className="onboarding-option-title">{option.title}</div>
                          <div className="onboarding-option-sub">{option.subtitle}</div>
                        </div>
                        <div className="onboarding-check">{isSelected ? '✓' : ''}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="onboarding-footer">
                <button className="btn-primary" onClick={continueToConfirmation} type="button">
                  Continue →
                </button>
                <button className="onboarding-skip-link" onClick={handleSkip} type="button">
                  Skip for now
                </button>
              </div>
            </section>

            <section className="onboarding-step-panel">
              <div className="onboarding-confirmation">
                <div className="logomark onboarding-confirmation-mark">S</div>
                <div className="onboarding-confirmation-title">
                  Welcome to Sage, {name.trim() || 'there'}
                </div>
              </div>
              <div className="onboarding-footer">
                <button className="btn-primary" onClick={finish} type="button">
                  Take me to Sage
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
