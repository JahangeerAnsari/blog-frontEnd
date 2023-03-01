import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import userRegisteration from "../../apis/authentication/userSignup";
import Logo from "../../img/logo.png";
import {
  registerUserAction,reset
} from "../../redux/slices/users/authSlices";
import { useDispatch, useSelector } from "react-redux";
import "./signup.css";
import { toast } from "react-toastify";

const initialValue = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupDetails, setSignupDetails] = useState(initialValue);
  const { isError, isLoading, isSuccess, message, user } = useSelector(
    (store) => store?.users
  );
  const notifyS = (msg) => toast.success(msg);
  const notifyE = (msg) => toast.error(msg);

  useEffect(() => {
    if (isError) {
      notifyE(message)
    }
    if (isSuccess) {
      console.log("isSuccess", isSuccess);
      notifyS(message)
       navigate("/signin");
    }

     dispatch(reset()); 
  }, [dispatch, isError, isSuccess, message, navigate, user]);


  const handleSignFormChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    console.log("signupDetails", signupDetails);
    const payload = {
      name: signupDetails.name,
      email: signupDetails.email,
      password: signupDetails.password,
    };
    dispatch(registerUserAction(payload));
  };
  return (
    <div className="signup">
      <div className="form-container">
        <img className="signupLogo" src={Logo} alt="instagram logo" />
        <p>Sign up to see photos ans videos</p>

        <form onSubmit={handleSignupFormSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={signupDetails.name}
              placeholder="enter name"
              onChange={handleSignFormChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="email"
              value={signupDetails.email}
              placeholder="enter email"
              onChange={handleSignFormChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              value={signupDetails.password}
              placeholder="enter password"
              onChange={handleSignFormChange}
            />
          </div>
          <div className="register">
            <button type="submit">Register</button>
          </div>
        </form>
        <div className="form2">
          <span>Already have an Account ?</span>
          <Link to="/signin">
            <spna>SignIn</spna>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
