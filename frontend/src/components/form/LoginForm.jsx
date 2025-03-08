import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your sign-up logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/40 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Se Connecter</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 p-12">
          {/*Nom*/}
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 bg-gray-800/50 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {/********************Password**********************/}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full py-2 bg-gray-800/50 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-400 hover:text-blue-300 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/***********Submit Button ****************/}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formData.agreeToTerms}
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Dont have an account?{" "}
            <a href="#" className="font-medium text-blue-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
