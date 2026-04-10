import { type FormEvent, type KeyboardEvent, useEffect, useRef } from 'react';

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  placeholder,
  onChange,
  onSubmit,
  autoFocus = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!autoFocus) {
      return;
    }

    inputRef.current?.focus();
  }, [autoFocus]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="#C85B6E" strokeWidth="1.5" />
        <path d="M10 10L13.5 13.5" stroke="#C85B6E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        ref={inputRef}
        autoFocus={autoFocus}
        value={value}
        className="searchbar-input"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        type="text"
      />
      <button aria-label="Submit search" className="searchbar-submit" type="submit">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 10L10 6 2 2v3l5 1-5 1v3z" fill="#fff" />
        </svg>
      </button>
    </form>
  );
}
