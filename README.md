# Symptom Suggester

## Project Overview

The Symptom Suggester is a full-stack web application designed to help users identify potential medical conditions based on their symptoms and locate nearby hospitals. The application features a React-based frontend for an interactive user experience and a Node.js backend powered by the Groq LLM (Large Language Model) for intelligent symptom analysis and suggestions.

## Features

*   **Symptom Input**: Users can enter their symptoms in a natural language format.
*   **AI-Powered Suggestions**: Leverages Groq LLM to provide potential medical conditions based on the input symptoms.
*   **Hospital Search**: Allows users to find hospitals by location, including specific districts like Ananthapur, Andhra Pradesh.
*   **Responsive UI**: A modern and user-friendly interface built with React.

## Technologies Used

### Frontend

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool for modern web projects.
*   **CSS**: For styling the application.

### Backend

*   **Node.js**: JavaScript runtime for server-side logic.
*   **Express.js**: A minimal and flexible Node.js web application framework.
*   **Groq LLM**: Used for generating symptom-based suggestions.
*   **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
*   **Dotenv**: For loading environment variables from a `.env` file.

## Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

*   Node.js (version 24.x recommended)
*   npm (Node Package Manager)

### 1. Clone the Repository

```bash
git clone https://github.com/vijayjoel/symptom_checker.git
cd symptom_checker
```

### 2. Install Dependencies

This project uses `workspaces` to manage dependencies for both the frontend and backend. Run the following command from the root directory:

```bash
npm install
```

### 3. Environment Variables (Backend)

Create a `.env` file in the `backend/` directory and add your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

## Running the Application

### Run Backend in Development Mode

From the root directory, run:

```bash
npm run dev:backend
```

This will start the backend server, typically on `http://localhost:4000`.

### Run Frontend in Development Mode

From the root directory, run:

```bash
npm run dev:frontend
```

This will start the frontend development server, typically on `http://localhost:5173`.

### Run Both (Production Build & Start Backend)

From the root directory, you can build the frontend for production and then start the backend:

```bash
npm run build
```

## Vercel Deployment

The project is configured for deployment on Vercel using the `vercel.json` file. The configuration handles both the Node.js backend and the React static frontend.

### Key `vercel.json` configurations:

*   **Backend (`backend/server.js`)**: Deployed as a Node.js serverless function.
*   **Frontend (`frontend/`)**: Built as a static site, with the output directed to the `dist` folder.
*   **Rewrites**: Routes API requests to the backend and serves the frontend for all other routes.
*   **Install Command**: Uses `npm install` at the root to leverage workspaces for dependency management.

To deploy to Vercel, simply link your GitHub repository to Vercel, and it will automatically pick up the `vercel.json` configuration.

## Hospital Data

The `backend/services/hospitalService.js` file currently contains mock hospital data. You can extend this data or integrate a real database/API to manage hospital information more dynamically. Hospitals for Ananthapur district of Andhra Pradesh have been added as mock data.

## Contributing

Feel free to fork the repository, open issues, and submit pull requests.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.
