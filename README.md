# InternshipTask – Power Supply Manager

Simple web application for managing computer power supplies, their types, and efficiency ratings.

## Stack
- Backend: Java, Spring Boot, JPA/Hibernate, Maven, MySQL
- Frontend: React (TypeScript, create-react-app), Material UI

## Prerequisites
- Java
- Maven
- Node.js + npm
- MySQL database and user with permissions

## Configuration
1) Create a MySQL database (e.g., `internship_task`).
2) Set credentials in `backend/InternshipTask/src/main/resources/application.properties`:
```
spring.datasource.url=jdbc:mysql://localhost:3306/internship_task
spring.datasource.username=YOUR_USER
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```
3) Ensure the DB user has rights to the schema.

## Running the backend
```bash
cd backend/InternshipTask
mvn spring-boot:run
```
Backend listens on `http://localhost:8080/api`.

## Running the frontend
```bash
cd frontend/frontend
npm install
npm start
```
App will open at `http://localhost:3000/`.

## Usage notes
- Create/edit/delete power supplies; assign type and efficiency rating from dropdowns.
- Types and efficiency ratings can be created and deleted from the UI; deleting them will cascade-delete related power supplies
