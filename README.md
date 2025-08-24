# MERN Expense Tracker 📊

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) to help users track their income and expenses. This application features a secure authentication system, an intuitive dashboard for a quick financial overview, interactive charts for data visualization, and the ability to export financial reports.



## Features ✨

-   **Secure Authentication**: User login and sign-up using JSON Web Tokens (JWT).
-   **Dashboard Overview**: At-a-glance summary of total balance, income, and expenses.
-   **Income & Expense Management**: Full CRUD (Create, Read, Update, Delete) functionality for income and expenses.
-   **Data Filtering & Sorting**: Filter transactions by a specific date range and sort by date or amount.
-   **Interactive Analytics**: A dedicated analytics page with a doughnut chart to visualize spending habits by category.

---
## Tech Stack 🛠️

### Frontend

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A modern and fast frontend build tool.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **React Router**: For handling client-side routing.
-   **Chart.js**: For creating responsive and interactive charts.
-   **Axios**: For making promise-based HTTP requests to the backend API.

### Backend

-   **Node.js**: A JavaScript runtime environment.
-   **Express**: A minimal and flexible web application framework for Node.js.
-   **MongoDB**: A NoSQL database for storing application data.
-   **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
-   **JSON Web Token (JWT)**: For implementing secure authentication.
-   **bcryptjs**: For hashing user passwords.
-   **ExcelJS**: For generating Excel files for data export.

---
## Getting Started 🚀

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have **Node.js** and **MongoDB** installed on your system.
-   You can get a free MongoDB Atlas cluster [here](https://www.mongodb.com/cloud/atlas).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone (https://github.com/Nishitha-1516/expense-tracker)
    cd expense-tracker
    ```

2.  **Backend Setup:**
    ```bash
    # Navigate to the server directory
    cd server

    # Install dependencies
    npm install

    # Create a .env file in the /server directory
    touch .env
    ```
    Add the following environment variables to your `server/.env` file:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key_for_jwt
    ```

3.  **Frontend Setup:**
    ```bash
    # Navigate to the client directory from the root folder
    cd ../client

    # Install dependencies
    npm install
    ```

---
## Available Scripts

### Backend Server

```bash
# To run the backend server (from the /server directory)
npm start
