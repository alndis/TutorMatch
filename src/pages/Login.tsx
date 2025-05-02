import React from 'react';
import { LoginForm } from '../components/AuthForms';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
};

export default Login;