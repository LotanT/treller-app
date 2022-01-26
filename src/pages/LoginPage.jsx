import { useState, useEffect } from "react";
import { userService } from "../services/user.service";

export function LoginSignup(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    fullname: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const users = await userService.getUsers();
    setUsers(users);
  }, []);

  const clearState = () => {
    setCredentials({ username: "", password: "", fullname: "" });
    setIsSignup(false);
  };

  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  };

  const onLogin = (ev = null) => {
    if (ev) ev.preventDefault();
    if (!credentials.username) return;
    props.onLogin(credentials);
    clearState();
  };

  const onSignup = (ev = null) => {
    if (ev) ev.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return;
    props.onSignup(credentials);
    clearState();
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <section className="login-page">
      <div className="login-cmp">
        <p>
          <a onClick={toggleSignup}>
            {!isSignup
              ? "Signup to Treller!"
              : "Login into your Treller account"}
          </a>
        </p>
        {!isSignup && (
          <form className="login-form" onSubmit={onLogin}>
            <div className="field">
              <select
                name="username"
                value={credentials.username}
                onChange={handleChange}
                autoFocus
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user.username}>
                    {user.fullname}
                  </option>
                ))}
              </select>
            </div>
            {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={this.handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        required
                    /> */}
            <a className="grey-btn">Login!</a>
          </form>
        )}
        <div className="signup-section">
          {isSignup && (
            <form className="signup-form" onSubmit={onSignup}>
              <div className="fields">
                <div className="field">
                  <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Fullname"
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <a className="grey-btn">Signup!</a>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
