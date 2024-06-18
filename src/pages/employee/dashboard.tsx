import TableWrapper from "../../components/common/TableWrapper";
import StatsCard from "../../components/common/StatsCard";
import { StatsCardProps } from "../../types/index";
import { generatePageTitle } from "../../utils/index";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { faker } from "@faker-js/faker";
import { FiPlus } from "react-icons/fi";
import ContactSupportModal from "../../components/modals/ContactSupportModal";
import AddLaptop from "../../components/modals/AddLaptop";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { showCreateLaptop } from "../../atoms/index";
import UpdateLaptop from "../../components/modals/UpdateLaptop";
import { useEffect } from "react";
import { isUserAllowed } from "../../middlewares";

export default function EmployeeOverview() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const stats: StatsCardProps[] = [
    {
      title: "Labtops received",
      value: "12",
      color: "bg-blue-200",
      link: {
        label: "View All",
        href: "/employee/laptops",
      },
    },
    {
      title: "Laptops revorked",
      value: "120",
      color: "bg-green-200",
      link: {
        label: "View All",
        href: "/employee/laptops",
      },
    },
    {
      title: "Notifications",
      value: "67%",
      color: "bg-yellow-200",
    },
  ];

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

  useEffect(() => {
    if(!isUserAllowed(["EMPLOYEE"])){
      navigate("/")
    }
  },[])
  return (
    <div className="w-full space-y-6 pl-10 pt-10">
      {/* stats cards */}
      <div className="space-y-3">
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

      <div className="flex flex-col w-full gap-6">
        <div className="graph-card">
          <AddLaptop />
          <UpdateLaptop />
          <h2 className="graph-title">Labtops received out</h2>
          <TableWrapper
            title="List of your laptops"
            columns={columns}
            data={data}
            pageSize={5}
            actions={
              <Button color="cyan" className="flex items-center gap-x-2">
                <FiPlus className="text-xl" />
                <span>Export laptops</span>
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
