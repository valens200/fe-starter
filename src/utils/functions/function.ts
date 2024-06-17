import { ro } from "@faker-js/faker";
import { ErrorResponse, UserRole } from "../../types";
import { jwtDecode } from "jwt-decode";

export const getErrorFromResponse = (error: any): string => {
  if (!error.response) return "Network Error";
  let errorData: ErrorResponse = error.response.data;
  return errorData.message;
};

export const getErrorFromResponseData = (error: any): string => {
  if (!error.response) return "Network Error";
  return error.response.data.message;
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getUseRoute = (role: UserRole): string => {
  console.log(role, "======");
  switch (role) {
    case UserRole.EMPLOYEE:
      return "/employee/dashboard";
    case UserRole.ADMIN:
      return "/admin/dashboard";
    default:
      return "/";
  }
};

export const decodeToken = (token: string): any => {
  try {
    let data = jwtDecode(token);
    return data;
  } catch (e) {
    return null;
  }
};
