# Livrili
Livrili is an application for managing packages and deliveries. It provides a platform for clients to create and manage package deliveries, and for delivery personnel to offer their services.

## Project Overview
Livrili is a full-stack application with:

- Backend: Java Spring Boot application
- Frontend: React with Vite

## Features
- User authentication and authorization with JWT
- Role-based access control (Client and Delivery Person roles)
- Package management for clients
- Delivery offer management for delivery personnel
- RESTful API with Swagger documentation

## Team Members

- **Ahmed Khalil Sfar** (username: subomega1) - Backend Scrum Master
- **Mohamed Hachem Chaibi** - Frontend Developer
- **Omar Salhi** - Conception UML
- **Youssef Jmal** - UI/UX Design

## Project Structure

### Backend Overview

The backend of this project is managed by **Ahmed Khalil Sfar**, who serves as the Backend Scrum Master.

#### Responsibilities

- Overseeing backend development
- Ensuring smooth integration with frontend
- Managing backend-related tasks and sprints

### Frontend Overview

The frontend of this project is developed by **Mohamed Hachem Chaibi**.

#### Responsibilities

- Developing user interfaces
- Ensuring responsive design
- Collaborating with UI/UX designer for optimal user experience

### UML Conception

Designed by **Omar Salhi**.

### UI/UX Design

Crafted by **Youssef Jmal**.

## Tech Stack
### Backend
- Java Spring Boot
- Spring Security with JWT authentication
- OpenAPI/Swagger for API documentation
### Frontend
- React
- Vite
## Getting Started
### Prerequisites
- Node.js (^18.0.0 || ^20.0.0 || >=22.0.0)
- Java JDK
- Maven
### Installation Backend Setup
1. Navigate to the backend directory: cd backend
2. Build the project: mvn clean install
3. Run the application: mvn spring-boot:run Frontend Setup
1. Navigate to the frontend directory: cd frontend
2. Install dependencies: npm install
3. Start the development server: npm run dev
## API Documentation
The API documentation is available via Swagger UI at: http://localhost:8080/swagger-ui.html

## Authentication
The application uses JWT for authentication. To access protected endpoints:

1. Register a new user or login with existing credentials
2. Use the JWT token in the Authorization header for subsequent requests: Authorization: Bearer {your_jwt_token}
## API Endpoints
### Authentication
- POST /v1/api/auth/login - User login
- POST /v1/api/auth/signUp - User registration
- GET /v1/api/auth - Get authenticated user information
### Client Endpoints
- POST /v1/api/client/packs - Create a new package
- GET /v1/api/client/packs - Get client's packages
- PUT /v1/api/client/packs/{id} - Update a package
- DELETE /v1/api/client/packs/{id} - Delete a package
- POST /api/client/packs/offer/** - Manage offers for packages
### Delivery Person Endpoints
- GET /v1/api/dg/pack/** - Get available packages
- POST /v1/api/dg/pack/offer/** - Create delivery offers
- PUT /v1/api/dg/pack/offer/** - Update delivery offers
- DELETE /v1/api/dg/pack/offer/** - Delete delivery offers
## Security
The application implements role-based access control:

- Public endpoints are accessible without authentication
- Client-specific endpoints require the "CLIENT" authority
- Delivery person endpoints require the "DELIVERY_PERSON" authority
## Git Attributes
The project uses the following .gitattributes settings to manage line endings:

- /mvnw files are configured with eol=lf to ensure consistent line endings across different environments.
- *.cmd files are configured with eol=crlf to match Windows environments.
## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Folder Structure

### Backend

```
backend/
├── .mvn/
├── .settings/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── sfar/
│   │   │           └── livrili/
│   │   │               ├── Mapper/
│   │   │               ├── Service/
│   │   │               ├── Validation/
│   │   │               ├── Repositories/
│   │   │               ├── Security/
│   │   │               ├── Domains/
│   │   │               ├── Controller/
│   │   │               ├── Config/
│   │   │               └── LivriliApplication.java
│   │   └── resources/
│   └── test/
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```

### Frontend

```
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── methods/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   ├── Layout.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## Acknowledgments

- **Ahmed Khalil Sfar** - Backend Scrum Master
- **Mohamed Hachem Chaibi** - Frontend Developer
- **Omar Salhi** - Conception UML
- **Youssef Jmal** - UI/UX Design

### Backend Dependencies

- Spring Boot version: 3.4.2

### Frontend Dependencies

- Vite
- React
- Various UI components from Radix UI
- Geoapify for geocoding

## Contact
- Sfar Ahmed Khalil - sfarahmed32@gmail.com
- GitHub: https://github.com/subomega1

## Running the Project

### Backend

1. Navigate to the backend directory: `cd backend`
2. Build the project: `mvn clean install`
3. Run the application: `mvn spring-boot:run`

The backend server will start on `http://localhost:8080`.

### Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

The frontend application will be available at `http://localhost:3000`.

This README provides an overview of the project and the team members involved.