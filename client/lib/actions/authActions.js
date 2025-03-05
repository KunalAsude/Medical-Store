// Token Management Utilities
const setAuthTokens = (tokens) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }
};

const clearAuthTokens = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
};

const getAccessToken = () => {
    return typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
};

/**
 * Register a new user
 * @param userData User registration credentials
 * @returns User object or null if registration fails
 */
export const registerUser = async (userData) => {
    try {
      const payload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        address: userData.address,
        acceptTerms: userData.acceptTerms
      };
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Registration failed"
        };
      }
  
      const result = await res.json();
      
      return {
        success: true,
        user: result.user,
        tokens: result.tokens,
        message: result.message || "Registration successful"
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return {
        success: false,
        message: error.message || "Registration failed"
      };
    }
  };

/**
 * Login user
 * @param credentials User login credentials
 * @returns User object or null if login fails
 */
export const loginUser = async (credentials) => {
    try {
        console.log("Login Credentials", credentials);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
       

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const result = await res.json();
        console.log("Login Response", result);

        // Store tokens and user info
        if (result.tokens) {
            setAuthTokens(result.tokens);

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(result.user));
            }
        }

        return result;
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
};

/**
 * Logout user
 * @returns Boolean indicating success of logout
 */
/**
 * Logout user
 * @returns Boolean indicating success of logout
 */
export const logoutUser = async () => {
    try {
        // Get the current token
        const token = getAccessToken();
        
        if (!token) {
            console.log("No access token found, clearing local data only");
            clearAuthTokens();
            return true;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include", // Ensures cookies are sent
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        // Always clear tokens locally regardless of server response
        clearAuthTokens();
        console.log("Logged out successfully");
        
        return true;
    } catch (error) {
        console.error("Logout Error:", error.message);
        // Even if server-side logout fails, clear local tokens
        clearAuthTokens();
        return true; // Return true as local logout succeeded
    }
};


/**
 * Check if user is authenticated
 * @returns Boolean indicating authentication status
 */
export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        return !!token;
    }
    return false;
};

/**
 * Get current user from local storage
 * @returns User object or null
 */
export const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    }
    return null;
};

/**
 * Request password reset
 * @param email User's email address
 * @returns Boolean indicating success of password reset request
 */
export const requestPasswordReset = async (email) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        return res.ok;
    } catch (error) {
        console.error("Error requesting password reset:", error);
        return false;
    }
};

/**
 * Reset password
 * @param token Password reset token
 * @param newPassword New password
 * @returns Boolean indicating success of password reset
 */
export const resetPassword = async (token, newPassword) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword })
        });

        return res.ok;
    } catch (error) {
        console.error("Error resetting password:", error);
        return false;
    }
};

/**
 * Update user profile
 * @param userData User profile update data
 * @returns Updated user object or null if update fails
 */
export const updateUserProfile = async (userData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Profile update failed");
        }

        return await res.json();
    } catch (error) {
        console.error("Error updating user profile:", error);
        return null;
    }
};