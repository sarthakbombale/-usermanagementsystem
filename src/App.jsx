// Add these imports at the top
import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Sun, Moon } from "lucide-react";

import UserTable from "./components/UserTable.jsx";
import UserForm from "./components/UserForm.jsx";
import Filters from "./components/Filters.jsx";
import PaginationComp from "./components/Pagination.jsx";

import {
  getUsers,
  addUser as apiAddUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "./services/api.js";

const PAGE_SIZE = 10;

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);

  // **New state to track selected users for multi-delete**
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Light/Dark mode
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingUser) {
        await apiUpdateUser(editingUser.id, data);
        toast.success("User updated");
      } else {
        await apiAddUser(data);
        toast.success("User added");
      }
      setShowForm(false);
      setEditingUser(null);
      await fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;
    try {
      await apiDeleteUser(id);
      toast.success("User deleted");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // **Handle multi-delete**
  const handleDeleteSelected = async () => {
    if (!selectedUsers.length) return;
    const ok = window.confirm(`Delete ${selectedUsers.length} users?`);
    if (!ok) return;
    try {
      await Promise.all(selectedUsers.map((id) => apiDeleteUser(id)));
      toast.success(`${selectedUsers.length} users deleted`);
      setSelectedUsers([]);
      await fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // **Handle checkbox selection**
  const handleSelectUser = (id, checked) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, id]);
    } else {
      setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(filtered.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Filter users
  const filtered = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (q) {
      const matches =
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.username || "").toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (filterRole && u.role !== filterRole) return false;
    if (filterStatus && u.status !== filterStatus) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  useEffect(() => {
    setPage(1);
  }, [search, filterRole, filterStatus]);

  // Text-muted color based on theme
  const mutedColor = theme === "light" ? "#6c757d" : "#adb5bd";

  return (
    <Container
      fluid
      className="p-4"
      style={{
        backgroundColor: theme === "light" ? "#f8f9fa" : "#212529",
        color: theme === "light" ? "#212529" : "#e0e0e0",
        minHeight: "100vh",
      }}
    >
      <Row className="align-items-center mb-3">
        <Col>
          <h3>User Management</h3>
          <div style={{ color: mutedColor }}>
            Manage all users in one place. Control access, assign roles, and
            monitor activity across your platform.
          </div>
        </Col>
        <Col className="text-end">
          <Button
            variant={theme === "light" ? "secondary" : "light"}
            onClick={toggleTheme}
            className="me-2"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          <Button
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
            variant="primary"
          >
            + Add User
          </Button>
        </Col>
      </Row>

      <Filters
        search={search}
        setSearch={setSearch}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onClear={() => {
          setSearch("");
          setFilterRole("");
          setFilterStatus("");
        }}
        theme={theme}
      />

      {/* **Delete Selected Button** */}
      {selectedUsers.length > 0 && (
        <Button variant="danger" className="mb-3" onClick={handleDeleteSelected}>
          Delete Selected ({selectedUsers.length})
        </Button>
      )}

      <UserTable
        users={paginated}
        loading={loading}
        onEdit={(user) => {
          setEditingUser(user);
          setShowForm(true);
        }}
        onDelete={(id) => handleDelete(id)}
        theme={theme}
        selectedUsers={selectedUsers}      // new prop
        onSelect={handleSelectUser}         // new prop
        onSelectAll={handleSelectAll}       // new prop
      />

      <div
        className="d-flex justify-content-between align-items-center mt-3"
        style={{ color: mutedColor }}
      >
        <div>
          Rows per page: {PAGE_SIZE} &nbsp; | &nbsp; Showing {filtered.length}{" "}
          results
        </div>
        <PaginationComp page={page} setPage={setPage} totalPages={totalPages} />
      </div>

      {showForm && (
        <UserForm
          show={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
          onSave={handleSave}
          initialData={editingUser}
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}
