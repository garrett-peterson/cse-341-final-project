# CSE 341 Final Project

This repository contains the team project for CSE 341.

## Requirements

Before setting up the project, make sure you have the following installed:

- Node.js
- npm
- Git
- VS Code or another code editor

## Project Setup

### 1. Clone the Repository

Clone the repository to your computer and open the project folder in VS Code.

### 2. Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
npm install express-validator
```

This will install all dependencies listed in `package.json`.

### 3. Create the Environment File

Create a file named:

```text
.env
```

in the root of the project.

Add the following environment variables:

```env
MONGODB_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Ask the team for the correct values for these variables.

Do not commit the `.env` file to GitHub.

### 4. Generate Swagger Documentation

Run:

```bash
node swagger.js
```

This generates the `swagger.json` file used by the Swagger documentation.

Whenever API routes are added or changed, run this command again to regenerate the Swagger documentation.

### 5. Start the Server

Run:

```bash
npm start
```

The Express server should start on:

```text
http://localhost:3000
```

### 6. View Swagger Documentation

After the server is running, open:

```text
http://localhost:3000/api-docs
```

This page contains the Swagger documentation for the API.

### 7. Render Deployment

To view the live application on Render, open:
[cse-341-final-project-r0ix.onrender.com](https://cse-341-final-project-r0ix.onrender.com)

## Project Structure

```text
controllers/
    Contains controller functions and API request handling.

data/
    Contains the database connection and data-access code.

middleware/
    Contains authentication and other Express middleware.

routes/
    Contains the API route definitions.

index.js
    Main entry point for the Express application.

swagger.js
    Generates the swagger.json file.

swagger.json
    Generated Swagger API documentation.

.env
    Contains local environment variables and credentials.
    This file should not be committed to GitHub.

package.json
    Contains project dependencies and npm scripts.
```

## Running the Project

After the initial setup, the normal workflow is:

```bash
npm install
node swagger.js
npm start
```

Then open:

```text
http://localhost:3000
```

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

## Swagger

Swagger documentation is generated using `swagger-autogen`.

If you add or modify API routes, regenerate the Swagger documentation with:

```bash
node swagger.js
```

This will update:

```text
swagger.json
```

## Environment Variables

The project currently uses the following environment variables:

```env
MONGODB_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

These values should be stored only in your local `.env` file.

Never commit passwords, client secrets, database credentials, or other private information to GitHub.

## Git Ignore

Make sure the following are included in `.gitignore`:

```gitignore
.env
node_modules/
```

## Database

The MongoDB database setup will be added separately.

Once the database setup is complete, update this README with any additional instructions required to connect to the database, including the database name, collections, or any other setup steps the team needs.

## Team Workflow

Before beginning work:

1. Pull the latest changes from the repository.
2. Run `npm install` if dependencies have changed.
3. Make sure your `.env` file contains the required environment variables.
4. Run `node swagger.js` if API routes have changed.
5. Run `npm start` to start the local server.

Do not commit:

```text
.env
node_modules/
```
