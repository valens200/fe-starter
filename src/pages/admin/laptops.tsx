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
import UpdateLaptop from "../../components/modals/UpdateLaptop";
import AddLaptop from "../../components/modals/AddLaptop";
import { showCreateLaptop, showUpdateLaptop } from "../../atoms/index";
import { RecoilState, useRecoilState } from "recoil";

function Dashboard() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const laptopEmployees = useSelector(selectLaptopEmployees);
  const employees = useSelector(selectEmployees);
  const laptops = useSelector(selectLaptops);
  const dispatch = useDispatch();
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
  const [, setShowCreateLaptop] = useRecoilState(showCreateLaptop);
  const [, setShowUpdatelaptop] = useRecoilState(showUpdateLaptop);

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
      title: "Laptop Name",
      key: "laptopName",
      sortable: true,
    },
    {
      title: "Provider Name",
      key: "providerName",
    },
    {
      title: "Issued at",
      key: "issuedAt",
    },
    {
      title: "Received At",
      key: "receivedAt",
    },
    {
      title: "Serial number",
      key: "serialNumber",
    },
    {
      title: "Status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      Element: (row: any) => {
        return (
          <div className="flex items-center gap-x-2">
            <Button onClick={() => setShowUpdatelaptop(true)} variant="outline">
              Edit &rarr;
            </Button>
          </div>
        );
      },
    },
  ];

  const data = Array.from({ length: 25 }, () => ({
    id: faker.string.uuid(),
    laptopName: faker.name.firstName(),
    providerName: faker.name.lastName(),
    issuedAt: faker.name.firstName(),
    receivedAt: faker.name.gender(),
    serialNumber: faker.number.int(),
    status: ["PENDING", "RECEIVED", "REVOKED"][Math.floor(Math.random() * 2)],
  }));

  return (
    <div className="pl-10 pt-10">
      <main className="min-h-[75vh]">
        <AddLaptop />
        <UpdateLaptop />
        <TableWrapper
          title="List of your laptops"
          columns={columns}
          data={data}
          pageSize={10}
          actions={
            <>
              <Button color="cyan" className="flex items-center gap-x-2">
                <LuDownload className="text-xl" />
                <span>Export laptops</span>
              </Button>
              <Button
                onClick={() => setShowCreateLaptop(true)}
                color="cyan"
                className="flex items-center gap-x-2"
              >
                <FiPlus className="text-xl" />
                <span>Create laptop</span>
              </Button>
            </>
          }
        />
      </main>
    </div>
  );
}

export default Dashboard;
