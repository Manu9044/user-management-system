import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";

const UserForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");
  const [skills, setSkills] = useState({
    communication: false,
    criticalThinking: false,
    problemSolving: false,
    initiative: false
  });

  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !email ||
      !mobileNo ||
      !dateOfBirth ||
      !city ||
      !photo
    ) {
      alert("All fields are mandatory!");
      return false;
    }

    const isAnySkillChecked = Object.values(skills).some((skill) => skill);
    if (!isAnySkillChecked) {
      alert("Please select at least one skill!");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    if (isUserDuplicate()) {
      alert("A user with the same name already exists!");
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      gender,
      email,
      mobileNo,
      dateOfBirth,
      city,
      skills,
      photo
    };

    dispatch(addUser(newUser));
    alert("User added!");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isUserDuplicate = () => {
    return users.some(
      (user) => user.firstName === firstName && user.lastName === lastName
    );
  };

  return (
    <div>
      <h3 className="header">User Management System</h3>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <div>
        <label>
          <input
            type="radio"
            value="Male"
            checked={gender === "Male"}
            onChange={() => setGender("Male")}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="Female"
            checked={gender === "Female"}
            onChange={() => setGender("Female")}
          />
          Female
        </label>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Mobile No."
        pattern="[0-9]{10}"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        <option value="City1">City1</option>
        <option value="City2">City2</option>
      </select>
      <div>
        <label>
          <input
            type="checkbox"
            checked={skills.communication}
            onChange={(e) =>
              setSkills((s) => ({ ...s, communication: e.target.checked }))
            }
          />
          Communication
        </label>
        <label>
          <input
            type="checkbox"
            checked={skills.criticalThinking}
            onChange={(e) =>
              setSkills((s) => ({ ...s, criticalThinking: e.target.checked }))
            }
          />
          Critical Thinking
        </label>
      </div>
      <input type="file" id="fileInput" onChange={handlePhotoChange} />
      <button className="save-button" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default UserForm;
