import { useEffect, useState, useRef } from "react";

import "../../assets/scss/login.scss";
import toast from "react-hot-toast";
import { loadUser, selectIsLoggedIn } from "../../store/modules/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "../../components/common/TableWrapper";
import { AppDispatch } from "../../store/index";
import loggo from "../../assets/images/loggo.png";
import { Button } from "@mantine/core";
import { Fields } from "@/types";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [email, SetEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [password, SetPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { login, user, loggingIn } = useAuth();
  const childRef: any = useRef(null);

  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    } else {
      dispatch(loadUser());
    }
  }, [isLoggedIn]);

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (!email || email == "" || !password || password == "") {
      if (!email || email == "") {
        toast.error("Email is required");
      } else if (!password || password == "") {
        toast.error("Password is required");
      }
      return;
    }
    login(email, password);

    if (submitted) return;
    setSubmitted(true);
  };
  const inputFields: Fields[] = [
    {
      name: "Email",
      placeholder: "Enter email",
      onchange: (e: any) => SetEmail(e.target.value),
    },
    {
      name: "password",
      placeholder: "Enter password",
      onchange: (e: any) => SetPassword(e.target.value),
    },
  ];

  return (
    <div className="bg-main h-screen flex justify-center">
      <div className="form bg-[rgb(255,255,255)] flex max-w-md w-screen justify-center p-8 m-auto">
        <form method="post" className="text-center" onSubmit={handleLogin}>
          <img src={loggo} className="mb-2  h-1/6 mx-auto" alt="" />
          <div className="title mb-8">
            Welcome to EDS <br />
            {/* <div className="small">Laptop Tracking Management System</div> */}
          </div>
          {inputFields.map((input: Fields, index: number) => (
            <div key={index} className="input-container  mb-8">
              <input
                onChange={input.onchange}
                className="bg"
                placeholder={input.placeholder}
                type="text"
                name={input.name}
                id=""
              />
            </div>
          ))}

          <div className="input-container w-full  mb-8">
            <Button
              type="submit"
              style={{ width: "79%" }}
              color="cyan"
              className="submit w-[100%]  text-s cursor-pointer"
            >
              Submit
            </Button>
          </div>
          <div className="input-container  mb-[-60px] text-primary cursor-pointer">
            Don't have an account?{" "}
            <Link color="cyan" to="/auth/signup">
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;