import { LoginForm } from "@/components/Auth/LoginForm";
import { useState } from "react";

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold"></h1>
        </div>
        
        {!showForgotPassword ? (
          <>
            <LoginForm />
            <div className="mt-4 text-center">
              <a 
                href="#" 
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Forgot password?
              </a>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Reset Password</h2>
            <p className="text-gray-600 mb-4">Enter your email address and we'll send you instructions to reset your password.</p>
            
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Send Reset Link
              </button>
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Back to login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}