# Sync-Workbench API

Sync-Workbench is a powerful workforce management solution designed to streamline and optimize employee operations. This API serves as the backend for managing employees, projects, and overall performance.

## Features

- **Role-Based Access Control (RBAC):** Define and manage roles (Admin, Manager, Employee, HR) with fine-grained permissions.
- **Advanced Reporting & Analytics:** Generate reports on employee performance, attendance, and project involvement.
- **Employee Performance Management:** Tools for goal setting, tracking, and evaluations with 360-degree feedback.
- **Automated Onboarding & Offboarding:** Streamlined workflows for onboarding/offboarding employees.
- **Time & Attendance Tracking:** Real-time attendance integration with leave and shift management.
- **Project & Task Management Integration:** Assign projects, track tasks, and integrate with tools like Jira, Trello, etc.
- **Skill & Certification Management:** Maintain skill databases, certification tracking, and renewal reminders.
- **Internal Communication Tools:** Messaging, video conferencing, and collaboration spaces.
- **Comprehensive Employee Profiles:** Profiles with personal info, job history, skills, and custom fields.
- **Compliance & Document Management:** Secure storage for contracts, NDAs, and audit trails.
- **Payroll & Benefits Management:** Payroll processing with tax calculations, benefits, and bonuses.
- **Employee Self-Service Portal:** Self-service for personal info updates, leave requests, and pay slips.
- **Custom Workflow Automation:** Automate repetitive tasks like leave approvals and expense claims.
- **Multi-Department & Location Support:** Manage employees across multiple departments and locations.
- **Integration with HR & IT Systems:** APIs for seamless integration with existing systems.
- **Data Security & Privacy:** Robust encryption, role-based access, and GDPR compliance.
- **Customization & Scalability:** Customizable dashboards, workflows, and scalable architecture.

---

## I. Installation

**Using `curl`**

```bash
<(curl -s https://raw.githubusercontent.com/eaysin-arafat/sync-workbench-api/main/scripts/setup.sh)
```

**Manual Method**
1. Clone the repository:

   ```bash
   git clone https://github.com/eaysin-arafat/sync-workbench-api.git
   cd sync-workbench-api
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

## II. Configuration

1. Create a .env file in the root directory:
   ```bash
   cp .env.example .env
   ```
2. Update the environment variables in .env:
   ```dotenv
   NODE_ENV="development"
   PORT="3000"
   DB_CONNECTION_URL="mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/"
   ACCESS_TOKEN_SECRET="<your-access-token-secret>"
   REFRESH_TOKEN_SECRET="<your-refresh-token-secret>"
   ACCESS_TOKEN_EXPIRATION="15m"
   REFRESH_TOKEN_EXPIRATION="7d"
   ```

## III. Development

Start the development server

```bash
yarn dev
```

This command starts the API server and a MongoDB container using docker-compose.

- 🌏 API Server: http://localhost:3000
- ⚙️ Swagger UI: http://localhost:3000/dev/api-docs
- 🛢️ MongoDB: mongodb://localhost:27017

## IV. Deployment

**Build and Run without Docker**

```bash
yarn build && yarn start
```

**Run with Docker**

```bash
Copy code
docker build -t sync-workbench-api .
docker run -t -i \
  --env NODE_ENV=production \
  --env DB_CONNECTION_URL=mongodb://host.docker.internal:27017/employees \
  -p 3000:3000 \
  sync-workbench-api
```

**Run with Docker Compose**

```bash
Copy code
docker-compose up
```

## Environment Variables

To configure the application, create a `.env` file in the root directory and copy the contents of `.env.default` as a starting point.

Below are the available environment variables and their descriptions:

| Variable Name              | Type   | Default Value                                              | Description                                              |
| -------------------------- | ------ | ---------------------------------------------------------- | -------------------------------------------------------- |
| `NODE_ENV`                 | string | `development`                                              | API runtime environment (e.g., `staging`, `production`). |
| `PORT`                     | number | `3000`                                                     | The port on which the API server runs.                   |
| `DB_CONNECTION_URL`        | string | `mongodb+srv://eaysinarafat:password@cluster.mongodb.net/` | MongoDB connection string.                               |
| `DB_USERNAME`              | string | `eaysinarafat`                                             | Username for MongoDB authentication.                     |
| `DB_PASSWORD`              | string | `password`                                                 | Password for MongoDB authentication.                     |
| `APPLICATION_NAME`         | string | `sync-workbench`                                           | Name of the application.                                 |
| `ACCESS_TOKEN_SECRET`      | string | `your-access-token-secret`                                 | Secret key used for signing JWT access tokens.           |
| `REFRESH_TOKEN_SECRET`     | string | `your-refresh-token-secret`                                | Secret key used for signing JWT refresh tokens.          |
| `ACCESS_TOKEN_EXPIRATION`  | string | `15m`                                                      | Expiration time for access tokens (e.g., `15m`, `1h`).   |
| `REFRESH_TOKEN_EXPIRATION` | string | `7d`                                                       | Expiration time for refresh tokens (e.g., `7d`).         |

### Notes:

- Ensure that sensitive information like `DB_PASSWORD` and token secrets are kept secure and not exposed in your codebase.
- Use environment-specific `.env` files for different deployment environments (e.g., `.env.staging`, `.env.production`).

## Logging

The application uses Winston for logging. Logs are saved in ./logs and in /logs within the Docker container.

- Prettified console logs for development.
- JSON-structured logs for production.

### Directory Structure

```
+-- scripts
|   +-- dev.sh
|   +-- setup-github-actions.sh
+-- src
|   +-- controllers
|   |   +-- book
|   |   |   +-- add.ts
|   |   |   +-- all.ts
|   |   |   +-- get.ts
|   |   |   +-- index.ts
|   |   |   +-- remove.ts
|   |   |   +-- search.ts
|   +-- errors
|   |   +-- application-error.ts
|   |   +-- bad-request.ts
|   +-- lib
|   |   +-- safe-mongo-connection.ts
|   |   +-- winston-console-transport.ts
|   +-- middleware
|   |   +-- request-middleware.ts
|   +-- models
|   |   +-- Book.ts
|   +-- public
|   |   +-- index.html
|   +-- app.ts
|   +-- logger.ts
|   +-- routes.ts
|   +-- server.ts
+-- .env.default
+-- .gitignore
+-- .gitpod.yml
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- jest.config.js
+-- LICENSE
+-- nodemon.json
+-- openapi.yml
+-- package.json
+-- README.md
+-- renovate.json
+-- tsconfig.json
+-- yarn.lock
```

## Testing

Run tests using Jest:

```bash
Copy code
yarn test
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Feel free to submit issues or pull requests on GitHub.

## Contact

For queries, please reach out to Eaysin Arafat via the repository's issue tracker.
