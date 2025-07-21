# MediNexus MedicalStore

A regulatory-compliant e-commerce platform for Over-The-Counter (OTC) medicines, health products, and medical devices.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## Overview

MediNexus MedicalStore is a full-stack e-commerce solution designed specifically for the healthcare sector, focusing on OTC products with proper regulatory compliance, AI integration, and exceptional user experience. This project demonstrates modern web development practices in a regulated industry environment.

**🌐 Live Demo:** [medicalstore.medinexus.in](https://medicalstore.medinexus.in)

## Key Features

### 🛍️ E-Commerce Core
- Smart product search with advanced filtering
- Real-time inventory management
- Secure checkout process with payment integration
- Order tracking and history
- Comprehensive admin dashboard

### 🤖 AI Integration
- **MediAssistant** - AI-powered health product recommendations
- Drug interaction warnings and safety alerts
- Automated dosage calculations based on user profiles
- Personalized health tips and reminders

### 🔒 Compliance & Security
- Age verification for restricted products
- Comprehensive warning labels and dosage information
- GDPR-compliant data protection
- JWT-based authentication with role-based access
- OWASP security best practices implementation

### 🎨 User Experience
- Fully responsive design (mobile-first approach)
- Dark/Light theme toggle
- WCAG 2.1 accessibility compliance
- Smooth animations and micro-interactions
- Fast performance optimization

## Technology Stack

### Frontend
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui components
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Animations:** Framer Motion

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT tokens
- **Validation:** Joi schemas
- **File Upload:** Multer with Cloudinary integration
- **Security:** Helmet, CORS, Rate Limiting

### External Services
- **AI:** Together AI / OpenAI API
- **Payments:** Stripe integration
- **Email:** Nodemailer
- **Image Storage:** Cloudinary
- **Hosting:** Vercel (Frontend) + Railway (Backend)

## Regulatory Compliance

### ✅ Permitted Products (OTC Only)
- Analgesics (Paracetamol, Ibuprofen, Aspirin)
- Cold and flu medications
- Vitamins and dietary supplements
- First aid and hygiene products
- Medical devices (thermometers, blood pressure monitors)
- Topical treatments and skincare

### ❌ Restricted Products
- Prescription medications
- Antibiotics and controlled substances
- Products requiring medical supervision
- Scheduled or regulated drugs

## Project Structure

```
MediNexus-MedicalStore/
├── client/                 # Next.js frontend application
│   ├── app/               # App router pages and layouts
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utilities and configurations
│   └── styles/           # Global styles and themes
├── server/                # Express.js backend
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware functions
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoint definitions
│   └── utils/           # Helper functions
└── docs/                 # Documentation and compliance
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KunalAsude/MediNexus-MedicalStore.git
   cd MediNexus-MedicalStore
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

   Create `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/medinexus-store
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```

   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Documentation


### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage above 80%
- Ensure all components are accessible
- Add proper JSDoc comments
- Follow conventional commit messages

## Security

This project implements multiple security layers:
- Input validation and sanitization
- SQL injection prevention
- XSS and CSRF protection
- Rate limiting and request throttling
- Secure HTTP headers with Helmet
- Environment variable protection

## Testing

```bash
# Run frontend tests
cd client && npm run test

# Run backend tests
cd server && npm run test

# Run E2E tests
npm run test:e2e
```

## Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway)
```bash
railway login
railway link
railway up
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

**Important:** This platform is designed for educational and portfolio demonstration purposes only. It handles only Over-The-Counter (OTC) products and does not provide medical advice. Always consult healthcare professionals for medical concerns.

## Author

**Kunal Asude**
- GitHub: [@KunalAsude](https://github.com/KunalAsude)
- Email: kunalasude@gmail.com

## Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

For questions, suggestions, or support, please [open an issue](https://github.com/KunalAsude/MediNexus-MedicalStore/issues).

---

*"Empowering healthcare through technology, responsibly."*
