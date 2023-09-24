import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../redux/userSlice";
const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser({ id }));
    }
  };

  const handleUpdate = (user) => {
    const newEmail = prompt("Enter new email:", user.email);
    if (newEmail) {
      const updatedUser = { ...user, email: newEmail };
      dispatch(updateUser(updatedUser));
    }
  };

  return (
    <div className="user-list">
      {users.length === 0 ? (
        <p className="no-record">No records found.</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.photo} alt="" className="user-photo" />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Mobile No:</strong> {user.mobileNo}
            </p>
            <p>
              <strong>Date of Birth:</strong> {user.dateOfBirth}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {Object.entries(user.skills)
                .map(([key, value]) => value && key)
                .filter(Boolean)
                .join(", ")}
            </p>
            <div className="actions">
              <button
                className="update-button"
                onClick={() => handleUpdate(user)}
              >
                Update
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
