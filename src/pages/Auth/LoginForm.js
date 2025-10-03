import { useState } from "react";
import Button from "../../components/buttons/AnswerButton";

function LoginForm({ onLogin, switchToSignup, formData, setFormData }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URI}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      if (data.token) {
        onLogin(data.token);
      } else {
        setError("No token received from server");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-form" className="active">
      <div className="title-log-sign">
        <span className="rotate-txt">LOG IN</span>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-container">
          <div className="field">
            <div className="field-container login-email">
              <input
                type="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                placeholder="Email"
                id="login-email"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="field-container login-password">
              <input
                type="password"
                value={formData.password}
                name="password"
                minLength={6}
                onChange={handleChange}
                placeholder="Password"
                id="login-password"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            text={isLoading ? "Loading..." : "CONNECT"}
            shape="Zigzag"
            color="#ce0b0bff"
          />
        </div>
      </form>
      <div className="hint">
        Need an account?{" "}
        <button onClick={switchToSignup} style={{ cursor: "pointer" }}>
          Sign up!
        </button>
      </div>
      <div className="hint">
        {error && <p>{error}</p>}
        {isLoading && <p>Verifying your info (it might take a minute)</p>}
      </div>
    </div>
  );
}

export default LoginForm;
