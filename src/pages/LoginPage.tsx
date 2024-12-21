import { useNavigate } from 'react-router-dom';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';
import { LoginForm } from '../components/auth/LoginForm';
import { ROUTES } from '../utils/constants';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <BackgroundPattern variant="primary">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Welcome Back
            </h2>
            
            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className="text-primary hover:text-primary-medium font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
}

export default LoginPage;