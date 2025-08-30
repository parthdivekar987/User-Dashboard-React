# User-Dashboard-React
A single-page application for a web development assignment, built using React, Vite, and Recharts. Includes a dynamic dashboard with charts and a full-featured user list with client-side routing, search, sorting, and pagination.


User Management Dashboard
A single-page application built for a web development assignment, using React, Vite, and Recharts. This project features a dynamic dashboard for visualizing user data from a mock API and a comprehensive user list with full search, sort, and pagination capabilities.

Live Demo URL: [Your Deployed URL Will Go Here]

GitHub Repository: [Your GitHub Repo URL Will Go Here]

Features Implemented
1. Dashboard View
Data Visualization: Displays key metrics with interactive charts powered by Recharts.

KPI Card: A clear "Total Users" card for an at-a-glance overview.

User Growth Chart: A line chart showing the number of new users created per day over the last 30 days.

Avatar Distribution Chart: A pie chart illustrating the percentage of users with and without a profile avatar.

Recent Users List: A list showcasing the 5 most recently registered users.

Responsive Layout: A clean, single-column vertical layout that works well on all screen sizes.

Interactive UI: Subtle hover effects on all cards for a better user experience.

2. User List View
Client-Side Routing: Utilizes React Router for clean, shareable URLs (/dashboard, /users, /users/new).

Real-time Search: Instantly filter users by name or email as you type.

Dynamic Sorting: Sort the user list by "Name" or "Joined Date" in both ascending and descending order by clicking the table headers.

In-Memory Pagination: The user list is cleanly paginated, showing 10 users per page.

User Details Modal: Clicking on any user row opens a modal with that user's detailed information.

Create User Page: Includes a dedicated route and UI placeholder at /users/new for adding new users, complete with styled navigation buttons.

Custom Avatars: Displays user avatars from the API, with a default placeholder for users without one, and a specific custom avatar for a designated user ("Gaurav").

Technologies Used
Frontend Library: React.js

Build Tool: Vite

Routing: React Router DOM

Charting: Recharts

Programming Language: JavaScript (ES6+)

Styling: CSS3 (with custom properties for theming)

Packages & Dependencies
This project was bootstrapped with Vite and relies on the following key packages:

react & react-dom: For building the user interface.

recharts: For creating the beautiful and interactive charts on the dashboard.

react-router-dom: For handling all client-side routing and navigation.
