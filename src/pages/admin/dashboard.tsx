import { useState, useRef } from "react";
import "../../assets/scss/dashboard.scss";
import "../../assets/scss/modal.scss";
import { selectIsLoggedIn } from "../../store/modules/authSlice";
import { selectLaptopEmployees } from "../../store/modules/laptopEmployeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLaptops, setLaptops } from "../../store/modules/laptopSlice";
import TableWrapper from "../../components/common/TableWrapper";
import { faker } from "@faker-js/faker";
import { Box, Button } from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import StatsCard, { StatsCardProps } from "../../components/common/StatsCard";
import {
  showAddCommentState,
  showAssignLaptop,
  showUpdateEmployee,
} from "../../atoms/index";
import { useRecoilState } from "recoil";
import AddEmployee from "../../components/modals/AddEmployee";
import { AppDispatch } from "../../store";
import useSWR from "swr";
import { authApi } from "../../utils/api/constants";
import {
  selectEmployees,
  setEmployees,
} from "../../store/modules/employeeSlice";
import UpdateEmployee from "../../components/modals/UpdateEmployee";
import { MdAssignmentAdd } from "react-icons/md";
import AssignLaptops from "../../components/modals/AssignLaptops";

function AdminDashboard() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const laptopEmployees = useSelector(selectLaptopEmployees);
  const laptops = useSelector(selectLaptops);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState({});
  const childRef: any = useRef(null);
  const [, setShowAddCommentState] = useRecoilState(showAddCommentState);
  const [, setShowUpdateEmployee] = useRecoilState(showUpdateEmployee);
  const [, setShowAssignLaptop] = useRecoilState(showAssignLaptop);

  const data = useSelector(selectEmployees);

  const showUpdate = (employee: any) => {
    setShowUpdateEmployee(true);
    localStorage.setItem("selectedEmployee", JSON.stringify(employee));
  };

  const showAssign = (employee: any) => {
    localStorage.setItem("selectedEmployee", JSON.stringify(employee));
    setShowAssignLaptop(true);
  };

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
            <Button onClick={() => showAssign(row)} variant="outline">
              <MdAssignmentAdd />
            </Button>
            <Button onClick={() => showUpdate(row)} variant="outline">
              Edit &rarr;
            </Button>
          </div>
        );
      },
    },
  ];

  const data2 = Array.from({ length: 25 }, () => ({
    id: faker.string.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    gender: faker.name.gender(),
    email: faker.internet.email(),
  }));

  const {
    data: employees,
    isLoading,
    error,
  } = useSWR("/employees", async (url) => {
    try {
      const res = await authApi.get(url);
      dispatch(setEmployees(res.data.employees));
      // setData(res.data.employees);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

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
        <UpdateEmployee />
        <AssignLaptops />

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
          data={data2}
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
