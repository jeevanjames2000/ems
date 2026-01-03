# Employee Management System (EMS)

## Project Overview

This application serves as a centralized platform for HR and administrative tasks. It features a secure login system, a dynamic dashboard for statistical overviews, and a robust employee list management interface. Key capabilities include:

- **CRUD Operations**: Add, edit, delete, and view employee details.
- **Search & Filter**: Real-time filtering by gender, status, and name search.
- **Reporting**: Generate and download individual Employee ID Cards (PDF) and print capability.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Offline Support**: PWA (Progressive Web App) capabilities for access without internet.

## Tech Stack

- **Frontend Framework**: React 18 (built with Vite)
- **Routing**: React Router DOM
- **Key Libraries**:
  - `react-hot-toast` (Notifications)
  - `lucide-react` (Icons)
  - `jspdf` & `html2canvas` (PDF Generation)
  - `react-to-print` (Printing)
  - `vite-plugin-pwa` (PWA Support)
  - `react-helmet-async` (SEO Optimization)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (18.0.0 or higher)

### Installation

1. **Clone the repository**:
   git clone https://github.com/jeevanjames2000/ems.git
   cd ems

2. **Install dependencies**: npm install

3. **Start the development server**: npm run dev

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`.

### Login Credentials

The application uses a simulated authentication system. You can log in using **any valid email address** and **password**.

- **Email**: `admin@company.com` (example)
- **Password**: `admin123` (example)

## Design Decisions & Assumptions

- **Local Persistence**: To ensure the application is easy to run and test without a backend setup, all data (users, employees, session state) is persisted using the browser's `localStorage`. This mocks a database experience while keeping the app serverless.
- **Client-Side Generation**: PDF generation and printing are handled entirely on the client side to maintain privacy and reduce server reliance.
- **PWA Integration**: The app is configured as a Progressive Web App (PWA). This ensures that even if the network connection drops, the cached application shell and data remain accessible.
- **Mobile Responsiveness**: The UI was built with a "responsive-first" mindset. Complex tables adapt to smaller screens, and the navigation transforms into an off-canvas sidebar for better mobile usability.

## Folder Structure

src/
├── components/ # Reusable UI components (Header, Sidebar, etc.)
│ └── common/ # Generic components (Button, Modal, SEO, etc.)
├── context/ # Global state (AuthContext)
├── data/ # Mock data and constants
├── pages/ # Routes (Dashboard, EmployeeList, Login)
├── services/ # Business logic and data services
└── styles/ # CSS modules and global styles
