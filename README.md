
# Auth Module / Módulo de Autenticación

Este repositorio contiene el módulo de autenticación `auth-module` que consta de dos partes: `app-auth` (cliente) y `auth-service` (API). Este módulo proporciona funcionalidades de autenticación como el registro de usuarios, inicio de sesión y gestión de tokens.

This repository contains the authentication module `auth-module`, which consists of two parts: `app-auth` (client) and `auth-service` (API). This module provides authentication functionalities such as user registration, login, and token management.

## Descripción de la Lógica / Logic Description

### Lógica de Autenticación / Authentication Logic

1. **Registro de Usuarios / User Registration**:
   - El usuario proporciona su nombre de usuario, correo electrónico y contraseña.
   - El servidor valida y guarda la información del usuario en la base de datos.
   - Se genera un token JWT que se envía al cliente y se almacena en una cookie segura.

   - The user provides their username, email, and password.
   - The server validates and saves the user's information in the database.
   - A JWT token is generated, sent to the client, and stored in a secure cookie.

2. **Inicio de Sesión / Login**:
   - El usuario proporciona su correo electrónico y contraseña.
   - El servidor valida las credenciales y genera un token JWT.
   - El token se envía al cliente y se almacena en una cookie segura para mantener la sesión.

   - The user provides their email and password.
   - The server validates the credentials and generates a JWT token.
   - The token is sent to the client and stored in a secure cookie to maintain the session.

3. **Protección de Rutas / Route Protection**:
   - Algunas rutas están protegidas y requieren que el usuario esté autenticado para acceder a ellas.
   - El middleware verifica la presencia y validez del token antes de conceder acceso.

   - Some routes are protected and require the user to be authenticated to access them.
   - The middleware verifies the presence and validity of the token before granting access.

## Tecnologías Utilizadas / Technologies Used

- **Frontend**:
  - Vue.js con Quasar Framework
  - Vite
  - Pinia para la gestión del estado
  - GraphQL para la comunicación con la API

  - Vue.js with Quasar Framework
  - Vite
  - Pinia for state management
  - GraphQL for API communication

- **Backend**:
  - Node.js
  - Strapi para la gestión de contenidos y la API
  - MySQL como base de datos
  - Apollo Server para GraphQL

  - Node.js
  - Strapi for content management and API
  - MySQL as database
  - Apollo Server for GraphQL

## Instalación / Installation

### Requisitos Previos / Prerequisites

- Node.js (v14 o superior / v14 or higher)
- npm o yarn
- MySQL

### Pasos para la Instalación / Installation Steps

1. **Clonar el Repositorio / Clone the Repository**:
   ```bash
   git clone https://github.com/tu-usuario/auth-module.git
   cd auth-module
   ```

2. **Configurar el Backend (auth-service) / Configure the Backend (auth-service)**:
   - Navegar al directorio `auth-service` / Navigate to the `auth-service` directory:
     ```bash
     cd auth-service
     ```
   - Instalar dependencias / Install dependencies:
     ```bash
     npm install
     ```
   - Configurar las variables de entorno en `.env` / Configure environment variables in `.env`:
     ```env
     DATABASE_HOST=localhost
     DATABASE_PORT=3306
     DATABASE_NAME=strapi
     DATABASE_USERNAME=root
     DATABASE_PASSWORD=password
     DATABASE_SSL=false
     ```

3. **Configurar el Frontend (app-auth) / Configure the Frontend (app-auth)**:
   - Navegar al directorio `app-auth` / Navigate to the `app-auth` directory:
     ```bash
     cd ../app-auth
     ```
   - Instalar dependencias / Install dependencies:
     ```bash
     npm install
     ```

## Despliegue / Deployment

### Despliegue del Backend (auth-service) / Deploy the Backend (auth-service)

1. **Iniciar el Servidor de Desarrollo / Start the Development Server**:
   - Navegar al directorio `auth-service` / Navigate to the `auth-service` directory:
     ```bash
     cd auth-service
     ```
   - Iniciar el servidor / Start the server:
     ```bash
     npm run develop
     ```

### Despliegue del Frontend (app-auth) / Deploy the Frontend (app-auth)

1. **Iniciar el Servidor de Desarrollo / Start the Development Server**:
   - Navegar al directorio `app-auth` / Navigate to the `app-auth` directory:
     ```bash
     cd app-auth
     ```
   - Iniciar el servidor / Start the server:
     ```bash
     quasar dev
     ```

### Despliegue en Producción / Production Deployment

Para desplegar en producción, sigue los pasos específicos para tu proveedor de alojamiento. Asegúrate de configurar correctamente las variables de entorno y de usar HTTPS para las conexiones seguras.

To deploy in production, follow the specific steps for your hosting provider. Ensure that environment variables are properly configured and that HTTPS is used for secure connections.

## Uso / Usage

1. **Acceder a la Aplicación / Access the Application**:
   - Abre tu navegador y navega a `http://localhost:8080` para ver el cliente.
   - Usa las funcionalidades de registro e inicio de sesión para probar el módulo de autenticación.

   - Open your browser and navigate to `http://localhost:8080` to view the client.
   - Use the registration and login functionalities to test the authentication module.

## Contribuciones / Contributions

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerencias y mejoras.

Contributions are welcome. Please open an issue or a pull request for suggestions and improvements.

## Licencia / License

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
