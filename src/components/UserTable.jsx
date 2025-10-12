import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { Edit2, Trash2 } from "lucide-react";

// Status badge variant mapping
const statusVariant = (status) => {
  switch ((status || "").toLowerCase()) {
    case "active": return "success";
    case "inactive": return "secondary";
    case "banned": return "danger";
    case "pending": return "primary";
    case "suspended": return "warning";
    default: return "dark";
  }
};

// Convert ISO timestamp to relative time
function relativeTime(dateISO) {
  if (!dateISO) return "-";
  const now = new Date();
  const past = new Date(dateISO);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHr < 24) return `${diffHr} hours ago`;
  if (diffDay < 7) return `${diffDay} days ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} weeks ago`;
  return `${Math.floor(diffDay / 30)} months ago`;
}

// Format joined date for table
function formatDate(input) {
  if (!input) return "-";
  const d = new Date(input);
  if (!isNaN(d)) return d.toLocaleDateString();
  return input;
}

export default function UserTable({
  users = [],
  onEdit,
  onDelete,
  loading,
  theme = "light",
  selectedUsers = [], // ids of selected users
  onSelect,           // function to select/unselect a single user
  onSelectAll,        // function to select/unselect all visible users
}) {
  const isDark = theme === "dark";

  const allSelected = users.length > 0 && users.every((u) => selectedUsers.includes(u.id));

  return (
    <div className={`table-card p-3 rounded ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Table hover bordered responsive className={`mb-0 ${isDark ? "table-dark text-white" : "table-light text-dark"}`}>
        <thead className={isDark ? "table-dark" : "table-light"}>
          <tr>
            <th style={{ width: "40px" }}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
              />
            </th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Status</th>
            <th>Role</th>
            <th>Joined Date</th>
            <th>Last Active</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="9" className="text-center py-4">Loading...</td></tr>
          ) : users.length === 0 ? (
            <tr><td colSpan="9" className="text-center py-4">No users found</td></tr>
          ) : users.map((u, i) => {
            const checked = selectedUsers.includes(u.id);
            return (
              <tr key={u.id || i}>
                <td>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onSelect && onSelect(u.id, e.target.checked)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <div className="avatar me-2">{(u.name || "U").charAt(0)}</div>
                  <div>{u.name}</div>
                </td>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td><Badge bg={statusVariant(u.status)}>{u.status}</Badge></td>
                <td>{u.role}</td>
                <td>{formatDate(u.joinedDate)}</td>
                <td>{relativeTime(u.lastActive)}</td>
                <td>
                  <Button
                    size="sm"
                    variant={isDark ? "outline-light" : "outline-secondary"}
                    className="me-2"
                    onClick={() => onEdit && onEdit(u)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onDelete && onDelete(u.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
