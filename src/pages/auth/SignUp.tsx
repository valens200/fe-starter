import { useEffect, useState, useRef } from "react";

import "../../assets/scss/login.scss";
import toast from "react-hot-toast";
import AppServices from "../../services";
import Modal from "../../components/models/Modal";

import { loadUser, selectIsLoggedIn } from "../../store/modules/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "../../components/common/TableWrapper";
import { AppDispatch } from "../../store/index";
import loggo from "../../assets/images/loggo.png";
import { Button } from "@mantine/core";
import { IoMdArrowBack } from "react-icons/io";

function SignUP() {
  const [email, SetEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [password, SetPassword] = useState("");
  const [isNext, setIsNext] = useState(false);
  const [info, setInfo] = useState({
    password: "",
    confirmPassword: "",
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
    nationalId: "",
    position: "",
    department: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const childRef: any = useRef(null);

  const toggleModal = () => {
    if (childRef.current) childRef.current.toggleModal();
  };
  dispatch(loadUser());
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    } else {
      dispatch(loadUser());
    }
  }, [isLoggedIn]);

  const handleRegister = (e: any) => {
    e.preventDefault();

    if (info.password.trim() !== info.confirmPassword.trim())
      return toast.error("passwords should match");

    if (submitted) return;
    setSubmitted(true);

    toast.promise(
      AppServices.register({ ...info, confirmPassword: undefined }),
      {
        loading: "Registering ...",
        success: () => {
          toggleModal();
          setSubmitted(false);
          return "Registered successfully";
        },
        error: (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setSubmitted(false);
          if (message.includes("required pattern"))
            if (message.includes("phone")) return "invalid phone number";
            else return "invalid nationalId";
          return message;
        },
      }
    );
  };

  return (
    <div className="bg-main h-screen flex justify-center">
      <div className="form bg-[rgb(255,255,255)] flex max-w-md w-screen  justify-center p-8 m-auto">
        <form className="text-center" onSubmit={handleRegister}>
          <img src={loggo} className="mb-2  h-1/6 mx-auto" alt="" />
          <div className="title mb-8">
            Welcome to EDS <br />
          </div>
          {!isNext ? (
            <div>
              <div className="input-container  mb-8">
                <input
                  onChange={(e) =>
                    setInfo({ ...info, firstName: e.target.value })
                  }
                  className="bg"
                  placeholder="FirstName"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="input-container  mb-8">
                <input
                  onChange={(e) =>
                    setInfo({ ...info, lastName: e.target.value })
                  }
                  className="bg"
                  placeholder="Lastname"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="input-container  mb-8">
                <input
                  onChange={(e) =>
                    setInfo({ ...info, nationalId: e.target.value })
                  }
                  className="bg"
                  placeholder="NationalId"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="input-container  mb-8">
                <input
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  className="bg"
                  placeholder="Phone Number"
                  type="email"
                  name=""
                  id=""
                />
              </div>

              <div className="input-container w-full  mb-8">
                <Button
                  style={{ width: "79%" }}
                  onClick={() => setIsNext(true)}
                  color="cyan"
                  className="w-[100%]  text-s cursor-pointer"
                >
                  Next &rarr;
                </Button>
              </div>
              <div
                onClick={toggleModal}
                className="input-container  mb-[-60px] text-primary cursor-pointer"
              >
                Already have an account?{" "}
                <Link color="cyan" to="/">
                  SignIn
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="input-container  mb-8">
                <input
                  onChange={(e) =>
                    setInfo({ ...info, department: e.target.value })
                  }
                  className="bg"
                  placeholder="Department"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="input-container  mb-8">
                <input
                  onChange={(e) =>
                    setInfo({ ...info, password: e.target.value })
                  }
                  className="bg"
                  placeholder="Position"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="input-container  mb-8">
                <input
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  className="bg"
                  placeholder="Email"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="input-container  mb-8">
                <input
                  onChange={(e) =>
                    setInfo({ ...info, password: e.target.value })
                  }
                  className="bg"
                  placeholder="Password"
                  type="password"
                  name=""
                  id=""
                />
              </div>
              <div className="input-container flex w-[80%] mx-auto justify-between  mb-8">
                <Button
                  style={{ width: "30%" }}
                  onClick={() => setIsNext(false)}
                  color="cyan"
                  className="w-[100%]  text-s cursor-pointer"
                >
                  <IoMdArrowBack />
                  Back
                </Button>
                <Button
                  type="submit"
                  style={{ width: "60%" }}
                  color="cyan"
                  className="submit w-[100%]  text-s cursor-pointer"
                >
                  Submit
                </Button>
              </div>
              <div
                onClick={toggleModal}
                className="input-container  mb-[-60px] text-primary cursor-pointer"
              >
                Already have an account?{" "}
                <Link color="cyan" to="/">
                  SignIn
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUP;
