import { useEffect, useState, useRef } from "react";
import "../../assets/scss/dashboard.scss";
import "../../assets/scss/modal.scss";
import { selectIsLoggedIn } from "../../store/modules/authSlice";
import AppServices from "../../services";
import {
  selectLaptopEmployees,
  setLaptopEmployees,
} from "../../store/modules/laptopEmployeeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmployees,
  setEmployees,
} from "../../store/modules/employeeSlice";
import { selectLaptops, setLaptops } from "../../store/modules/laptopSlice";
import TableWrapper from "../../components/common/TableWrapper";
import { Button } from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import AddEmployee from "../../components/modals/AddEmployee";
import UpdateEmployee from "../../components/modals/UpdateEmployee";
import { useRecoilState } from "recoil";
import { showAddCommentState, showUpdateEmployee } from "../../atoms/index";
import useSWR from "swr";
import { authApi } from "../../utils/api/constants";
import { da } from "@faker-js/faker";
import { Toaster } from "react-hot-toast";

function Employees() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const laptopEmployees = useSelector(selectLaptopEmployees);
  let data = useSelector(selectEmployees);
  const [data2, setData2] = useState<any[]>([]);
  const laptops = useSelector(selectLaptops);
  const dispatch = useDispatch();
  const [, setShowUpdateEmployee] = useRecoilState(showUpdateEmployee);
  const [filter, setFilter] = useState({});
  const [, setShowAddCommentState] = useRecoilState(showAddCommentState);

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
      title: "Gender",
      key: "gender",
    },
    {
      title: "National Id",
      key: "nationalId",
    },
    {
      title: "Phone Number",
      key: "phone",
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
              // onClick={() => dispatch(showUpdateEmployee(true))}
              variant="outline"
            >
              Edit &rarr;
            </Button>
          </div>
        );
      },
    },
  ];

  // const data = Array.from({ length: 25 }, () => ({
  //   id: faker.string.uuid(),
  //   firstName: faker.name.firstName(),
  //   lastName: faker.name.lastName(),
  //   username: faker.name.firstName(),
  //   gender: faker.name.gender(),
  //   email: faker.internet.email(),
  // }));
  const fetchData = async () => {
    try {
      const res = await authApi.get("/employees");
      dispatch(setEmployees(res.data.employees));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (data.length == 0) {
      fetchData();
    }
  });
  return (
    <div className="pl-10 pt-10">
      <AddEmployee />
      <UpdateEmployee />
      <AddEmployee />
      <Toaster />

      <main className="min-h-[75vh]">
        <TableWrapper
          title="List of your laptops"
          columns={columns}
          data={data}
          pageSize={10}
          actions={
            <>
              <Button color="cyan" className="flex items-center gap-x-2">
                <LuDownload className="text-xl" />
                <span>Export Employees</span>
              </Button>
              <Button
                onClick={() => setShowAddCommentState(true)}
                color="cyan"
                className="flex items-center gap-x-2"
              >
                <FiPlus className="text-xl" />
                <span>Create Employee</span>
              </Button>
            </>
          }
        />
      </main>
    </div>
  );
}

export default Employees;
