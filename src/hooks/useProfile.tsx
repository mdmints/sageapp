import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProfileState } from '../types';

const PROFILE_STORAGE_KEY = 'sage.profile';

const defaultProfile: ProfileState = {
  name: '',
  age: null,
  gender: null,
  focuses: [],
  hasAccount: false,
  joinedAt: new Date().toISOString(),
};

interface ProfileContextValue {
  profile: ProfileState;
  updateProfile: (updates: Partial<ProfileState>) => void;
  completeOnboarding: (payload: {
    name: string;
    age: number | null;
    gender: string | null;
    focuses: string[];
  }) => void;
  browseWithoutAccount: () => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

function readStoredProfile(): ProfileState {
  if (typeof window === 'undefined') {
    return defaultProfile;
  }

  const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!raw) {
    return defaultProfile;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ProfileState>;

    return {
      ...defaultProfile,
      ...parsed,
      age: typeof parsed.age === 'number' ? parsed.age : null,
      gender: typeof parsed.gender === 'string' ? parsed.gender : null,
      focuses: Array.isArray(parsed.focuses) ? parsed.focuses : [],
      joinedAt: parsed.joinedAt || defaultProfile.joinedAt,
    };
  } catch {
    return defaultProfile;
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileState>(() => readStoredProfile());

  useEffect(() => {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  function updateProfile(updates: Partial<ProfileState>) {
    setProfile((current) => ({ ...current, ...updates }));
  }

  function completeOnboarding(payload: {
    name: string;
    age: number | null;
    gender: string | null;
    focuses: string[];
  }) {
    setProfile((current) => ({
      ...current,
      name: payload.name,
      age: payload.age,
      gender: payload.gender,
      focuses: payload.focuses,
      hasAccount: true,
      joinedAt: current.joinedAt || new Date().toISOString(),
    }));
  }

  function browseWithoutAccount() {
    setProfile((current) => ({ ...current, hasAccount: false }));
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        completeOnboarding,
        browseWithoutAccount,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
}
