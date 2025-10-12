import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FiSearch, FiCalendar } from "react-icons/fi";
import { FaUserShield, FaUser, FaUserCog, FaUserAlt } from "react-icons/fa";
import { MdCheckCircle, MdCancel, MdPendingActions, MdBlock } from "react-icons/md";
import Select, { components } from "react-select";

// Role options with icons
const roleOptions = [
  { value: "Admin", label: "Admin", icon: <FaUserShield /> },
  { value: "User", label: "User", icon: <FaUser /> },
  { value: "Moderator", label: "Moderator", icon: <FaUserCog /> },
  { value: "Guest", label: "Guest", icon: <FaUserAlt /> },
];

// Status options with icons
const statusOptions = [
  { value: "Active", label: "Active", icon: <MdCheckCircle color="green" /> },
  { value: "Inactive", label: "Inactive", icon: <MdCancel color="gray" /> },
  { value: "Banned", label: "Banned", icon: <MdBlock color="red" /> },
  { value: "Pending", label: "Pending", icon: <MdPendingActions color="orange" /> },
  { value: "Suspended", label: "Suspended", icon: <MdBlock color="darkred" /> },
];

// Custom option renderer to include icon
const Option = (props) => (
  <components.Option {...props}>
    <span style={{ marginRight: 8 }}>{props.data.icon}</span>
    {props.data.label}
  </components.Option>
);

// Custom single value renderer to include icon
const SingleValue = (props) => (
  <components.SingleValue {...props}>
    <span style={{ marginRight: 8 }}>{props.data.icon}</span>
    {props.data.label}
  </components.SingleValue>
);

export default function Filters({
  search,
  setSearch,
  filterRole,
  setFilterRole,
  filterStatus,
  setFilterStatus,
  filterDate,
  setFilterDate,
  theme = "light", // pass light/dark mode
}) {
  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#343a40" : "white",
      color: theme === "dark" ? "white" : "black",
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === "dark" ? "white" : "black",
      display: "flex",
      alignItems: "center",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#495057"
          : "#e9ecef"
        : theme === "dark"
        ? "#343a40"
        : "white",
      color: theme === "dark" ? "white" : "black",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#343a40" : "white",
      color: theme === "dark" ? "white" : "black",
    }),
  };

  return (
    <div className="mb-3">
      <Row className="g-2">
        {/* Search input */}
        <Col md={4}>
          <div style={{ position: "relative" }}>
            <Form.Control
              placeholder="Search by name or email, date"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                paddingLeft: "2.5rem",
                backgroundColor: theme === "dark" ? "#343a40" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            />
            <FiSearch
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: theme === "dark" ? "#ced4da" : "#6c757d",
                pointerEvents: "none",
              }}
            />
          </div>
        </Col>

        {/* Role select */}
        <Col md={3}>
          <Select
            options={roleOptions}
            value={roleOptions.find((r) => r.value === filterRole)}
            onChange={(selected) => setFilterRole(selected ? selected.value : "")}
            placeholder="Select Role"
            components={{ Option, SingleValue }}
            styles={selectStyles}
          />
        </Col>

        {/* Status select */}
        <Col md={3}>
          <Select
            options={statusOptions}
            value={statusOptions.find((s) => s.value === filterStatus)}
            onChange={(selected) => setFilterStatus(selected ? selected.value : "")}
            placeholder="Select Status"
            components={{ Option, SingleValue }}
            styles={selectStyles}
          />
        </Col>

        {/* Date filter */}
        <Col md={2}>
          <div style={{ position: "relative" }}>
            <Form.Control
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{
                paddingLeft: "2.5rem",
                backgroundColor: theme === "dark" ? "#343a40" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            />
            <FiCalendar
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: theme === "dark" ? "#ced4da" : "#6c757d",
                pointerEvents: "none",
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
