# 🏥 MediNexus MedicalStore

**MediNexus MedicalStore** is a regulatory-compliant e-commerce platform for **Over-The-Counter (OTC) medicines**, health products, and medical devices. Built with modern technologies and strict adherence to pharmaceutical regulations.

> ⚠️ **Important**: This platform sells **ONLY Over-The-Counter (OTC) products** that do not require prescriptions. All prescription medicines are strictly prohibited.

---

## 🌐 Live Demo

🚀 **Production**: [https://medicalstore.medinexus.in](#)  
Frontend: Deployed on **Vercel**  
Backend: Hosted on **Railway**

---

## 🎯 Project Purpose

This is a **educational/portfolio project** demonstrating:
- Full-stack e-commerce development
- Healthcare industry compliance
- Modern web technologies
- AI integration in healthcare platforms

**Note**: This is not intended for actual pharmaceutical commerce without proper licensing and regulatory approvals.

---

## 📋 Regulatory Compliance

### ✅ OTC Products Only
- Pain relievers (Acetaminophen, Ibuprofen)
- Cold & flu medications
- Antacids and digestive aids
- Vitamins and supplements
- First aid supplies
- Personal care items
- Medical devices (thermometers, BP monitors)

### ❌ Strictly Prohibited
- Prescription medications
- Controlled substances
- Antibiotics requiring prescription
- Any Schedule drugs
- Medicines requiring medical supervision

### 🏛️ Compliance Features
- **Age verification** for certain OTC products
- **Dosage warnings** and contraindications
- **Drug interaction checker** (AI-powered)
- **Terms of service** with medical disclaimers
- **Data privacy** compliance (GDPR/local laws)

---

## ✨ Core Features

### 🛒 E-commerce Functionality
- **Smart product search** with medical filters
- **Category-based browsing** (Pain Relief, Cold & Flu, etc.)
- **Shopping cart** with quantity limits per OTC guidelines
- **Secure checkout** with multiple payment options
- **Order tracking** and history

### 🤖 AI-Powered Features
- **MediAssistant**: Symptom-based product recommendations
- **Drug interaction warnings**
- **Dosage calculators** for OTC medicines
- **Health tips** and medication reminders

### 🔒 Security & Safety
- **SSL encryption** for all transactions
- **Secure user authentication** (JWT)
- **Input validation** and sanitization
- **Rate limiting** for API endpoints
- **OWASP security** best practices

### 📱 User Experience
- **Responsive design** (mobile-first)
- **Dark/light theme** toggle
- **Accessibility** compliant (WCAG 2.1)
- **Fast loading** with Next.js optimization
- **Offline support** (PWA capabilities)

---

## 🛠️ Technology Stack

### Frontend
```bash
Next.js 14 (App Router)    # React framework
TypeScript                # Type safety
Tailwind CSS              # Styling
Shadcn/ui                 # UI components
Framer Motion             # Animations
Zustand                   # State management
React Query               # Server state
```

### Backend
```bash
Node.js + Express         # Server framework
MongoDB + Mongoose        # Database
JWT                       # Authentication
Joi                       # Validation
Helmet                    # Security headers
Rate Limiter              # API protection
Multer                    # File uploads
```

### AI & External Services
```bash
OpenAI API / Together AI  # AI chatbot
Stripe                    # Payments
Nodemailer                # Email notifications
Cloudinary                # Image hosting
```

---

## 🏗️ Project Architecture

```
MediNexus-MedicalStore/
│
├── 📁 client/                    # Next.js Frontend
│   ├── 📁 app/
│   │   ├── 📁 (auth)/           # Authentication pages
│   │   ├── 📁 products/         # Product catalog
│   │   ├── 📁 cart/             # Shopping cart
│   │   ├── 📁 checkout/         # Order processing
│   │   └── 📁 dashboard/        # User dashboard
│   ├── 📁 components/
│   │   ├── 📁 ui/               # Reusable UI components
│   │   ├── 📁 forms/            # Form components
│   │   └── 📁 layout/           # Layout components
│   └── 📁 lib/                  # Utilities and configs
│
├── 📁 server/                    # Express.js Backend
│   ├── 📁 routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── products.js          # Product management
│   │   ├── orders.js            # Order processing
│   │   └── ai.js                # AI chatbot endpoints
│   ├── 📁 models/               # MongoDB schemas
│   ├── 📁 middleware/           # Custom middleware
│   ├── 📁 controllers/          # Business logic
│   └── 📁 utils/                # Helper functions
│
└── 📁 docs/                     # Documentation
    ├── API.md                   # API documentation
    ├── DEPLOYMENT.md            # Deployment guide
    └── COMPLIANCE.md            # Regulatory guidelines
```

---

## 🚀 Quick Start Guide

### Prerequisites
```bash
Node.js 18+
MongoDB (Atlas or local)
Git
```

### 1. Clone Repository
```bash
git clone https://github.com/KunalAsude/MediNexus-MedicalStore.git
cd MediNexus-MedicalStore
```

### 2. Environment Setup

**Backend (.env)**
```env
# Database
MONGO_URI=mongodb://localhost:27017/medinexus-store
DB_NAME=medinexus_store

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# External APIs
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Security
ALLOWED_ORIGINS=http://localhost:3000,https://medicalstore.medinexus.in
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Installation & Launch
```bash
# Install backend dependencies
cd server
npm install
npm run dev

# Install frontend dependencies (new terminal)
cd client
npm install
npm run dev
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:3000/admin

---

## 📊 Database Schema

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  subcategory: String,
  brand: String,
  price: Number,
  discountPrice: Number,
  description: String,
  ingredients: [String],
  dosage: String,
  warnings: [String],
  contraindications: [String],
  images: [String],
  stock: Number,
  isOTC: Boolean,
  ageRestriction: Number,
  maxQuantityPerOrder: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  orderNumber: String,
  items: [{
    productId: ObjectId,
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String, // pending, confirmed, shipped, delivered
  shippingAddress: Object,
  paymentMethod: String,
  paymentStatus: String,
  createdAt: Date
}
```

---

## 🤖 AI Features

### MediAssistant Chatbot
```javascript
// Example API call
POST /api/ai/ask
{
  "prompt": "I have a headache and mild fever",
  "userAge": 25,
  "medicalHistory": []
}

// Response
{
  "recommendations": [
    {
      "product": "Acetaminophen 500mg",
      "reason": "Effective for headache and fever relief",
      "dosage": "1-2 tablets every 4-6 hours",
      "warnings": ["Do not exceed 8 tablets in 24 hours"]
    }
  ],
  "generalAdvice": "Stay hydrated and rest. Consult a doctor if symptoms persist."
}
```

### Safety Features
- **Drug interaction checker**
- **Age-appropriate recommendations**
- **Dosage calculators**
- **Medical disclaimer** on all AI responses

---

## 🔐 Security Measures

- **Input validation** with Joi schemas
- **SQL injection** prevention
- **XSS protection** with helmet
- **CSRF tokens** for forms
- **Rate limiting** on all endpoints
- **Secure headers** configuration
- **Password hashing** with bcrypt
- **JWT token** expiration handling

---

## 🧪 Testing

```bash
# Backend tests
cd server
npm run test
npm run test:coverage

# Frontend tests
cd client
npm run test
npm run test:e2e

# API testing with Postman
npm run test:api
```

---

## 📦 Deployment

### Production Deployment
```bash
# Build frontend
cd client
npm run build

# Start production server
cd server
npm run start
```

### Docker Deployment
```bash
docker-compose up --build
```

### Environment-specific configs included for:
- **Development**
- **Staging**
- **Production**

---

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Compliance Guidelines](./docs/COMPLIANCE.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

## ⚖️ Legal Disclaimers

### Medical Disclaimer
> This platform is for educational purposes. All medical information is for general reference only. Always consult healthcare professionals before starting any medication. This platform does not provide medical advice, diagnosis, or treatment.

### Regulatory Notice
> This is a demonstration project. Commercial use requires proper pharmaceutical licenses, regulatory approvals, and compliance with local healthcare laws.

---t

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Kunal Asude**  
📧 Email: kunalasude@example.com  
🔗 LinkedIn: [linkedin.com/in/kunal-asude](https://linkedin.com/in/kunal-asude)  
🐙 GitHub: [@KunalAsude](https://github.com/KunalAsude)

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting solutions
- **MongoDB** for database services
- **OpenAI** for AI capabilities

---

## 📞 Support

For support, email kunalasude@example.com or join our Slack channel.

---

<div align="center">

### 🌟 Star this repository if it helped you!

**"Empowering healthcare through technology, responsibly."**

![MediNexus](https://img.shields.io/badge/MediNexus-MedicalStore-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)

</div>
