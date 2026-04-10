import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Toast } from './Toast';

export function Shell() {
  const location = useLocation();
  const hideBottomNav =
    location.pathname === '/search/loading' || location.pathname === '/how-sage-works';

  return (
    <div className="shell-frame">
      <div className="shell-surface">
        <Outlet />
        {!hideBottomNav ? <BottomNav /> : null}
        <Toast />
      </div>
    </div>
  );
}
