import { useLocation, useNavigate } from 'react-router-dom';

function HomeIcon({ active }: { active: boolean }) {
  const stroke = active ? '#C85B6E' : '#a08880';

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M4 10.5L11 4l7 6.5V18a1 1 0 01-1 1H5a1 1 0 01-1-1v-7.5z"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 19v-5.5h5V19"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DecoderIcon({ active }: { active: boolean }) {
  const stroke = active ? '#C85B6E' : '#a08880';

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect
        x="3.5"
        y="3.5"
        width="15"
        height="15"
        rx="3"
        stroke={stroke}
        strokeWidth="1.4"
      />
      <path
        d="M7 8h8M7 11h8M7 14h5"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HubIcon({ active }: { active: boolean }) {
  const stroke = active ? '#C85B6E' : '#a08880';

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3.5" stroke={stroke} strokeWidth="1.4" />
      <path
        d="M4 18c0-3.3 3.1-6 7-6s7 2.7 7 6"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const items = [
    { key: 'home', label: 'Search', path: '/', icon: HomeIcon },
    { key: 'decoder', label: 'Verdict', path: '/decoder', icon: DecoderIcon },
    { key: 'hub', label: 'My hub', path: '/hub', icon: HubIcon },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = activePath === item.path;
        const Icon = item.icon;

        return (
          <button
            key={item.key}
            className={`nav-item ${isActive ? 'is-active' : ''}`}
            onClick={() => navigate(item.path)}
            type="button"
          >
            <Icon active={isActive} />
            <span className="nav-item-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
