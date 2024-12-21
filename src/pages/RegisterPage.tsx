import { useNavigate } from 'react-router-dom';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';
import { RegisterForm } from '../components/auth/RegisterForm';
import { ROUTES } from '../utils/constants';

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <BackgroundPattern variant="primary">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Create Account
            </h2>
            
            <RegisterForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="text-primary hover:text-primary-medium font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
}

export default RegisterPage;