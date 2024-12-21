import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthContext } from './AuthProvider';
import { registerSchema, type RegisterFormData } from '../../lib/validation';
import { FormInput } from './FormInput';
import { LoadingButton } from './LoadingButton';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export function RegisterForm() {
  const { signUp } = useAuthContext();
  const { error, handleError, clearError } = useErrorHandler();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      await signUp(data.email, data.password, data.fullName);
    } catch (err) {
      const error = handleError(err);
      // If email is taken, show login link
      if (error.message.includes('already exists')) {
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
          {error.includes('already exists') && (
            <button
              type="button"
              onClick={() => navigate(ROUTES.LOGIN)}
              className="mt-2 text-sm text-primary hover:text-primary-medium font-medium"
            >
              Sign in to your account →
            </button>
          )}
        </div>
      )}

      <FormInput
        label="Full Name"
        type="text"
        icon={User}
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <FormInput
        label="Email"
        type="email"
        icon={Mail}
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="space-y-2">
        <FormInput
          label="Password"
          type="password"
          icon={Lock}
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordStrengthIndicator password={password || ''} />
      </div>

      <FormInput
        label="Confirm Password"
        type="password"
        icon={Lock}
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <LoadingButton
        type="submit"
        loading={isSubmitting}
        className="w-full bg-primary text-white hover:bg-primary-medium"
      >
        Create Account
        <ArrowRight className="h-5 w-5" />
      </LoadingButton>
    </form>
  );
}