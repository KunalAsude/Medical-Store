import User from '../models/User.js';
import { TokenService } from '../middleware/authMiddleware.js';
import crypto from 'crypto';

class AuthController {
  // User Registration
  static async register(req, res) {
    try {
      const { 
        firstName, 
        lastName, 
        email, 
        password, 
        phoneNumber,
        address 
      } = req.body;

      console.log("Registration request received:", JSON.stringify({
        firstName, lastName, email, phoneNumber, address
      }));

      // Validate input
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ 
          message: 'Please provide all required fields: firstName, lastName, email, password', 
          requiredFields: ['firstName', 'lastName', 'email', 'password']
        });
      }

      // Check if user already exists
      const existingUserQuery = { email };
      if (phoneNumber) {
        existingUserQuery.$or = [{ email }, { phoneNumber }]; 
      }
      
      const existingUser = await User.findOne(existingUserQuery);

      if (existingUser) {
        const field = existingUser.email === email ? 'email' : 'phoneNumber';
        return res.status(400).json({ 
          message: `User with this ${field} already exists`,
          field
        });
      }

      // Create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        accountStatus: 'Active'
      });

      // Save user
      await newUser.save();

      // Generate tokens
      const accessToken = TokenService.generateAccessToken(newUser);
      const refreshToken = TokenService.generateRefreshToken(newUser);

      // Prepare response
      const userResponse = newUser.toPublicProfile();

      res.status(201).json({
        message: 'User registered successfully',
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));

        return res.status(400).json({ 
          message: 'Validation Error', 
          errors 
        });
      }
      
      res.status(500).json({ 
        message: 'Registration failed', 
        error: error.message 
      });
    }
  }

  // User Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Please provide email and password' 
        });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ 
          message: 'Invalid credentials' 
        });
      }

      // Check account status
      if (user.accountStatus !== 'Active') {
        return res.status(403).json({ 
          message: 'Account is not active' 
        });
      }

      // Verify password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ 
          message: 'Invalid credentials' 
        });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate tokens
      const accessToken = TokenService.generateAccessToken(user);
      const refreshToken = TokenService.generateRefreshToken(user);

      // Prepare response
      const userResponse = user.toPublicProfile();

      res.status(200).json({
        message: 'Login successful',
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ 
        message: 'Login failed', 
        error: error.message 
      });
    }
  }

  // User Logout
  static async logout(req, res) {
    try {
      // Clear authentication cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
      });
  
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ 
        message: 'Logout failed', 
        error: error.message 
      });
    }
  }    

  // Refresh Token
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({ 
          message: 'Refresh token required' 
        });
      }

      // Verify refresh token
      let decoded;
      try {
        decoded = TokenService.verifyRefreshToken(refreshToken);
      } catch (error) {
        return res.status(403).json({ 
          message: 'Invalid refresh token' 
        });
      }

      // Find user
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(403).json({ 
          message: 'User not found' 
        });
      }

      // Generate new tokens
      const newAccessToken = TokenService.generateAccessToken(user);
      const newRefreshToken = TokenService.generateRefreshToken(user);

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    } catch (error) {
      console.error("Token refresh error:", error);
      res.status(500).json({ 
        message: 'Token refresh failed', 
        error: error.message 
      });
    }
  }

  // Forgot Password
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: 'Email is required'
        });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ 
          message: 'No account with that email found' 
        });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      
      // Set reset token and expiration
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      // Send reset email
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      
      // TODO: Implement actual email sending logic
      console.log(`Password Reset URL: ${resetUrl}`);

      res.status(200).json({ 
        message: 'Password reset instructions sent' 
      });
    } catch (error) {
      console.error("Password reset request error:", error);
      res.status(500).json({ 
        message: 'Error processing password reset', 
        error: error.message 
      });
    }
  }

  // Reset Password
  static async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          message: 'Token and new password are required'
        });
      }

      // Find user with valid reset token
      const user = await User.findOne({ 
        resetPasswordToken: token, 
        resetPasswordExpires: { $gt: Date.now() } 
      });

      if (!user) {
        return res.status(400).json({ 
          message: 'Invalid or expired reset token' 
        });
      }

      // Set new password
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ 
        message: 'Password reset successful' 
      });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ 
        message: 'Error resetting password', 
        error: error.message 
      });
    }
  }

  // Update Profile Method
  static async updateProfile(req, res) {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      const { 
        firstName, 
        lastName, 
        phoneNumber, 
        address 
      } = req.body;

      // Validate input
      if (!firstName || !lastName) {
        return res.status(400).json({ 
          message: 'First name and last name are required' 
        });
      }

      // Find and update user
      const user = await User.findByIdAndUpdate(
        userId, 
        {
          firstName,
          lastName,
          phoneNumber,
          address
        }, 
        { 
          new: true, // Return the updated document
          runValidators: true // Run model validations
        }
      );

      if (!user) {
        return res.status(404).json({ 
          message: 'User not found' 
        });
      }

      // Prepare response with updated public profile
      const updatedUserResponse = user.toPublicProfile();

      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUserResponse
      });
    } catch (error) {
      console.error("Profile update error:", error);
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));

        return res.status(400).json({ 
          message: 'Validation Error', 
          errors 
        });
      }
      
      res.status(500).json({ 
        message: 'Profile update failed', 
        error: error.message 
      });
    }
  }
}

export default AuthController;