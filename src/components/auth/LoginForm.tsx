import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthContext } from './AuthProvider';
import { loginSchema, type LoginFormData } from '@/lib/validation';
import { FormInput } from './FormInput';
import { LoadingButton } from './LoadingButton';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useRedirectAfterAuth } from '@/hooks/useRedirectAfterAuth';

export function LoginForm() {
  const { signIn } = useAuthContext();
  const { error, handleError, clearError } = useErrorHandler();
  const { redirectAfterAuth } = useRedirectAfterAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await signIn(data.email, data.password);
      redirectAfterAuth();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <FormInput
        label="Email"
        type="email"
        icon={Mail}
        error={errors.email?.message}
        {...register('email')}
      />

      <FormInput
        label="Password"
        type="password"
        icon={Lock}
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            {...register('rememberMe')}
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-primary hover:text-primary-medium">
          Forgot password?
        </a>
      </div>

      <LoadingButton
        type="submit"
        loading={isSubmitting}
        className="w-full bg-primary text-white hover:bg-primary-medium"
      >
        Sign In
        <ArrowRight className="h-5 w-5" />
      </LoadingButton>
    </form>
  );
}