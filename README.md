# 🌍 Letrum Travel Agency - Full-Stack Application

A comprehensive full-stack travel agency application with modern UI/UX design, complete authentication system, and extensive APIs for flights, tours, car rentals, visa processing, and e-commerce functionality.

## 🚀 Features

### 🎨 Frontend Features
- **Ultra-Modern Landing Page** with glass morphism effects and advanced animations
- **Responsive Design** that works perfectly on all devices
- **Authentication System** with JWT-based login/register
- **Premium Tours Gallery** with luxury card effects and detailed tour information
- **Flight Booking Engine** with search and booking capabilities
- **Car Rental System** with advanced search and filtering
- **Visa Processing** forms and status tracking
- **E-commerce Shopping** for travel gear and accessories
- **User Dashboard** for managing bookings and account information

### ⚙️ Backend Features
- **RESTful API** built with NestJS and TypeScript
- **JWT Authentication** with role-based access control (USER, ADMIN, STAFF)
- **PostgreSQL Database** with Prisma ORM for type-safe database operations
- **Comprehensive Data Models** for users, tours, flights, cars, visas, products, orders, and bookings
- **API Documentation** with Swagger/OpenAPI
- **Data Validation** with class-validator
- **CORS Configuration** for frontend-backend communication

### 🗄️ Database Features
- **User Management** with roles and authentication
- **Tours & Bookings** with reviews and ratings system
- **Flight Management** with search and booking capabilities
- **Car Rental System** with availability tracking
- **Visa Processing** with document management and status tracking
- **E-commerce** with products, orders, and inventory management
- **Comprehensive Relationships** between all entities

## 🏗️ Tech Stack

### Frontend
- **Next.js 15.5.1** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and transitions
- **Axios** - HTTP client for API communication
- **js-cookie** - Cookie management for authentication
- **React Hook Form** - Form handling and validation

### Backend
- **NestJS** - Scalable Node.js framework
- **TypeScript** - Type safety across the entire backend
- **Prisma** - Modern database toolkit and ORM
- **PostgreSQL** - Robust relational database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Swagger** - API documentation
- **Class Validator** - Request validation

### Database Schema
- **Users** (authentication, profiles, roles)
- **Tours** (destinations, itineraries, pricing)
- **Flights** (airlines, schedules, bookings)
- **Cars** (vehicles, rentals, locations)
- **Visas** (applications, documents, status)
- **Products** (e-commerce items, categories)
- **Orders** (shopping cart, checkout, tracking)
- **Bookings** (reservations, payments, status)
- **Reviews** (ratings, comments, feedback)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd letrum-agency
```

2. **Set up the Backend**
```bash
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and JWT secret

# Set up database
npx prisma migrate dev
npm run prisma:seed
```

3. **Set up the Frontend**
```bash
cd ../frontend
npm install

# Set up environment variables (optional)
cp .env.example .env.local
# Edit .env.local if needed
```

### Running the Application

1. **Start the Backend**
```bash
cd backend
npm run start:dev
```
The backend will run on `http://localhost:5000`

2. **Start the Frontend**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

## 📊 Database Seeding

The application comes with comprehensive seed data:
- **4 Users** including admin, staff, and regular users
- **4 Premium Tours** with detailed information and images
- **3 Flights** with different airlines and destinations
- **3 Cars** ranging from economy to luxury vehicles
- **5 Products** for travel gear and accessories
- **Reviews and Ratings** for tours
- **Sample Bookings** and visa requests

### Credentials
- **Admin**: `admin@letrumagency.com` / `password123`
- **User**: `john.doe@example.com` / `password123`
- **User**: `jane.smith@example.com` / `password123`
- **Staff**: `staff@letrumagency.com` / `password123`

## 🎯 API Documentation

With the backend running, visit `http://localhost:5000/api/docs` for comprehensive API documentation with Swagger UI.

### Key API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get current user profile
- `POST /api/v1/auth/refresh` - Refresh access token

#### Tours
- `GET /api/v1/tours` - Get all tours with filtering
- `GET /api/v1/tours/popular` - Get popular tours
- `GET /api/v1/tours/:id` - Get tour details
- `POST /api/v1/tours/book` - Book a tour
- `POST /api/v1/tours/:id/reviews` - Add tour review

#### Flights
- `GET /api/v1/flights/search` - Search flights
- `GET /api/v1/flights` - Get all flights
- `POST /api/v1/flights/book` - Book a flight
- `GET /api/v1/flights/popular-destinations` - Get popular destinations

#### Cars
- `GET /api/v1/cars/search` - Search cars with filters
- `GET /api/v1/cars/categories` - Get car categories
- `GET /api/v1/cars/location/:location` - Get cars by location
- `POST /api/v1/cars/book` - Book a car

#### Products (E-commerce)
- `GET /api/v1/products` - Get all products with filtering
- `GET /api/v1/products/categories` - Get product categories
- `POST /api/v1/products/orders` - Create order
- `GET /api/v1/products/orders/my` - Get user orders

#### Visa Services
- `GET /api/v1/visa` - Get all visa requests (admin)
- `POST /api/v1/visa` - Submit visa application
- `GET /api/v1/visa/my-requests` - Get user's visa requests
- `PUT /api/v1/visa/:id/status` - Update visa status (admin/staff)

## 🎨 Design Features

### Modern UI/UX Elements
- **Glass Morphism Effects** with backdrop blur and transparency
- **Advanced CSS Animations** with keyframes and transitions
- **Gradient Overlays** for sophisticated visual depth
- **Floating Elements** with subtle hover animations
- **Premium Card Designs** with luxury aesthetics
- **Dark Theme Integration** for modern appeal
- **Responsive Grid Layouts** that adapt to all screen sizes
- **Interactive Components** with smooth state transitions

### Visual Highlights
- **Hero Section** with dynamic background and call-to-action
- **Services Grid** with animated cards and icons
- **Tours Gallery** with image overlays and detailed information
- **Booking Process** visualization with step-by-step design
- **Why Choose Us** section with compelling reasons
- **Footer** with comprehensive links and contact information

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** with bcrypt
- **Role-Based Access Control** (USER, ADMIN, STAFF)
- **Request Validation** with class-validator
- **CORS Configuration** for secure frontend-backend communication
- **Environment Variables** for sensitive configuration
- **API Rate Limiting** (can be easily added)

## 🚀 Deployment Ready

The application is structured for easy deployment:
- **Frontend**: Deploy to Vercel, Netlify, or any static hosting
- **Backend**: Deploy to Railway, Render, Heroku, or any Node.js hosting
- **Database**: PostgreSQL on Railway, Supabase, or AWS RDS

### Environment Variables

#### Backend (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/letrum_agency"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=5000
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## 🎯 Future Enhancements

The application is designed for extensibility:
- **Payment Integration** (Stripe, PayPal)
- **Real-time Notifications** with WebSocket
- **Advanced Search** with Elasticsearch
- **File Upload** for documents and images
- **Email Services** for booking confirmations
- **Admin Dashboard** for comprehensive management
- **Mobile App** with React Native
- **Multi-language Support** with i18n
- **Advanced Analytics** and reporting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Modern design inspiration from leading travel websites
- Glass morphism effects following current design trends
- Comprehensive API structure following REST best practices
- Database schema designed for scalability and performance

---

**Built with ❤️ for the travel industry** 🌍✈️🏨



I want us to make some improvements to the UI we are displaying when the user is logged in.
1. This word are not clear since they are in white, Lets make them black
Welcome back, Newenv! 👋
Ready for your next African adventure? Explore breathtaking destinations, book flights, and discover the magic of safari life.
2. The image on the hero section is same as on the landing page, lets find another and better image but the UI should remain intact.
3. On the sidebar, where we have the differnt services we have, the first option is Overview, this should remain as the first.
The second should be tours and everything in it. the 3rd should be hire a car, the 4th should be visas, the 5th should Flights and the 6th should be Products where we have our ecommerce shop for travel products.
Re arrange them like that, and also we need to add colors. here are the 2 company colors.
