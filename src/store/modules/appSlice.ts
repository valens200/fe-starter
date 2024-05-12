import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "./authSlice";

const initialState = {
  formValues: {
    firstName: "",
    lastName: "",
    userNAme: "",
    nationalId: "",
    ephoneNumber: "",
    email: "",
    password: "",
  },
  employeeInputs: [
    {
      name: "First Name",
      id: 1,
      inputValue: "",
    },
    {
      name: "Last Name",
      id: 2,
      inputValue: "",
    },
    {
      name: "User Name",
      id: 3,
      inputValue: "",
    },
    {
      name: "National ID",
      id: 4,
      inputValue: "",
    },
    {
      name: "Phone Number",
      id: 5,
      inputValue: "",
    },
    {
      name: "Email",
      id: 6,
      inputValue: "",
    },
  ],
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    getEmployeeInputs: (state, action) => {},
  },
});

export const { getEmployeeInputs } = AppSlice.actions;

export const selectEmployeeInputs = (state: any) => state.app.employeeInputs;
export default AppSlice.reducer;
