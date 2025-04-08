import React, { useState } from "react";
import { API_URL } from "../../helpers/ApiPath";
import { ThreeCircles } from "react-loader-spinner";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error);
        alert("Registration Failed, Contact Admin");
      }
    } catch (error) {
      console.error("Registration failed");
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      {loading && <div className="loaderSection">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Hi, Your Registration under process</p>
        </div>}
      {!loading && 
        <form className="authForm" onSubmit={handleSubmit} autoComplete="off">
          <h3>Vendor Register</h3>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
          <br />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <br />
          <label>Password</label>
          <input
            type={showPassword? "text":"password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <br />
          <span className="showPassword" onClick={handleShowPassword}>
            {showPassword ? 'Hide' : 'show'}
          </span>
          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>}
    </div>
  );
};

export default Register;
