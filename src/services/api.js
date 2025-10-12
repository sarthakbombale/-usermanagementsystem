import axios from "axios";

const API_BASE = "https://68ea1b4ff1eeb3f856e62e2c.mockapi.io/users/v1/usermanagementsystem";

// Get all users
export const getUsers = () => axios.get(API_BASE);

// Add a new user
export const addUser = (user) => axios.post(API_BASE, user);

// Update an existing user by ID
export const updateUser = (id, user) => axios.put(`${API_BASE}/${id}`, user);

// Delete a user by ID
export const deleteUser = (id) => axios.delete(`${API_BASE}/${id}`);
