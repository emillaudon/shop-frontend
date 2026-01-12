# Shop Frontend

An Angular frontend for a simple shop application, built to work together with the
Shop Backend:
https://github.com/emillaudon/shop-backend

This project is built as a learning and portfolio project with a strong focus on
clean architecture, best practices, and maintainable frontend code.

> ⚠️ This project is still under active development.

---

## Tech Stack

- Angular (standalone components)
- TypeScript
- RxJS
- Angular Router
- ESLint (Angular + TypeScript)
- HTML / SCSS

---

## Features

- Product listing
- Product search
- Shopping cart with reactive state
- Order creation
- Feature-based Angular architecture
- Clean separation of UI, data access, and domain logic

---

## Project Structure

The frontend follows a feature-based architecture:

src/app  
├─ core/ App-wide configuration and core services  
├─ features/  
│ ├─ products/  
│ │ ├─ pages/  
│ │ ├─ components/  
│ │ └─ data-access/  
│ ├─ orders/  
│ └─ cart/  
├─ shared/  
│ ├─ ui/  
│ └─ models/  
└─ layout/

This structure is designed to scale well and keep features isolated and easy to
maintain.

---

## Code Quality

- ESLint enabled and enforced
- Uses Angular built-in control flow (@if, @for)
- Dependency injection via inject()
- Small, focused components
- Continuous refactoring and cleanup

---

## Running the Project

Install dependencies:

npm install

Start development server:

ng serve

The application will be available at:

http://localhost:4200

Make sure the backend is running for full functionality.

---

## Backend

The backend for this project is implemented in Spring Boot:

https://github.com/emillaudon/shop-backend

---

## Purpose

This project demonstrates:

- modern Angular development practices
- clean frontend architecture
- fullstack communication with a REST API
- continuous refactoring and improvement

It is not intended as a production-ready shop, but as a solid learning and portfolio
project.

---

## Status

Work in progress.  
New features, refactors, and improvements are added continuously.
