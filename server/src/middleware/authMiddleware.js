import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Separate Token Service
export class TokenService {
  static generateAccessToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
  }

  static generateRefreshToken(user) {
    return jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
  }

  static verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
  }
}

// Authentication Middleware
export class AuthMiddleware {
  static async authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }

  static checkPermissions(allowedRoles) {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  }

  static rateLimiter(maxRequests = 100, timeWindow = 15 * 60 * 1000) {
    const requestCounts = new Map();
    
    return (req, res, next) => {
      const ip = req.ip;
      const now = Date.now();
      
      // Clean up old request records more efficiently
      Array.from(requestCounts.entries())
        .filter(([, value]) => now - value.timestamp > timeWindow)
        .forEach(([key]) => requestCounts.delete(key));
      
      // Get or initialize request record
      const record = requestCounts.get(ip) || { 
        count: 0, 
        timestamp: now,
        blockedUntil: 0 
      };
      
      // Check if the IP is currently blocked
      if (record.blockedUntil && now < record.blockedUntil) {
        const remainingBlockTime = Math.ceil((record.blockedUntil - now) / 1000);
        return res.status(429).json({
          message: `Too many requests. Please try again in ${remainingBlockTime} seconds.`,
          retryAfter: remainingBlockTime
        });
      }
      
      // Check request count
      if (record.count >= maxRequests) {
        // Implement progressive blocking
        const blockDuration = Math.min(
          60 * 60 * 1000, // Max block of 1 hour
          Math.pow(2, Math.floor(record.count / maxRequests)) * 60 * 1000 // Exponential backoff
        );
        
        requestCounts.set(ip, {
          count: record.count + 1,
          timestamp: now,
          blockedUntil: now + blockDuration
        });
        
        return res.status(429).json({
          message: `Too many requests. Try again in ${Math.ceil(blockDuration / 1000)} seconds.`,
          retryAfter: Math.ceil(blockDuration / 1000)
        });
      }
      
      // Update request count
      requestCounts.set(ip, {
        count: record.count + 1,
        timestamp: now,
        blockedUntil: record.blockedUntil
      });
      
      next();
    };
  }

  // Predefined rate limiters
  static lightRateLimiter = this.rateLimiter(100, 15 * 60 * 1000); // 100 requests per 15 minutes
  static strictRateLimiter = this.rateLimiter(50, 15 * 60 * 1000); // 50 requests per 15 minutes
  static heavyRateLimiter = this.rateLimiter(200, 15 * 60 * 1000); // 200 requests per 15 minutes
}