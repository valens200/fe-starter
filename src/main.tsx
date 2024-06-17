import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "@mantine/core/styles.css";
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Employees from "./pages/admin/employees";
import Laptops from "./pages/admin/laptops";
import NotFound from "./pages/exceptions/404";
import AdminLayout from "./pages/admin/AdminLayout";
import EmployeeLaptops from "./pages/employee/laptops";
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import { createTheme, MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import ActiveHome from "./assets/svgs/ActiveHome";
import ActiveUser from "./assets/svgs/ActiveUser";
import User from "./assets/svgs/User";
import ActiveDepartment from "./assets/svgs/ActiveDepartment";
import Department from "./assets/svgs/Department";
import { LuLayoutDashboard } from "react-icons/lu";
import EmployeeOverview from "./pages/employee/dashboard";
import AdminDashboard from "./pages/admin/dashboard";
import { AuthProvider } from "./hooks/useAuth";
import AdminProfile from "./pages/admin/profile";

const theme = createTheme({});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <MantineProvider theme={theme}>
      <React.StrictMode>
        <React.StrictMode>
          <Provider store={store}>
            <Router>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/auth/signup" element={<SignUp />} />
                  <Route
                    path="/admin/"
                    element={
                      <AdminLayout
                        links={[
                          {
                            name: "Dashboard",
                            url: "admin/dashboard",
                            image: <ActiveHome />,
                            alternativeImage: <LuLayoutDashboard />,
                          },

                          {
                            name: "Employees",
                            image: <ActiveUser />,
                            alternativeImage: <User />,
                            url: "admin/employees",
                          },
                          {
                            name: "Laptops",
                            image: <ActiveDepartment />,
                            alternativeImage: <Department />,
                            url: "admin/laptops",
                          },
                          {
                            name: "Profile",
                            url: "admin/profile",
                            image: <ActiveHome />,
                            alternativeImage: <LuLayoutDashboard />,
                          },
                        ]}
                        children={undefined}
                      />
                    }
                  >
                    <Route
                      path="/admin/dashboard"
                      element={<AdminDashboard />}
                    />
                    <Route path="/admin/employees" element={<Employees />} />
                    <Route path="/admin/laptops" element={<Laptops />} />
                    <Route path="/admin/profile" element={<AdminProfile />} />
                  </Route>
                  <Route
                    path="/employee/"
                    element={
                      <EmployeeLayout
                        links={[
                          {
                            name: "Dashboard",
                            url: "employee/dashboard",
                            image: <ActiveHome />,
                            alternativeImage: <LuLayoutDashboard />,
                          },
                          {
                            name: "Labtops",
                            image: <ActiveUser />,
                            alternativeImage: <User />,
                            url: "employee/laptops",
                          },
                          // {
                          //   name: "Notifications",
                          //   image: <ActiveDepartment />,
                          //   alternativeImage: <Department />,
                          //   url: "employee/notifications",
                          // },
                        ]}
                        children={undefined}
                      />
                    }
                  >
                    <Route
                      path="/employee/laptops"
                      element={<EmployeeLaptops />}
                    />

                    <Route
                      path="/employee/notifications"
                      element={<EmployeeOverview />}
                    />
                    <Route
                      path="/employee/dashboard"
                      element={<EmployeeOverview />}
                    />
                    <Route
                      path="/employee/laptops"
                      element={<EmployeeLaptops />}
                    />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </AuthProvider>
            </Router>
          </Provider>
        </React.StrictMode>
      </React.StrictMode>
    </MantineProvider>
  </RecoilRoot>
);
