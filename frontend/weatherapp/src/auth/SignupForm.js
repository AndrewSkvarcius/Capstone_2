import React, { useState } from 'react';
import * as userService from "../userService"; // Import userService
import Alert from "../common/Alert";

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await userService.addUser(formData);
      if (result.success) {
        // Handle success scenario (e.g., navigate to login or home page)
      } else {
        setFormErrors(result.errors);
      }
    } catch (error) {
      // Handle API call errors
      setFormErrors([error.message]);
    }
  };

  return (
    <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h2 className="mb-3">User Registration</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {formErrors.length
                ? <Alert type="danger" messages={formErrors} /> // Assuming you have an Alert component
                : null}
            <button className="btn btn-primary float-right" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
