import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    role: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/v1/api/auth/signUp`, user);
      toast.success("Account created succefully !");
      navigate("/login");
    } catch (error) {
      console.log(error);
      error.response.data.fields.map((field, index) => {
        toast.error(field.message);
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pb-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/40 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create an account</h1>
          <p className="mt-2 text-blue-300">
          Join our platform today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/*Nom*/}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-200"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Ahmed"
                    value={user.firstName}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 bg-gray-800/50 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              {/*Prenom*/}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-200"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Sfar"
                    value={user.lastName}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 bg-gray-800/50 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            {/*email*/}
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
                  value={user.email}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 bg-gray-800/50 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Phone  */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-200"
              >
                Phone number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+216 12456789"
                  value={user.phone}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 bg-gray-800/50 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/********************Password**********************/}
            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
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
                  value={user.password}
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
                The password must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 pr-10 w-full py-2 bg-gray-800/50 border ${
                    user.confirmPassword &&
                    user.password !== user.confirmPassword
                      ? "border-red-500"
                      : "border-gray-700"
                  } text-white rounded-md focus:outline-none focus:ring-2 ${
                    user.confirmPassword &&
                    user.password !== user.confirmPassword
                      ? "focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-blue-500 focus:border-blue-500"
                  }`}
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
              {user.confirmPassword &&
                user.password !== user.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    Les mots de passe ne correspondent pas
                  </p>
                )}
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
                    value="MALE"
                    checked={user.gender === "MALE"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="gender-men"
                    className="ml-2 block text-sm text-gray-200"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gender-women"
                    name="gender"
                    type="radio"
                    value="FEMALE"
                    checked={user.gender === "FEMALE"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="gender-women"
                    className="ml-2 block text-sm text-gray-200"
                  >
                    Female
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
                    value="CLIENT"
                    checked={user.role === "CLIENT"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="role-client"
                    className={`flex items-center justify-center px-4 py-2 border ${
                      user.role === "CLIENT"
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
                    value="DELIVERY_PERSON"
                    checked={user.role === "DELIVERY_PERSON"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="role-coursier"
                    className={`flex items-center justify-center px-4 py-2 border ${
                      user.role === "DELIVERY_PERSON"
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-gray-700 bg-gray-800/70 text-gray-300"
                    } rounded-md cursor-pointer hover:bg-gray-700 transition-colors`}
                  >
                    Delivery Guy
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/***********Submit Button ****************/}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-400 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
