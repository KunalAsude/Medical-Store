// Import statements (adjust paths as needed)
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone, Building, Globe } from 'lucide-react';
import { registerUser } from '@/lib/actions/authActions';

// Validation function to replace Zod schema
function validateForm(formData) {
  const errors = {};

  // First Name validation
  if (!formData.firstName || formData.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  // Last Name validation
  if (!formData.lastName || formData.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone Number validation (optional)
//   if (formData.phoneNumber) {
//     const phoneRegex = /^\+?[0-9\s\(\)\-]{8,20}$/;
//     if (!phoneRegex.test(formData.phoneNumber)) {
//       errors.phoneNumber = "Please enter a valid phone number";
//     }
//   }

  // Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!formData.password || formData.password.length < 8 || !passwordRegex.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }

  // Address validation
  const addressFields = ['street', 'city', 'state', 'postalCode', 'country'];
  addressFields.forEach(field => {
    if (!formData.address[field] || formData.address[field].length < 2) {
      errors[`address.${field}`] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  // Terms acceptance
  if (!formData.acceptTerms) {
    errors.acceptTerms = "You must accept the terms and conditions";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested address fields
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      // Handle other fields
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // Use the registerUser function
      const result = await registerUser(formData);
      console.log("result", result);
      
      if (result && result.user) {
        // Successful registration
        console.log('Registration successful', result.user);
        
        // Store user info and tokens in localStorage for later use
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(result.user));
          
          // Store tokens if available
          if (result.tokens) {
            localStorage.setItem('accessToken', result.tokens.accessToken);
            localStorage.setItem('refreshToken', result.tokens.refreshToken);
          }
        }
        
        // Redirect to home or dashboard
        router.push('/');
      } else {
        // Handle registration failure
        setErrors({
          submit: result?.message || "Registration failed"
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        submit: "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-4xl border-gray-700 border-0 focus:border-teal-700-0 shadow-lg rounded-lg">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-teal-600 mb-2">Create Your Medi-Store Account</h2>
          <p className="text-gray-300 mb-6 border-b-gray-700 border-b pb-4">
            Join thousands of healthcare professionals and patients on our platform
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-teal-600 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Virat"
                    className="w-full h-12 px-3 border-gray-700 border rounded-md"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Kohli"
                    className="w-full h-12 px-3 border-gray-700 border focus:border-teal-700 rounded-md"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-teal-600 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="vk@example.com"
                    className="w-full h-12 px-3 border-gray-700 border focus:border-teal-700 rounded-md"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="888-555-1234"
                    className="w-full h-12 px-3 border-gray-700 border focus:border-teal-700 rounded-md"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full h-12 px-3 border-gray-700 border focus:border-teal-700 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long with a mix of uppercase, lowercase, numbers, and symbols
                </p>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-teal-600 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </h3>
              
              <div>
                <label htmlFor="address.street" className="block text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  placeholder="123 Medical Lane"
                  className="w-full h-12 px-3 border-gray-700 border  rounded-md"
                />
                {errors['address.street'] && <p className="text-red-500 text-xs mt-1">{errors['address.street']}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address.city" className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    placeholder="Nashik"
                    className="w-full h-12 px-3 border-gray-700 border focus:border-teal-700 rounded-md"
                  />
                  {errors['address.city'] && <p className="text-red-500 text-xs mt-1">{errors['address.city']}</p>}
                </div>

                <div>
                  <label htmlFor="address.state" className="block text-sm font-medium mb-2">State/Province</label>
                  <input
                    type="text"
                    id="address.state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    placeholder="Maharashtra"
                    className="w-full h-12 px-3 border-gray-700 border focus:border-teal-700 rounded-md"
                  />
                  {errors['address.state'] && <p className="text-red-500 text-xs mt-1">{errors['address.state']}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address.postalCode" className="block text-sm font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    id="address.postalCode"
                    name="address.postalCode"
                    value={formData.address.postalCode}
                    onChange={handleInputChange}
                    placeholder="401234"
                    className="w-full h-12 px-3 border-gray-700 border focus:border-teal-700 rounded-md"
                  />
                  {errors['address.postalCode'] && <p className="text-red-500 text-xs mt-1">{errors['address.postalCode']}</p>}
                </div>

                <div>
                  <label htmlFor="address.country" className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    id="address.country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    placeholder="India"
                    className="w-full h-12 px-3 border-gray-700 border focus:border-teal-700 rounded-md"
                  />
                  {errors['address.country'] && <p className="text-red-500 text-xs mt-1">{errors['address.country']}</p>}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1"
              />
              <label htmlFor="acceptTerms" className="text-sm">
                I agree to the{" "}
                <a href="/terms" className="text-teal-600 hover:text-teal-700 underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-teal-600 hover:text-teal-700 underline">
                  privacy policy
                </a>
              </label>
            </div>
            {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 rounded-md"
            >
              {isLoading ? 'Creating your account...' : 'Create your account'}
            </button>
          </form>
        </div>

        <div className="text-center py-4 border-gray-700 border-0 focus:border-teal-700-t">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}