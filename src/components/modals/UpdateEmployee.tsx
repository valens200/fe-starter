import { useRecoilState } from "recoil";
import ModalLayout from "../layouts/ModalLayout";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { showUpdateEmployee } from "../../atoms";
import React from "react";
import toast from "react-hot-toast";
import { authApi } from "../../utils/api/constants";
import { fa } from "@faker-js/faker";

export default function UpdateEmployee() {
  const [show, setShow] = useRecoilState(showUpdateEmployee);
  const [loading, setLoading] = useState(false);
  // const employee = JSON.parse(localStorage.getItem("selectedEmployee")!).row;
  const employee: any = {};
  const [formData, setFormData] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    nationalId: string;
    phone: string;
    email: string;
    gender: string;
  }>({
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    nationalId: employee.nationalId,
    userName: "wfsdfsd",
    phone: employee.phone,
    email: employee.email,
    gender: "sdfsdf",
  });

  const handleSave = async () => {
    const values: string[] = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.nationalId,
      formData.phone,
      formData.userName,
    ];

    setLoading(true);
    try {
      const res = await authApi.put("/employees/update", {
        userId: formData.id.toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        nationalId: formData.nationalId,
        phone: formData.phone,
        email: formData.email,
        password: "VAVAvalens2003@",
      });
      console.log(res);
      setTimeout(() => {
        setShow(false);
        setLoading(false);
      }, 2000);
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      if (!error.response) toast.error("Network error");
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handDelete = async () => {
    try {
      const res = await authApi.delete(`/employees/delete/${formData.id}`);
      console.log(res);
      toast.success("An employee was deleted successfully");
      setTimeout(() => {
        setLoading(false);
        setShow(false);
      }, 1000);
    } catch (error: any) {
      if (!error.response) toast.error("Network error");
      toast.error(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <ModalLayout className="pt-5" open={show} onClose={() => setShow(false)}>
      <Box className="flex justify-between items-center">
        <p className="font-bold text-xl p-5">Update employee</p>
        <button onClick={() => setShow(false)}>Cancel</button>
      </Box>
      <Box>
        <form className="flex flex-col gap-4">
          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            label="First Name"
            defaultValue={formData.firstName}
            placeholder="First Name"
          />
          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            label="Last Name"
            defaultValue={formData.id}
            placeholder="Last Name"
          />

          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            label="UserName"
            defaultValue={formData.firstName}
            placeholder="UserName"
          />
          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, nationalId: e.target.value })
            }
            label="National Id"
            type="number"
            defaultValue={formData.nationalId}
            placeholder="National ID"
          />
          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            label="Phone Number"
            defaultValue={formData.phone}
            type="number"
            placeholder="Phone Number"
          />
          <TextInput
            type="email"
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            label="Email"
            defaultValue={formData.email}
            placeholder="Email"
          />
          <Select
            label="Gender"
            placeholder="Select Gender"
            onChange={(e: any) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            data={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />

          {/* <TextInput withAsterisk label="First Name" placeholder="First Name" /> */}
        </form>
      </Box>
      <div className="w-full flex items-center justify-end gap-x-3 pt-6">
        <Button color="red" onClick={() => handDelete()}>
          Delete
        </Button>
        <Button color="cyan" onClick={() => handleSave()} className="w-40">
          {"Update"}
        </Button>
      </div>
    </ModalLayout>
  );
}
