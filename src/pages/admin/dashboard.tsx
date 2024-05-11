import { useEffect, useState, useRef } from "react";
import "../../assets/scss/dashboard.scss";
import "../../assets/scss/modal.scss";
import Modal from "../../components/models/Modal";
import { selectIsLoggedIn } from "../../store/modules/authSlice";
import AppServices from "../../services";
import toast from "react-hot-toast";
import {
  selectLaptopEmployees,
  setLaptopEmployees,
  addLaptopEmployee,
  updateLaptopEmployee,
  removeLaptopEmployee,
} from "../../store/modules/laptopEmployeeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmployees,
  setEmployees,
} from "../../store/modules/employeeSlice";
import { selectLaptops, setLaptops } from "../../store/modules/laptopSlice";
import TableWrapper from "../../components/common/TableWrapper";
import { faker } from "@faker-js/faker";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import StatsCard, { StatsCardProps } from "../../components/common/StatsCard";
import AddLaptop from "../../components/modals/AddLaptop";
import { showAddCommentState, showUpdateEmployee } from "../../atoms/index";
import { useRecoilState } from "recoil";
import AddEmployee from "../../components/modals/AddEmployee";
import { AppDispatch } from "../../store";

function AdminDashboard() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const laptopEmployees = useSelector(selectLaptopEmployees);
  const employees = useSelector(selectEmployees);
  const laptops = useSelector(selectLaptops);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      AppServices.getLaptopEmployees().then((response) => {
        if (response.data.data) {
          dispatch(setLaptopEmployees(response.data.data));
        }
      });

      AppServices.getEmployees().then((response) => {
        if (response.data.data) {
          dispatch(setEmployees(response.data.data));
        }
      });

      AppServices.getLaptops().then((response) => {
        if (response.data.data) {
          dispatch(setLaptops(response.data.data));
        }
      });
    }
  }, [isLoggedIn]);

  const childRef: any = useRef(null);

  const toggleModal = () => {
    if (childRef.current) childRef.current.toggleModal();
  };

  const [selectedLaptopEmployee, setSelectedLaptopEmployee]: any | {} =
    useState({
      password: "",
    });
  const [selectedLaptopEmployeeId, setSelectedLaptopEmployeeId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [, setShowAddCommentState] = useRecoilState(showAddCommentState);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isUpdating = selectedLaptopEmployeeId !== "";

    toast.promise(
      isDeleting
        ? AppServices.deleteLaptopEmployee(selectedLaptopEmployeeId)
        : isUpdating
        ? AppServices.updateLaptopEmployee(
            selectedLaptopEmployee,
            selectedLaptopEmployeeId
          )
        : AppServices.registerLaptopEmployee(selectedLaptopEmployee),
      {
        loading: `${
          isDeleting ? "Deleting" : isUpdating ? "Updating" : "Creating"
        } laptopEmployee ...`,
        success: (response) => {
          if (isDeleting)
            dispatch(removeLaptopEmployee(selectedLaptopEmployeeId));
          else if (isUpdating)
            dispatch(
              updateLaptopEmployee({
                ...response.data.data,
                ...selectedLaptopEmployee,
              })
            );
          else dispatch(addLaptopEmployee(response.data.data));

          if (selectedLaptopEmployee.password?.length) {
            AppServices.updateLaptopEmployeePassword(
              {
                newPassword: selectedLaptopEmployee.password,
                confirmPassword: selectedLaptopEmployee.password,
              },
              selectedLaptopEmployeeId
            );
          }

          let message = `${
            isDeleting ? "Deleted" : isUpdating ? "Updated" : "Created"
          } laptopEmployee successfully`;
          if (isUpdating) setSelectedLaptopEmployeeId("");
          if (isDeleting) setIsDeleting(false);
          setSelectedLaptopEmployee({});
          toggleModal();
          return message;
        },
        error: (error) => {
          let message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          if (message.includes("required pattern"))
            if (message.includes("chasisNumber"))
              return "invalid chasisNumber number";
            else return "invalid manufactureCompany";
          return message;
        },
      }
    );
  };

  interface Employee {
    id: Number;
    firstName: string;
    lastName: string;
    username: string;
    gender: string;
    email: string;
  }

  const columns = [
    {
      title: "First Name",
      key: "firstName",
      sortable: true,
    },
    {
      title: "Last Name",
      key: "lastName",
    },
    {
      title: "User Name",
      key: "username",
    },
    {
      title: "Gender",
      key: "gender",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      Element: (row: any) => {
        return (
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => dispatch(showUpdateEmployee(true))}
              variant="outline"
            >
              Edit &rarr;
            </Button>
          </div>
        );
      },
    },
  ];

  const data = Array.from({ length: 25 }, () => ({
    id: faker.string.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    gender: faker.name.gender(),
    email: faker.internet.email(),
  }));

  const stats: StatsCardProps[] = [
    {
      title: "Employees registered",
      value: "12",
      color: "bg-blue-200",
      link: {
        label: "View All",
        href: "/admin/employees",
      },
    },
    {
      title: "Laptops registered",
      value: "120",
      color: "bg-green-200",
      link: {
        label: "View All",
        href: "/admin/laptops",
      },
    },
    {
      title: "Laptops distributed",
      value: "120",
      color: "bg-green-200",
      link: {
        label: "View All",
        href: "/admin/laptops",
      },
    },
    {
      title: "Notifications",
      value: "67%",
      color: "bg-yellow-200",
    },
  ];
  return (
    <div className="w-full space-y-6 pl-10 pt-10">
      <div className="space-y-3">
        <AddEmployee />

        <h1 className="text-xl font-medium text-gray-600">
          {/* {"Welcome " + auth.user?.firstName + " " + auth.user?.lastName} */}
          {"Welcome " + " Valens "}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-3">
          {stats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>
      </div>
      <main className="min-h-[75vh]">
        <TableWrapper
          title="Current enrolled employees"
          columns={columns}
          data={data}
          pageSize={7}
          actions={
            <>
              <Button color="cyan" className="flex items-center gap-x-2">
                <LuDownload className="text-xl" />
                <span>Export employees</span>
              </Button>
              <Button
                onClick={() => setShowAddCommentState(true)}
                color="cyan"
                className="flex items-center gap-x-2"
              >
                <FiPlus className="text-xl" />
                <span>Create employee</span>
              </Button>
            </>
          }
        />
      </main>
    </div>
  );
}

export default AdminDashboard;
