# Assessment Backend - Reverse Proxy API

A Node.js/TypeScript backend application that provides a reverse proxy service with authentication, request logging, and configuration management capabilities.

## 🚀 Features

- **Reverse Proxy**: Route requests to external APIs through proxy endpoints
- **Authentication**: JWT-based authentication system with admin user management
- **Request Logging**: Comprehensive logging of all incoming requests
- **Settings Management**: Configurable application settings
- **Security**: Helmet.js security headers, CORS protection, and input validation
- **MongoDB Integration**: Persistent data storage for users, logs, and settings

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet.js, bcryptjs for password hashing
- **Development**: ts-node-dev for hot reloading

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assessment-backend-ability
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/your-database-name
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   JWT_SECRET=your-secret-key-here
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with hot reloading using ts-node-dev.

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

## 📚 API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication
- `POST /auth/login` - User login
- `POST /auth/seed-admin` - Create admin user (development only)

### Proxy Routes
- `GET /proxy/users` - Proxy request to external users API
- `GET /proxy/posts` - Proxy request to external posts API
- Additional proxy endpoints can be configured

### Logs
- `GET /logs` - Retrieve request logs (requires JWT authentication)
  - Query parameters: `page`, `limit`, `path`, `date`

### Settings
- `GET /settings` - Retrieve application settings
- `PUT /settings` - Update application settings

## 🔐 Authentication

The API uses JWT tokens for authentication. To access protected endpoints:

1. Login using `POST /auth/login` with admin credentials
2. Include the returned token in the `Authorization` header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## 📊 Data Models

### User
- `email`: Unique email address
- `passwordHash`: Hashed password
- `role`: User role (default: "admin")
- `timestamps`: Created/updated timestamps

### Log
- Request logging with timestamps and metadata

### Settings
- Application configuration storage

### ProxyRule
- Proxy routing configuration

## 🧪 Testing with Postman

A Postman collection is included in the repository:
- `postman-collection.json` - API endpoint collection
- `postman-enviroment.json` - Environment variables

Import these files into Postman to test the API endpoints.

## 📁 Project Structure

```
src/
├── middleware/     # Custom middleware functions
├── models/        # MongoDB schemas and models
├── routes/        # API route handlers
├── utils/         # Utility functions
└── server.ts      # Main application entry point
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

### TypeScript Configuration
The project uses strict TypeScript configuration with modern ES features and Node.js compatibility.

## 🚨 Security Features

- **Helmet.js**: Security headers
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Request validation middleware
- **Password Hashing**: bcryptjs for secure password storage
- **JWT**: Secure token-based authentication

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | 4000 |
| `MONGO_URI` | MongoDB connection string | Required |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins | Empty |
| `JWT_SECRET` | Secret key for JWT token signing | Required |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For questions or issues, please create an issue in the repository or contact the development team.
