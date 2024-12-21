import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

interface LocationState {
  from?: Location;
}

export function useRedirectAfterAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const redirectAfterAuth = () => {
    if (state?.from) {
      navigate(state.from.pathname);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  return { redirectAfterAuth };
}