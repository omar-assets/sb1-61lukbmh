import { useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { useAuthContext } from '../auth/AuthProvider';
import { ROUTES } from '@/utils/constants';

export function UserMenu() {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
      >
        <Home className="h-5 w-5" />
        <span>Dashboard</span>
      </button>
      
      <button
        onClick={signOut}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
      >
        <LogOut className="h-5 w-5" />
        <span>Log Out</span>
      </button>
    </div>
  );
}