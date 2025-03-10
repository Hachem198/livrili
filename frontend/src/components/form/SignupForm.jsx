import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    gender: "",
    role: "",
    agreeToTerms: false,
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
          <h1 className="text-3xl font-bold text-white">Crée Un Compte</h1>
          <p className="mt-2 text-blue-300">
            Joindre notre platform aujourdhui
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/*Nom*/}
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-200"
              >
                Nom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 bg-gray-800/50 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

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
              <p className="text-xs text-gray-400">
                Le mot de passe doit comporter au moins 8 caractères
              </p>
            </div>
            {/**************Confirm password************************/}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Confirmer le Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full py-2 bg-gray-800/50 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-blue-400 hover:text-blue-300 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/**********Gender **********/}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Gender
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="gender-men"
                    name="gender"
                    type="radio"
                    value="men"
                    checked={formData.gender === "men"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="gender-men"
                    className="ml-2 block text-sm text-gray-200"
                  >
                    Men
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gender-women"
                    name="gender"
                    type="radio"
                    value="women"
                    checked={formData.gender === "women"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="gender-women"
                    className="ml-2 block text-sm text-gray-200"
                  >
                    Women
                  </label>
                </div>
              </div>
            </div>
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Role
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    id="role-client"
                    name="role"
                    type="radio"
                    value="client"
                    checked={formData.role === "client"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="role-client"
                    className={`flex items-center justify-center px-4 py-2 border ${
                      formData.role === "client"
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-gray-700 bg-gray-800/70 text-gray-300"
                    } rounded-md cursor-pointer hover:bg-gray-700 transition-colors`}
                  >
                    Client
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="role-coursier"
                    name="role"
                    type="radio"
                    value="coursier"
                    checked={formData.role === "coursier"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="role-coursier"
                    className={`flex items-center justify-center px-4 py-2 border ${
                      formData.role === "coursier"
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-gray-700 bg-gray-800/70 text-gray-300"
                    } rounded-md cursor-pointer hover:bg-gray-700 transition-colors`}
                  >
                    Coursier
                  </label>
                </div>
              </div>
            </div>
            {/**********POLICY************* */}
            <div className="flex items-center space-x-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium text-gray-200"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Privacy Policy
                </a>
              </label>
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
            Already have an account?{" "}
            <a href="#" className="font-medium text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
