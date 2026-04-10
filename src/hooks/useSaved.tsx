import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { SearchResult } from '../types';

const SAVED_STORAGE_KEY = 'sage.saved-items';

interface SavedContextValue {
  savedItems: SearchResult[];
  saveItem: (item: SearchResult) => boolean;
  removeItem: (title: string) => void;
  isSaved: (title: string) => boolean;
}

const SavedContext = createContext<SavedContextValue | null>(null);

function readStoredItems(): SearchResult[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as SearchResult[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SearchResult[]>(() => readStoredItems());

  useEffect(() => {
    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  function saveItem(item: SearchResult) {
    if (savedItems.some((saved) => saved.title === item.title)) {
      return false;
    }

    setSavedItems((current) => [...current, item]);
    return true;
  }

  function removeItem(title: string) {
    setSavedItems((current) => current.filter((item) => item.title !== title));
  }

  function isSaved(title: string) {
    return savedItems.some((item) => item.title === title);
  }

  return (
    <SavedContext.Provider value={{ savedItems, saveItem, removeItem, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);

  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }

  return context;
}
