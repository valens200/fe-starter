import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/authSlice";
import employeeReducer from "./modules/employeeSlice";
import laptopReducer from "./modules/laptopSlice";
import laptopEmployeeReducer from "./modules/laptopEmployeeSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    laptop: laptopReducer,
    laptopEmployee: laptopEmployeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
