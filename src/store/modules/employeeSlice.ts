import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  isEmployeesLoaded: false,
};

export const AuthSlice = createSlice({
  name: "Employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
      state.isEmployeesLoaded = true;
    },
  },
});

export const { setEmployees } = AuthSlice.actions;

export const selectEmployees = (state: any) => state.employee.employees;
export const isEmployeesLoaded = (state: any) =>
  state.employee.isEmployeesLoaded;

export default AuthSlice.reducer;
