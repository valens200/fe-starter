import { useRecoilState } from "recoil";
import ModalLayout from "../layouts/ModalLayout";
import { Box, Button, Select, Text, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import LoadingSpinner from "../common/LoadingSpinner";
import { showAddCommentState } from "../../atoms";
import React from "react";

export default function AddEmployee() {
  const [show, setShow] = useRecoilState(showAddCommentState);
  const [loading, setLoading] = useState(false);
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notifications.show({
        title: "Comment Added",
        message: "The comment has been added successfully",
        color: "teal",
      });
      setShow(false);
    }, 2000);
  };
  return (
    <ModalLayout className="pt-5" open={show} onClose={() => setShow(false)}>
      <Box>
        <p className="font-bold text-xl p-5">Create new employee</p>
      </Box>
      <Box>
        <form className="flex flex-col gap-4">
          <TextInput withAsterisk label="First Name" placeholder="First Name" />
          <TextInput withAsterisk label="Last Name" placeholder="Last Name" />
          <TextInput withAsterisk label="Email" placeholder="Email" />
          <TextInput withAsterisk label="UserName" placeholder="UserName" />
          <Select
            label="Gender"
            placeholder="Select Gender"
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
