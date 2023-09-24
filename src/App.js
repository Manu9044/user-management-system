import React from "react";
import UserForm from "../src/components/UserForm";
import UserList from "../src/components/UserList";
import "./styles.css";

function App() {
  return (
    <div className="container">
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
