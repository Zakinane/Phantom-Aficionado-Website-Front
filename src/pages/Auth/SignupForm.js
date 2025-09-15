import { useState } from "react";

function SignupForm({ onSignup, switchToLogin }) {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URI}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      const data = await res.json();

      if (data.token) {
        // On envoie email + token au parent (Auth)
        onSignup(formData.email, data.token);
      } else {
        setError("No token received from server");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div id="signup-form" className="active">
      <div className="title">
        <span className="rotate-txt">SIGN UP</span>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="form-container">
          {/* EMAIL */}
          <div className="field">
            <div className="field-container email">
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="Email"
                id="signup-email"
                required
              />
            </div>
          </div>
          {/* PASSWORD */}
          <div className="field">
            <div className="field-container password">
              <input
                type="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                id="signup-password"
                required
              />
            </div>
          </div>
          <div className="button-container green">
            <button type="submit" className="button">
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      </form>
      <div className="hint">
        Already have an account?{" "}
        <button onClick={switchToLogin} style={{ cursor: "pointer" }}>
          Log In!
        </button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignupForm;
