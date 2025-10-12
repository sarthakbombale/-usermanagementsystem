import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function UserForm({ show = true, onClose, onSave, initialData }) {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name || "");
      setValue("email", initialData.email || "");
      setValue("username", initialData.username || "");
      setValue("role", initialData.role || "User");
      setValue("status", initialData.status || "Active");
    } else {
      reset();
    }
  }, [initialData, reset, setValue]);

  const submit = (data) => {
    const now = new Date().toISOString();

    if (!initialData) {
      // New user
      data.joinedDate = now;
      data.lastActive = now;
    } else {
      // Keep existing joinedDate, update lastActive to now
      data.joinedDate = initialData.joinedDate;
      data.lastActive = now;
    }

    onSave(data);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control {...register("name", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register("email", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control {...register("username", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select {...register("role")}>
              <option>User</option>
              <option>Admin</option>
              <option>Moderator</option>
              <option>Guest</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select {...register("status")}>
              <option>Active</option>
              <option>Inactive</option>
              <option>Banned</option>
              <option>Pending</option>
              <option>Suspended</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">Cancel</Button>
            <Button type="submit" variant="primary">{initialData ? "Save changes" : "Add user"}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
