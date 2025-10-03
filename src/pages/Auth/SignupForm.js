import { useState } from "react";
import Button from "../../components/buttons/AnswerButton";

function SignupForm({ onSignup, switchToLogin, formData, setFormData }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URI}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "An error occurred");
      }

      if (data.token) {
        onSignup(data.token);
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
    <div id="signup-form" className="active">
      <div className="title-log-sign">
        <span className="rotate-txt">SIGN UP</span>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="form-container">
          <div className="field">
            <div className="field-container signup-email">
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
          <div className="field">
            <div className="field-container signup-password">
              <input
                type="password"
                value={formData.password}
                minLength={6}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                id="signup-password"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            text={isLoading ? "Loading..." : "CREATE ACCOUNT"}
            shape="NoTail"
            color="#efdc0bff"
            isComingLeft={false}
          />
        </div>
      </form>
      <div className="hint">
        Already have an account?{" "}
        <button onClick={switchToLogin} style={{ cursor: "pointer" }}>
          Log In!
        </button>
      </div>
      <div className="hint">
        {error && <p>{error}</p>}
        {isLoading && <p>Verifying your info (it can take a minute)</p>}
      </div>
    </div>
  );
}

export default SignupForm;
