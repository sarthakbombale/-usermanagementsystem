🧑‍💼 User Management Dashboard

A modern, responsive User Management Dashboard built with React, featuring full CRUD operations, live filtering, pagination, and support for dark/light themes. Designed for scalability, clean UI, and ease of integration with APIs.

🚀 Features

User CRUD Management – Add, edit, and delete users with instant UI updates.

Bulk Delete – Select multiple users and remove them in one click.

Advanced Filtering & Search – Filter by role, status, or keyword in real time.

Pagination – Client-side pagination for large user lists.

Light/Dark Mode – Toggle seamlessly between light and dark themes.

Responsive Design – Fully optimized for desktop, tablet, and mobile.

Toast Notifications – User-friendly feedback for all actions.

🛠️ Tech Stack
Category	Technology
Frontend	React 18+, React-Bootstrap, Lucide Icons
Styling	CSS3 (custom + Bootstrap), Light/Dark Theme
Notifications	React-Toastify
API Layer	Axios-based service (CRUD-ready)
Build Tool	Vite / Create React App (depending on setup)

Project STructure
src/
├── components/
│   ├── UserTable.jsx        # Displays users with multi-delete
│   ├── UserForm.jsx         # Add/Edit user modal
│   ├── Filters.jsx          # Search, role, and status filters
│   └── Pagination.jsx       # Custom pagination component
│
├── services/
│   └── api.js               # API methods (getUsers, addUser, etc.)
│
├── App.jsx                  # Main app logic
├── style.css                # Theme and UI styling





🌗 Dark / Light Theme

You can toggle between Dark 🌑 and Light ☀️ modes using the theme button in the top-right corner of the dashboard.
All elements (text, tables, forms, and modals) automatically adapt to the selected theme.

🧩 API Integration

You can connect this dashboard to your backend API by updating src/services/api.js.
Each API call is structured like this:

export const getUsers = () => axios.get("/api/users");
export const addUser = (data) => axios.post("/api/users", data);
export const updateUser = (id, data) => axios.put(`/api/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`/api/users/${id}`);


Simply replace the endpoint URLs with your backend API routes.

🧹 Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Run linter checks
💅 Design Guidelines

Primary Color: #0d6efd (Bootstrap primary)

Dark Background: #212529

Light Background: #f8f9fa

Font: System UI / Inter / Roboto



Thank You

└── main.jsx                 # React entry point
