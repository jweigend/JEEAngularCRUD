# JEE Angular CRUD

Sample CRUD Application with a Jakarta EE 10 REST Backend and an Angular 19 Frontend.

Originally developed for JavaOne 2014 (JEE 7 + AngularJS 1.2), modernized in 2026.

## Original Documentation (JavaOne 2014)

- [Description JavaOne 2014 Demo](docs/Description-JavaOne2014-Demo.pdf)
- [Single Page JEE Application - Presentation (JavaOne 2014)](docs/Single-Page-JEE-Application-JavaOne2014.pdf)

## Tech Stack

**Backend:** Jakarta EE 10, JAX-RS 3.1, CDI 4.0, JPA 3.1, Hibernate, WildFly 34, H2 Database

**Frontend:** Angular 19, TypeScript, Bootstrap 5, Standalone Components, Signals

**Build:** Maven 3.9+ (Backend), Angular CLI / npm (Frontend)

## Prerequisites

- Java 21 (LTS)
- Maven 3.9+
- Node.js 20+ and npm

## Quick Start

### Backend

```bash
cd backend
mvn wildfly:dev
```

This automatically provisions WildFly 34 via Galleon (no manual download needed),
deploys the application, and enables hot-reload on code changes.

The REST API is available at: `http://localhost:8080/customerserver/api/`

API Endpoints:
- `GET /api/customers` - List all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/discount-codes` - List discount codes
- `GET /api/micro-markets` - List micro markets

### Frontend

```bash
cd frontend
npm install
npx ng serve
```

Open `http://localhost:4200` in your browser.

The Angular dev server proxies `/api` requests to the backend at `localhost:8080`.

## Docker

```bash
docker-compose up --build
```

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8080/customerserver/api/`

## Project Structure

```
backend/                    Jakarta EE 10 REST Backend
  src/main/java/.../
    entity/                 JPA Entities (Customer, DiscountCode, MicroMarket)
    repository/             CDI Repositories (generic CRUD)
    rest/                   JAX-RS Resources + CORS Filter
  src/main/resources/
    META-INF/persistence.xml
    META-INF/import.sql     Seed data

frontend/                   Angular 19 SPA
  src/app/
    core/models/            TypeScript interfaces
    core/services/          HttpClient services
    features/               Lazy-loaded route components
```

## Migration from Original (2014 -> 2026)

| Component | 2014 | 2026 |
|-----------|------|------|
| Java | 8 | 21 |
| API | Java EE 7 | Jakarta EE 10 |
| App Server | GlassFish 4 | WildFly 34 |
| ORM | EclipseLink 2.5 | Hibernate 6.6 |
| Frontend | AngularJS 1.2 | Angular 19 |
| UI | Bootstrap 3.2 | Bootstrap 5.3 |
| Package Mgr | Bower | npm |
| Build Tool | Grunt | Angular CLI |
| EJB | @Stateless | @ApplicationScoped + @Transactional (CDI) |
| JSON | JAXB | JSON-B |
