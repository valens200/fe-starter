import { useEffect, useRef, useState } from "react";
// import logo from "../../assets/images/logo.png";
import { AppDispatch } from "@/store";
import "../../assets/scss/dashboardLayout.scss";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { selectUser, logout, loadUser } from "../../store/modules/authSlice";
import Modal from "../../components/models/Modal";
import toast from "react-hot-toast";
import AppServices from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { LayoutProps } from "@/types";
import Navbar from "../../components/common/Navbar";
import DashboardFooter from "../../components/common/DashboardFooter";
import { Button } from "@mantine/core";
import Home from "../../assets/svgs/Home";
import Loggo from "../../assets/images/loggo.png";

const EmployeeLayout = ({ children, links }: LayoutProps) => {
  const childRef: any = useRef(null);

  const toggleModal = () => {
    if (childRef.current) childRef.current.toggleModal();
  };

  const [menuStatus, setMenuStatus] = useState(false);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState({});
  const toggleMenu = () => {
    setMenuStatus(!menuStatus);
  };
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/login");
  // };

  useEffect(() => {
    if (!loaded) {
      dispatch(loadUser());
      setLoaded(true);
    } else if (!user) {
      navigate("/login");
    }
  }, [loaded]);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  useEffect(() => {
    if (sidebarStatus) {
      toggleSidebar();
    }
  }, [useLocation().pathname]);

  const updateUser = () => {
    toast.promise(AppServices.updateUser(admin, user?.id), {
      loading: "Updating account ...",
      success: (response) => {
        dispatch(loadUser());
        toggleModal();
        return "Account updated successfully";
      },
      error: (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        if (message.includes("required pattern"))
          if (message.includes("phone")) return "invalid phone number";
          else return "invalid nationalId";
        return message;
      },
    });
  };

  return (
    <>
      <div className="flex">
        <div
          className={`full-height sidebar ${
            sidebarStatus ? "absolute" : "hidden"
          } md:block`}
        >
          <div id="logo" className="flex  justify-center">
            <img alt="Coat of Arms of Rwanda logo" src={Loggo} />
          </div>
          <ul className="list-reset text-left flex flex-col h-4/6">
            {links.map((link, index) => (
              <li key={index} className="dropdown" id="dropdown">
                <NavLink
                  className={`link-item colored-link ${
                    useLocation().pathname === "/" ? "active" : ""
                  }`}
                  to={`/${link.url}`}
                >
                  <div>
                    {useLocation().pathname === "/" ? (
                      <Home />
                    ) : (
                      link.alternativeImage
                    )}
                  </div>
                  <span className="menu-link">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <Button color="cyan" className="user-name ml-2 mt-1">
            Logout &rarr; ...
          </Button>
        </div>
        <div className=" full-height relative w-full bg-customBg">
          <Navbar />
          <Outlet />
          <DashboardFooter />
        </div>
      </div>
      <Modal
        ref={childRef}
        width="767px"
        children={
          <div>
            <div className="modal-title text-center my-10">Settings</div>
            <div className="modal-body">
              <form>
                <div className="">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Names`
                        </label>
                        <input
                          defaultValue={user?.names}
                          onChange={(e) => {
                            setAdmin({ ...admin, names: e.target.value || "" });
                          }}
                          type="text"
                          id="first-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          defaultValue={user?.email}
                          onChange={(e) => {
                            setAdmin({ ...admin, email: e.target.value || "" });
                          }}
                          type="email"
                          id="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          defaultValue={user?.phone}
                          onChange={(e) => {
                            setAdmin({ ...admin, phone: e.target.value || "" });
                          }}
                          type="text"
                          id="phone"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="nid"
                          className="block text-sm font-medium text-gray-700"
                        >
                          NationalId
                        </label>
                        <input
                          defaultValue={user?.nationalId}
                          onChange={(e) => {
                            setAdmin({
                              ...admin,
                              nationalId: e.target.value || "",
                            });
                          }}
                          type="string"
                          id="nid"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {/* <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      <input defaultValue={""} onChange={(e) => { setAdmin({ ...admin, password: e.target.value || "" }) }} type="password" id="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                      <input defaultValue={""} onChange={(e) => { setAdmin({ ...admin, confirmPassword: e.target.value || "" }) }} type="password" id="confirmPassword" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div> */}
                    </div>
                  </div>
                  <div className="">
                    <button type="submit" hidden></button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer my-10">
              <div className="flex justify-center">
                <button className="cancel mr-9" onClick={toggleModal}>
                  Cancel
                </button>
                <button onClick={updateUser}>Submit</button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default EmployeeLayout;
