# AI-Based Recipe and Meal Planning

### By Fathalrhman Adam and Ekhlas Idris

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Future Work](#future-work)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Introduction

Welcome to our **AI-Based Recipe and Meal Planning**, a sophisticated mobile application crafted to transform the way you plan and prepare your meals. our app delivers personalized meal plans and recipe suggestions tailored to your unique dietary preferences and restrictions. This project represents the culmination of our Bachelor of Science in Honors in Software Engineering graduation endeavor.

## Project Overview

Our application seeks to revolutionize meal planning by integrating advanced AI capabilities with an intuitive user interface. The primary objectives include:

- **Personalized Meal Plans:** Generate meal plans that align with individual dietary needs, preferences, and health goals.
- **Recipe Suggestions:** Provide a curated selection of recipes complete with detailed cooking instructions.
- **Grocery List Generation:** Automatically create and categorize grocery lists based on selected recipes.
- **AI-Powered Recommendations:** Utilize AI to suggest recipes that match user preferences and similar user behaviors.
- **Integration with External APIs:** Enhance functionality by connecting with platforms like YouTube for cooking tutorials and Edamam for nutritional data.

## Features

- **User Authentication:**
  - Secure registration and login using JWT (JSON Web Tokens).
  - Profile management to update dietary preferences and personal information.

- **Personalized Meal Planning:**
  - AI-generated meal plans tailored to user-specific dietary requirements.
  - Option to customize meal plans based on preferences and restrictions.

- **Recipe Management:**
  - Browse an extensive collection of recipes with comprehensive instructions.
  - Save favorite recipes for quick access.

- **Grocery List Generation:**
  - Automatic creation of grocery lists based on selected recipes.
  - Categorization of items for efficient shopping.

- **Tutorials Integration:**
  - Access cooking tutorials via YouTube API integration.
  - Step-by-step video guides to assist in meal preparation.

- **AI Recommendations:**
  - Intelligent suggestions for new recipes based on user behavior and preferences.
  - Continuous learning to improve recommendation accuracy over time.

## Technologies Used

### Frontend

- **React.js:** Building dynamic and responsive user interfaces.
- **Redux Toolkit:** State management for seamless data flow.
- **Material-UI:** Pre-designed UI components for consistent styling.
- **Axios:** Handling HTTP requests to the backend API.

### Backend

- **Node.js & Express.js:** Creating a robust and scalable server.
- **Sequelize ORM:** Managing database interactions with PostgreSQL.
- **PostgreSQL:** Relational database for storing user data, recipes, and meal plans.
- **JWT (JSON Web Tokens):** Secure authentication mechanism.
- **OpenAI API:** Generating personalized meal plans using AI.
- **YouTube API:** Fetching cooking tutorials and integrating video content.
- **Edamam API:** Accessing nutritional data and enhancing recipe information.

### Other Tools

- **Git & GitHub:** Version control and collaborative development.
- **Docker:** Containerization for consistent development and deployment environments.
- **Postman:** API testing and documentation.
- **VS Code:** Integrated development environment (IDE) for coding.

## Installation

### Prerequisites

- **Node.js** (v21 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Fathalrhman26/our-project.git
   cd our-project/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory based on the provided `.env.sample`:

   ```env
   PORT=your port
   DATABASE_URL=postgres://username:password@localhost:gate/database_name
   JWT_SECRET=YourStrongJWTKey
   OPENAI_API_KEY= Your_OPENAI_API_KEY
   EDAMAM_APP_ID=your_edamam_app_id
   EDAMAM_APP_KEY=your_edamam_app_key
   YOUTUBE_API_KEY= Your_YOUTUBE_API_KEY
   ```

4. **Run Database Migrations:**

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the Backend Server:**

   ```bash
   npm start
   ```

   The backend server should now be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `frontend` directory:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the Frontend Application:**

   ```bash
   npm start
   ```

   The frontend app should now be running on `http://localhost:3000`.

## Usage

1. **Register an Account:**

   - Navigate to the Sign-Up page.
   - Enter your details and register.

2. **Set Up Your Profile:**

   - After logging in, update your dietary preferences, restrictions, and health goals.

3. **Generate Meal Plan:**

   - Click on the "Generate Meal Plan" button to receive a personalized meal plan based on your preferences.

4. **Browse Recipes:**

   - Explore and save recipes to your favorites.

5. **Manage Grocery List:**

   - Automatically generate and manage your grocery list based on your meal plan.

6. **Access Tutorials:**

   - View cooking tutorials integrated from YouTube.

## Architecture

### Frontend

- **React.js:** Constructs the user interface with reusable components.
- **Redux Toolkit:** Manages global state, facilitating efficient data flow between components.
- **Material-UI:** Provides a consistent and responsive design framework.
- **Axios:** Handles asynchronous HTTP requests to interact with the backend API.

### Backend

- **Express.js:** Serves as the backbone for building RESTful APIs.
- **Sequelize ORM:** Facilitates database operations and schema management with PostgreSQL.
- **JWT Authentication:** Secures endpoints and manages user sessions.
- **OpenAI API Integration:** Utilizes AI to generate tailored meal plans based on user data.
- **YouTube API Integration:** Fetches and displays relevant cooking tutorials within the app.
- **Edamam API Integration:** Enhances recipe information with detailed nutritional data.

### Database

- **PostgreSQL:** Stores all essential data, including user profiles, recipes, meal plans, and grocery lists.


## Future Work

- **Open Sourcing the Project:**
  - Following our project defense, we plan to open source the project to allow community contributions and enhancements.

- **Enhancements:**
  - **Mobile Application:** Develop native mobile apps for iOS and Android platforms.
  - **Advanced AI Features:** Incorporate more sophisticated AI algorithms for improved meal plan accuracy.
  - **Real-Time Collaboration:** Enable users to share meal plans and grocery lists with family or friends.
  - **Expanded Recipe Database:** Integrate additional APIs to provide a more extensive range of recipes.
  - **User Feedback Mechanism:** Allow users to rate recipes and provide feedback to refine AI recommendations.

## Contributing

**Note:** Currently, this project is not accepting external contributions as it is undergoing its final development and evaluation phase. Post-defense, we may consider open-sourcing the project, at which point contributions will be welcome. Stay tuned for updates!

## License

This project is currently proprietary and all rights are reserved. Upon successful defense and open-sourcing, an appropriate open-source license will be applied.

## Contact

If you have any questions or concerns, feel free to reach out to us:

- **Fathalrhman Adam:** [fathalrhman26@email.com](mailto:fathalrhman26@email.com)
- **Ekhlas Idris:** [ekhlasidris28@email.com](mailto:ekhlasidris28@email.com)

## Acknowledgements

- **Mentors and Advisors:** Special thanks to our mentors who provided invaluable guidance throughout this project.
- **API Providers:** Gratitude to OpenAI, Edamam, and YouTube for their APIs which powered our application.
- **Team Members:** Appreciation for the collaborative efforts and dedication of all team members involved.

## Stay Tuned!

We are excited to share our progress and the final product with you. Follow our repository for updates, and thank you for your interest in our AI-Based Recipe and Meal Planning App!

---