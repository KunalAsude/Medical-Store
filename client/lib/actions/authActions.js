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
        phoneNumber: userData.phoneNumber || undefined,
        password: userData.password,
        address: userData.address || undefined,
      };
      
      // Log the payload for debugging
      console.log("Registration payload:", JSON.stringify(payload));
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      // Log the full response for debugging
      console.log("Registration response status:", res.status);
      console.log("Registration response headers:", Object.fromEntries([...res.headers]));
      
      // Check if the response is JSON
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const responseData = await res.json();
        
        
        if (!res.ok) {
          return {
            success: false,
            message: responseData.message || "Registration failed",
            errors: responseData.errors
          };
        }
        
        // If registration successful, store tokens and user data
        if (responseData.tokens) {
          setAuthTokens(responseData.tokens);
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(responseData.user));
          }
        }
        
        return {
          success: true,
          user: responseData.user,
          tokens: responseData.tokens,
          message: responseData.message || "Registration successful"
        };
      } else {
        // Handle non-JSON response
        const textResponse = await res.text();
        console.error("Non-JSON response:", textResponse);
        return {
          success: false,
          message: "Server returned invalid response format"
        };
      }
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
       
        const responseData = await res.json();

        if (!res.ok) {
            console.error("Login error details:", responseData);
            return {
                success: false,
                message: responseData.message || "Login failed"
            };
        }

        console.log("Login Response", responseData);

        // Store tokens and user info
        if (responseData.tokens) {
            setAuthTokens(responseData.tokens);

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(responseData.user));
            }
        }

        return {
            success: true,
            user: responseData.user,
            tokens: responseData.tokens,
            message: responseData.message || "Login successful"
        };
    } catch (error) {
        console.error("Error logging in:", error);
        return {
            success: false,
            message: error.message || "Login failed"
        };
    }
};

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
 * @returns Object with success status and message
 */
export const requestPasswordReset = async (email) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const responseData = await res.json();
        
        return {
            success: res.ok,
            message: responseData.message || (res.ok ? "Password reset instructions sent" : "Failed to send reset instructions")
        };
    } catch (error) {
        console.error("Error requesting password reset:", error);
        return {
            success: false,
            message: error.message || "Failed to send reset instructions"
        };
    }
};

/**
 * Reset password
 * @param token Password reset token
 * @param newPassword New password
 * @returns Object with success status and message
 */
export const resetPassword = async (token, newPassword) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword })
        });

        const responseData = await res.json();
        
        return {
            success: res.ok,
            message: responseData.message || (res.ok ? "Password reset successful" : "Failed to reset password")
        };
    } catch (error) {
        console.error("Error resetting password:", error);
        return {
            success: false,
            message: error.message || "Failed to reset password"
        };
    }
};

/**
 * Update user profile
 * @param userData User profile update data
 * @returns Object with success status, updated user data, and message
 */
export const updateUserProfile = async (userData) => {
    try {
        const token = getAccessToken();
        
        if (!token) {
            return {
                success: false,
                message: "Authentication required"
            };
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        const responseData = await res.json();

        if (!res.ok) {
            console.error("Profile update error details:", responseData);
            return {
                success: false,
                message: responseData.message || "Profile update failed",
                errors: responseData.errors
            };
        }

        // Update the stored user data
        if (responseData.user && typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(responseData.user));
        }

        return {
            success: true,
            user: responseData.user,
            message: responseData.message || "Profile updated successfully"
        };
    } catch (error) {
        console.error("Error updating user profile:", error);
        return {
            success: false,
            message: error.message || "Profile update failed"
        };
    }
};

/**
 * Refresh the access token using the refresh token
 * @returns Object with success status and new tokens
 */
export const refreshAuthToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
            return {
                success: false,
                message: "No refresh token available"
            };
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken })
        });

        const responseData = await res.json();

        if (!res.ok) {
            console.error("Token refresh error:", responseData);
            // If refresh fails, user needs to login again
            clearAuthTokens();
            return {
                success: false,
                message: responseData.message || "Session expired, please login again"
            };
        }

        // Update stored tokens
        if (responseData.accessToken && responseData.refreshToken) {
            setAuthTokens({
                accessToken: responseData.accessToken,
                refreshToken: responseData.refreshToken
            });
        }

        return {
            success: true,
            message: "Token refreshed successfully"
        };
    } catch (error) {
        console.error("Error refreshing token:", error);
        // On error, clear tokens and require re-login
        clearAuthTokens();
        return {
            success: false,
            message: error.message || "Authentication failed, please login again"
        };
    }
};