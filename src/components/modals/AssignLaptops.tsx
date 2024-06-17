import { useRecoilState } from "recoil";
import ModalLayout from "../layouts/ModalLayout";
import { Box, Button, MultiSelect } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { showAssignLaptop } from "../../atoms";
import React from "react";
import LoadingSpinner from "../common/LoadingSpinner";

export default function AssignLaptops() {
  const [show, setShow] = useRecoilState(showAssignLaptop);
  // const employee = JSON.parse(localStorage.getItem("selectedEmployee")!).row;
  const employee: any = {};
  const [info, setInfo] = useState({
    modelName: "",
    manufacturer: "",
    serialNumber: "",
  });
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
    <ModalLayout className="pt-5 " open={show} onClose={() => setShow(false)}>
      <div className="h-[20vh] relative flex flex-col items-start justify-between">
        <Box>
          <p>{`Assign laptops to ${
            employee.firstName + " " + employee.lastName
          }`}</p>
        </Box>
        <Box className="w-full">
          <MultiSelect
            label="Select laptops to assign"
            placeholder="Pick Laptop"
            data={["HP", "dell"]}
            searchable
            hidePickedOptions
            nothingFoundMessage="No data found"
            maxValues={1}
            clearable
          />
        </Box>
        <div className="flex w-full justify-end items-end">
          <Button
            type="submit"
            color="cyan"
            disabled={loading}
            onClick={handleSave}
            className="w-40"
          >
            {loading ? <LoadingSpinner /> : "OK"}
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
