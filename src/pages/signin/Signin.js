import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
// import userLoginResponse from "../../apis/authentication/userLogin";
import {
  userLoginAction,reset
} from "../../redux/slices/users/authSlices";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../img/logo.png";
import { toast } from "react-toastify";
import './signin.css';
const initialValue = {
  
  email: "",
  password: "",
};

const Signin = () => {
  const [signinDetails, setSigninDetails] = useState(initialValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifyS = (msg) => toast.success(msg);
  const notifyE = (msg) => toast.error(msg);

  const { isError, isLoading, isSuccess, message,user} = useSelector(
    (store) => store?.users
  );


  useEffect(() =>{ 
     if(isError){
      notifyE(message);
     }

     if(isSuccess){
      notifyS(message);
      navigate("/");
     }
   dispatch(reset())
  },[dispatch, isError, isSuccess, message, navigate,user])

  const handleSignFormChange = (e) => {
    const { name, value } = e.target;
    setSigninDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSigninFormSubmit = async (e) =>{
   e.preventDefault();
   console.log("signinDetails", signinDetails);
   const payload = {
   
    email:signinDetails.email,
    password:signinDetails.password
   };

    dispatch(userLoginAction(payload));
    // try {
    //   const response = await  userLoginResponse(payload);
    //   console.log("response",response)
    //   if (response?.data?.msg) {
    //     notifyS(response?.data?.msg);
    //     localStorage.setItem("userInfomation",JSON.stringify(response?.data))
    //     navigate("/");

    //   }
    // } catch (error) {
    //  console.log("error",error) ;
    //  if (error) {
    //   notifyE(error.response.data.msg);
    // }
    // }
  }
  return (
    <div className="signin">
      <div className="form-container">
        <img className="signupLogo" src={Logo} alt="instagram logo" />
        <p>Connect with Peoples</p>

        <form onSubmit={handleSigninFormSubmit}>
          
          <div>
            <input
              type="text"
              name="email"
              value={signinDetails.email}
              placeholder="enter email"
              onChange={handleSignFormChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              value={signinDetails.password}
              placeholder="enter password"
              onChange={handleSignFormChange}
            />
          </div>
          <div className="signin-btn">
            <button type="submit">login</button>
          </div>
        </form>
        <div className="form2">
          <span>Create New Account</span>
          <Link to="/signup">
            <spna>SignUp</spna>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
