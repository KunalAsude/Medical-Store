import express from 'express';
import AuthController from '../controllers/authenticationController.js';
import { AuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register',
    AuthMiddleware.rateLimiter(5, 15 * 60 * 1000),
    AuthController.register
);

router.post('/login',
    AuthMiddleware.rateLimiter(10, 15 * 60 * 1000),
    AuthController.login
);

router.post('/refresh-token',
    AuthMiddleware.rateLimiter(5, 15 * 60 * 1000),
    AuthController.refreshToken
);

router.post('/forgot-password',
    AuthMiddleware.rateLimiter(3, 15 * 60 * 1000),
    AuthController.forgotPassword
);

router.post('/reset-password/:token',
    AuthMiddleware.rateLimiter(3, 15 * 60 * 1000),
    AuthController.resetPassword
);

// Protected Routes
router.get('/profile',
    AuthMiddleware.authenticate,
    AuthMiddleware.checkPermissions(['user', 'admin']),
    (req, res) => {
        res.json({
            message: 'Profile accessed successfully',
            user: req.user.toPublicProfile()
        });
    }
);

router.put('/profile',
    AuthMiddleware.authenticate,
    AuthMiddleware.checkPermissions(['user', 'admin']),
    AuthController.updateProfile
);

router.post('/logout',
    AuthMiddleware.authenticate, 
    AuthController.logout
);


export default router;