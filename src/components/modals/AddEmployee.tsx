import { useRecoilState } from "recoil";
import ModalLayout from "../layouts/ModalLayout";
import { Box, Button, Select, Text, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import LoadingSpinner from "../common/LoadingSpinner";
import { showAddCommentState } from "../../atoms";
import React from "react";
import { useSelector } from "react-redux";
import { selectEmployeeInputs } from "../../store/modules/appSlice";
import { authApi } from "../../utils/api/constants";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { fa } from "@faker-js/faker";

export default function AddEmployee() {
  const [show, setShow] = useRecoilState(showAddCommentState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    userName: string;
    nationalId: string;
    phoneNumber: string;
    email: string;
    gender: string;
  }>({
    firstName: "",
    lastName: "",
    userName: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    gender: "",
  });
  const inputs = useSelector(selectEmployeeInputs);
  const handleSave = async () => {
    const values: string[] = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.nationalId,
      formData.phoneNumber,
      formData.userName,
    ];

    if (formData.nationalId.length != 16) {
      toast.error("National Id should be 16 characters");
      return;
    }
    values.forEach((value: any) => {
      if (!value.trim() || value.trim() == "") {
        toast.error("All fields are required please");
        return;
      }
    });
    setLoading(true);
    try {
      const res = await authApi.post("/employees/create", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        nationalId: formData.nationalId,
        phone: formData.phoneNumber,
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
      if (!error.response) toast.error("Network error");
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <ModalLayout className="pt-5" open={show} onClose={() => setShow(false)}>
      <Box>
        <p>{error}</p>
        <p className="font-bold text-xl p-5">Create new employee</p>
      </Box>
      <Box>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* {inputs.map((input: any, index: number) => (
            <TextInput
              onChange={(e: any) =>
                dispatch(setValues({ id: input.id, value: e.target.value }))
              }
              withAsterisk
              label={input.name}
              placeholder={`Enter ${input.name}`}
            />
          ))} */}
          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            label="First Name"
            placeholder="First Name"
          />
          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            label="Last Name"
            placeholder="Last Name"
          />

          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            label="UserName"
            placeholder="UserName"
          />
          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, nationalId: e.target.value })
            }
            label="National Id"
            type="number"
            placeholder="National ID"
          />
          <TextInput
            withAsterisk
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            label="Phone Number"
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
        <button onClick={() => setShow(false)}>Cancel</button>
        <Button
          type="submit"
          color="cyan"
          disabled={loading}
          onClick={handleSave}
          className="w-40"
        >
          {loading ? <LoadingSpinner /> : "Add Employee"}
        </Button>
      </div>
    </ModalLayout>
  );
}
