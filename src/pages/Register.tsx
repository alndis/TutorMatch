import React from 'react';
import { RegisterForm } from '../components/AuthForms';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
};

export default Register;