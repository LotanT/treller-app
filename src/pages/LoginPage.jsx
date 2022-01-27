import { useState } from "react";
import { connect } from "react-redux";
import { onLogin, onSignup, onGoogleLogin } from "../store/user.actions";
import { GoogleLogin } from "react-google-login";
// import { useGoogleLogin } from 'react-google-login'
import MainLogo from "../assets/imgs/header/main-logo.png";
import rightImg from "../assets/imgs/login/right.png";
import leftImg from "../assets/imgs/login/left.png";

function _LoginSignup(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    fullname: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const clearState = () => {
    setCredentials({ username: "", password: "", fullname: "" });
    setIsSignup(false);
  };

  const handleGoogleFaliure = (res) => {
    alert(res);
  };

  const handleGoogleLogin = (data) => {
    console.log(data);
    const password = data.googleId;
    const username = data.profileObj.givenName;
    const fullname = data.profileObj.name;
    const credentials = { username, password, fullname };
    console.log(credentials);
    props.onGoogleLogin(credentials);
    clearState();
    props.history.push("/userboards");
  };

  const handleChange = (ev) => {
    console.log(credentials);
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  };

  const onLogin = (ev = null) => {
    if (ev) ev.preventDefault();
    if (!credentials.username) return;
    props.onLogin(credentials);
    clearState();
    props.history.push("/userboards");
  };

  const onSignup = (ev = null) => {
    console.log('signup',credentials);
    if (ev) ev.preventDefault();
    if (
      !credentials.username ||
      !credentials.password ||
      !credentials.fullname
    ) {
      return;
    }
    props.onSignup(credentials);
    clearState();
    props.history.push("/userboards");
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <section className="login-page">
      <div className="header-logo">
        <img src={MainLogo}></img>
      </div>
      <div className="login-main">
        <div className="left-img-container">
          <img className="login-img" src={leftImg}></img>
        </div>
        <div className="login-cmp">
          <p>
            <a className="login-title">
              {!isSignup ? "Log in to Treller" : "Sign up for your account"}
            </a>
          </p>
          {!isSignup && (
            <form className="login-form">
              <div className="fields">
                <input
                  type="text"
                  name="username"
                  // value={credentials.username}
                  placeholder="Enter username"
                  onChange={handleChange}
                  required
                  autoFocus
                />
                <input
                  type="password"
                  name="password"
                  // value={credentials.password}
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />
              </div>

              <a className="grey-btn" onClick={onLogin}>
                Log in
              </a>
              <div className="or">OR</div>
              <GoogleLogin
                // style={{ width: 300 }}
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText={"Continue with Google"}
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleFaliure}
                cookiePolicy="single_host_origin"
              ></GoogleLogin>
              <hr></hr>
              <h5 className="go-to-btn" onClick={toggleSignup}>
                Sign up for an account
              </h5>
            </form>
          )}
          <div className="signup-section">
            {isSignup && (
              <form className="signup-form" >
                <div className="fields">
                  <div className="field">
                    <input
                      type="text"
                      name="fullname"
                      // value={credentials.fullname}
                      placeholder="Enter full name"
                      onChange={handleChange}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="field">
                    <input
                      type="text"
                      name="username"
                      // value={credentials.username}
                      placeholder="Enter username"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      name="password"
                      // value={credentials.password}
                      placeholder="Enter password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <a className="grey-btn" onClick={onSignup}>
                  Sign up
                </a>
                <div className="or">OR</div>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText={"Continue with Google"}
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleFaliure}
                  cookiePolicy="single_host_origin"
                ></GoogleLogin>
                <hr></hr>
                <h5 className="go-to-btn" onClick={toggleSignup}>
                  Already have an account? Log In
                </h5>
              </form>
            )}
          </div>
        </div>
        <div className="right-img-container">
          <img className="login-img" src={rightImg}></img>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  onLogin,
  onSignup,
  onGoogleLogin,
};

export const LoginSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginSignup);
